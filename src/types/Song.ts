// Song.ts

export enum Platform {
    YOUTUBE = 'Youtube',
    SOUND_CLOUND = 'SoundClound',
}

export interface Song {
    title: string;
    length: number;
    author: string;
    thumbnail: string;
    url: string;
    platform: Platform;
}