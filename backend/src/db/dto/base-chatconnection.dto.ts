export class BaseChatConnectionDto{
    chatId : string;
    type : string;
    participants: {
        userId: number
    }[];
    chatName?: string | undefined;
    
}