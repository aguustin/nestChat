import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Chat, ChatSchema, UsersInGroup } from 'src/schema/chat.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports:[MongooseModule.forFeature([
    {name: Chat.name, schema: ChatSchema},
    {name: UsersInGroup.name, schema:ChatSchema}
  ])],
  controllers: [ChatController],
  providers: [ChatService, Chat]
})
export class ChatModule {}
