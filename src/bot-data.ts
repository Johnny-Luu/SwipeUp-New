import {Message, MESSAGE_TYPE} from './interface';

export const BOT_ID = '-1';
export const BOT_NAME = 'BOT.JARVIS';
export const CHATBOT_AVATAR = require('../assets/icon/icon-robot.png');

export const initialChatbotMessages: Message[] = [
  {
    id: '1',
    type: MESSAGE_TYPE.MESSAGE,
    senderId: BOT_ID,
    message: 'Hello there!',
    image: '',
    createdAt: new Date().getTime(),
  },
  {
    id: '2',
    type: MESSAGE_TYPE.MESSAGE,
    senderId: BOT_ID,
    message:
      'I am JARVIS and I can help you keep yourself safely in the Covid era by providing many useful informations',
    image: '',
    createdAt: new Date().getTime(),
  },
];
