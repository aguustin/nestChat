import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Chat, ChatSchema, UsersInGroup } from 'src/schema/chat.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Contacts, ContactsSchema } from 'src/schema/messages.schema';


@Module({
  imports:[MongooseModule.forFeature([
    {name: Chat.name, schema: ChatSchema},
    {name: UsersInGroup.name, schema:ChatSchema},
    {name: Contacts.name, schema:ContactsSchema}
  ])],
  controllers: [ChatController],
  providers: [ChatService, Chat, Contacts]
})
export class ChatModule {}
