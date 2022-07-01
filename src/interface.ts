export enum MESSAGE_TYPE {
  MESSAGE = 'message',
  IMAGE = 'image',
}

export interface Message {
  id?: string;
  type: MESSAGE_TYPE;
  senderId: string;
  message: string;
  image: string;
  createdAt: number;
}
