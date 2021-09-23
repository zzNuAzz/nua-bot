// import { scdl } from '@services/soundclound'
import { Platform, Song } from '@/types/Song';
import {
	AudioPlayer,
	AudioPlayerStatus,
	createAudioPlayer,
	createAudioResource,
	entersState,
	VoiceConnection,
	VoiceConnectionDisconnectReason,
	VoiceConnectionStatus,
} from '@discordjs/voice';
import { Snowflake } from 'discord.js';
import ytdl from 'ytdl-core';

export interface QueueItem {
	song: Song;
	requester: string;
}

export class Server {
	public guildId: string;
	public playing?: QueueItem;
	public queue: QueueItem[];
	public readonly voiceConnection: VoiceConnection;
	public readonly audioPlayer: AudioPlayer;
	private isReady = false;

	constructor(voiceConnection: VoiceConnection, guildId: string) {
		this.voiceConnection = voiceConnection;
		this.guildId = guildId;
		this.queue = [];
		this.playing = undefined;
		this.audioPlayer = createAudioPlayer();

		// event change state
		this.voiceConnection.on('stateChange', async (_, newState) => {
			if (newState.status === VoiceConnectionStatus.Disconnected) {
				/*
                    Close with code 4014:
                        - can reconnect ? maybe switch channel
                        - be kicked current channel => destroy connect
                 */
				if (
					newState.reason ===
						VoiceConnectionDisconnectReason.WebSocketClose &&
					newState.closeCode === 4014
				) {
					try {
						await entersState(
							this.voiceConnection,
							VoiceConnectionStatus.Connecting,
							5000 //5s
						);
					} catch {
						this.leave();
					}
				} else if (this.voiceConnection.rejoinAttempts < 5) {
					this.voiceConnection.rejoin();
				} else {
					this.leave();
				}
			} else if (newState.status === VoiceConnectionStatus.Destroyed) {
				this.leave();
			} else if (
				!this.isReady &&
				(newState.status === VoiceConnectionStatus.Connecting ||
					newState.status === VoiceConnectionStatus.Signalling)
			) {
				// connection status is 'connecting' or 'signalling' => waiting 20s
				// after 20s, if connect failed, destroy connection
				this.isReady = true;
				try {
					await entersState(
						this.voiceConnection,
						VoiceConnectionStatus.Ready,
						20000 // 20s
					);
				} catch {
					if (
						this.voiceConnection.state.status !==
						VoiceConnectionStatus.Destroyed
					) {
						this.voiceConnection.destroy();
					}
				} finally {
					this.isReady = false;
				}
			}
		});

		// event change song when end, then switch to new song
		this.audioPlayer.on('stateChange', async (oldState, newState) => {
			if (
				newState.status === AudioPlayerStatus.Idle &&
				oldState.status !== AudioPlayerStatus.Idle
			) {
				await this.play();
			}
		});

		this.voiceConnection.subscribe(this.audioPlayer);
	}

	public async addSongs(queueItems: QueueItem[]): Promise<void> {
		this.queue = this.queue.concat(queueItems);
		if (!this.playing) {
			await this.play();
		}
	}

	public stop(): void {
		this.playing = undefined;
		this.queue = [];
		this.audioPlayer.stop();
	}

	// bot out current channel, delete current server in map
	public leave(): void {
		if (
			this.voiceConnection.state.status !==
			VoiceConnectionStatus.Destroyed
		) {
			this.voiceConnection.destroy();
		}
		this.stop();
		servers.delete(this.guildId);
	}

	public pause(): void {
		this.audioPlayer.pause();
	}

	public resume(): void {
		this.audioPlayer.unpause();
	}

	public async jump(position: number): Promise<QueueItem> {
		if (position < this.queue.length) {
			const target = this.queue[position - 1];
			this.queue = this.queue
				.splice(0, position - 1)
				.concat(this.queue.splice(position, this.queue.length - 1));
			this.queue.unshift(target);
			await this.play();
			return target;
		} else {
			// return undefined
			throw new Error('Position out of queue!!!!');
		}
	}

	public remove(position: number): QueueItem {
		return this.queue.splice(position - 1, 1)[0];
	}

	public async play(): Promise<void> {
		try {
			// play song in top queue if queue is not empty
			if (this.queue.length > 0) {
				this.playing = this.queue.shift() as QueueItem;
				let stream: any;
				const highWaterMark = 1024 * 1024 * 10;
				if (this.playing?.song.platform === Platform.YOUTUBE) {
					stream = ytdl(this.playing.song.url, {
						highWaterMark,
						filter: 'audioonly',
						quality: 'highestaudio',
					});
				} else if (
					this.playing?.song.platform === Platform.SOUND_CLOUND
				) {
					// Todo: implement soundcloud
				} else {
					throw new Error('Platform undefined');
				}
				const audioResource = createAudioResource(stream);
				this.audioPlayer.play(audioResource);
			} else {
				this.playing = undefined;
				this.audioPlayer.stop();
			}
		} catch (e) {
            // if stream song incorupted, play next song in queue
			this.play();
		}
	}
}

// map server bot in channel
export const servers = new Map<Snowflake, Server>();
