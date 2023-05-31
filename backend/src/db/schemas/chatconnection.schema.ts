import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatConnectionDocument = ChatConnection & Document;

@Schema()
export class ChatConnection{
    @Prop({ required: true })
    chatId : string;

    @Prop({ required: true })
    type : string;

    @Prop({ required: true })
    participants: {
      userId: number
    }[];

    @Prop({ required: true })
    chatName?: string | undefined;
}


export const ChatConnectionSchema = SchemaFactory.createForClass(ChatConnection);