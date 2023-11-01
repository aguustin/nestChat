import { Module } from '@nestjs/common';
import { ChatService } from './chat/chat.service';
import { ChatController } from './chat/chat.controller';
import { Chat, ChatSchema } from 'src/schema/chat.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name: Chat.name, schema: ChatSchema}])],
  providers: [ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
