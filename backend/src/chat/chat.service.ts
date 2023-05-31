import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request, Response } from 'express';
import {
  connectToChat,
  addChatConnectionToDB,
  removeUserFromGroup,
} from '../db/mock/messageMock';

import { Message, MessageDocument } from 'src/db/schemas/message.schema';
import { ChatConnection, ChatConnectionDocument } from 'src/db/schemas/chatconnection.schema';
import { User, UserDocument } from 'src/db/schemas/user.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Message.name) private readonly messageModel: Model<MessageDocument>,
    @InjectModel(ChatConnection.name) private readonly chatConnectionModel: Model<ChatConnectionDocument>
  ){}

  connectToChat(req: Request, res: Response): void {
    const { type, chatName, recipientNames, username } = req.body;
    const chatConn = connectToChat({
      type,
      chatName,
      recipientNames,
      username,
    });
    if (chatConn) {
      console.log(`Connected to chat ${chatConn.chatId}!`);
      res.json(chatConn);
      return;
    }

    console.log('Failed to connect to chat!');
    res.status(400).json({ status: 'failed' });
  }

  createGroupChat(req: Request, res: Response): void {
    const { type, chatName, recipientNames, username } = req.body;
    const chatConn = addChatConnectionToDB({
      type,
      chatName,
      recipientNames,
      username,
    });
    if (chatConn.status === 'success') {
      console.log(`Created a group chat ${chatName}!`);
      res.json(chatConn);
      return;
    }

    console.log('Failed to create group chat!');
    res.status(400).json({ status: 'failed' });
  }

  // addUserToGroup(req: Request, res: Response): void {
  //   const { chatId, username } = req.body;
  //   const added = addUserToGroup({
  //     chatId,
  //     username,
  //   });
  //   if (added.status === 'success') {
  //     console.log(`Added user ${username} to group chat!`);
  //     res.json(added);
  //     return;
  //   }

  //   console.log('Failed to add user to group chat!');
  //   res.status(400).json({ status: 'failed' });
  // }

  async addUserToGroup(req: Request, res: Response): Promise<void> {
    const { chatId } = req.body; // TODO: Test for prototype pollution
    const group = await this.chatConnectionModel.findOne({chatId:chatId}).exec()

    if (group){
      let updatedGroup:ChatConnection = Object.assign({}, group)
      
      // Fetch the userId of current logged in user from session. 
      const user = await this.userModel.findOne({username:req.headers['X-Username']}).exec()

      // Check if user is already present in the group and proceed 
      if (!updatedGroup.participants.find( participant => participant.userId == user.userId)){
        updatedGroup.participants.push({ userId: user.userId })
        await this.chatConnectionModel.updateOne({chatId:chatId}, updatedGroup)
        console.log(`Added user ${user.username} to group chat!`);
      }
      else{
        console.log('User already present in the group chat!');
        res.status(400).json({ status: 'failed : User already present in the group chat!' });
      }
    }
    console.log('Group not found!');
    res.status(400).json({ status: 'failed : Group not found!' });
  }


  removeUserFromGroup(req: Request, res: Response): void {
    const { chatId, username } = req.body;
    const removed = removeUserFromGroup({
      chatId,
      username,
    });
    if (removed.status === 'success') {
      console.log(`Removed user ${username} from group chat!`);
      res.json(removed);
      return;
    }

    console.log('Failed to remove user from group chat!');
    res.status(400).json({ status: 'failed' });
  }
}
