import { ChatCommandData } from '@/types/ChatCommandData';
import { Constants, ApplicationCommandData, ChatInputApplicationCommandData } from 'discord.js';

export const slashSchema: ApplicationCommandData[] = [
    {
        name: 'play',
        description: 'Hát 1 bài hoặc 1 danh sách trên Dzutube',
        options: [
            {
                name: 'input',
                type: Constants.ApplicationCommandOptionTypes.STRING,
                description: 'URL hoặc từ khoá tìm kiếm video hoặc playlist trên Dzutube.',
                required: true
            }
        ]
    },
    // {
    //     name: 'soundcloud',
    //     description: 'Plays a song, album or playlist on SoundCloud',
    //     options: [
    //       {
    //         name: 'input',
    //         type: Constants.ApplicationCommandOptionTypes.STRING,
    //         description:
    //           'The url or keyword to search videos or playlist on SoundCloud',
    //         required: true,
    //       },
    //     ],
    //   },
      {
        name: 'skip',
        description: 'Nhảy đến bài tiếp theo.',
      },
      {
        name: 'queue',
        description: 'Xem danh sách bài hái hiện tại.',
      },
      {
        name: 'pause',
        description: 'Tạm dừng bài đang hát.',
      },
      {
        name: 'resume',
        description: 'Tiếp tục hát bài đang dừng.',
      },
      {
        name: 'leave',
        description: 'Rời khỏi kênh đang hát.',
      },
      {
        name: 'np',
        description: 'Xem bài đang hát.',
      },
      {
        name: 'jump',
        description: 'Nhảy đến một bài trong hàng đợi.',
        options: [
          {
            name: 'position',
            type: Constants.ApplicationCommandOptionTypes.NUMBER,
            description: 'Vị trí bài cần nhảy.',
            required: true,
          },
        ],
      },
      {
        name: 'remove',
        description: 'Xoá 1 bài trong hàng đợi.',
        options: [
          {
            name: 'position',
            type: Constants.ApplicationCommandOptionTypes.NUMBER,
            description: 'Vị trí của bằi trong hàng đợi.',
            required: true,
          },
        ],
      },
      {
        name: 'ping',
        description: 'Xem ping.',
      },
      {
        name: 'help',
        description: 'Hướng dẫn sử dụng.',
      },
]

// export const prefix = '!';

export const chatCommand: ChatCommandData[] = [
  {
    name: '!nuabot_deploy',
    description: 'Deploy slash command to server',
    role: 'admin',
  }
]