import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDto, MessagesDto, UsersInGroupDto, ContactsDto } from 'src/dto/chat.dto';


@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService){}

    @Get()
    findAll(){
        return this.chatService.findAll();
    }

    @Post('/createUser')
    async createUser(@Body() createUs: any) {
         return this.chatService.createUserService(createUs);
    }

    @Post('/loginUser')
    findOne(@Body() userInfo: any) {   
        const userInfoJson = JSON.stringify(userInfo);
        try{
            return this.chatService.getUser(userInfoJson);
        } catch (error) {
            console.log(error);
        }
    }

    @Put('/updateUserInfo')  //----------------------------------------------------------- ARREGLAR, NO LLEGAN LOS DATOS POR POSTMAN ------- (probar este fue salteado por mi porque si)
    async updateUser(@Body() mail: string, name: string, lastname: string, filename: File){
        return this.chatService.updateUserService(mail, name, lastname, filename);
    }
    
    @Post('/createGroup')
    async createGroup(@Body() createGroup: any){
        const createGroupJson = JSON.stringify(createGroup);
        return this.chatService.createGroupService(createGroupJson);
    }

    @Get('/showGroups/:userId')                            //----------------------------------------- probar esta funcionalidad (deberia traer el documento entero en los que el id del usuario esta dentro de "usersIn")
    async showGroups(@Param() userId: string){
        return this.chatService.showGroupsService(userId);
    }

    @Post('/getInUser')
    async getInUser(@Body() getInUser: any){
        const getInUserJson = JSON.stringify(getInUser);
        return this.chatService.getInUserService(getInUserJson);
    }

    @Delete('/deleteUser/:groupId/:idMember')
    async deleteUser(@Param() groupId: any, idMember: any){
        const deleteUserJson = JSON.stringify(groupId, idMember);
        return this.chatService.deleteUserService(deleteUserJson);
    }

    @Delete('/deleteGroup/:groupId') //hacer funcionalidad en front y probar
    async deleteGroupController(@Param() groupId: any){
        return this.chatService.deleteGroupService(groupId);
    }

    @Post('/searchUsers')
    async searchUser(@Body() username: any){
        //const searchUserJson = JSON.stringify(username);
        return this.chatService.searchUserService(username);
    }

   /* @Post('/sendMessage')
    async sendMessage(@Body() messageBody: MessagesDto){
        return this.chatService.sendMessageService(messageBody)
    }*/

    @Post('/addContact')
    async addContactController(@Body() addContact: any){
        return this.chatService.addContactService(addContact);
    }

   @Get('/groupChat/:sessionId/:groupId')
    async openGroupChatController(@Param() ids){
        return this.chatService.openGroupChatService(ids);
    }
    
    @Get('/:sessionId/:contactId')
    async openContactChatController(@Param() ids){
       return this.chatService.openContactChatService(ids);
    }

    @Delete('/deleteContact/:sessionId/:contactId')
    async deleteContactController(@Param() ids: any){
        return this.chatService.deleteContactService(ids)
    }
    
    @Post('/sendMessage')
    async contactMessageController(@Body() messageData: any){
        return this.chatService.contactMessageService(messageData);
    }

    @Get('/conversations')
    async getConversationsController(){
        return this.chatService.getAllConversations();
    }
}
