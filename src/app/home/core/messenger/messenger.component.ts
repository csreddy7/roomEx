import { Component, OnInit ,ViewContainerRef } from '@angular/core';

import { RoomService } from '../room.service';
import {Dialog} from '../../shared//dialog/Dialog';
import {Options} from '../../shared/dialog/Options';
import { MessageComponent } from './message/message.component';
@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {

  users:Array<any>=[];
  userGroupClass:string='user-group';
  constructor(private dialog:Dialog,private vRef:ViewContainerRef, private roomService:RoomService) { }

  ngOnInit() {
      this.roomService.getUsers().subscribe(users=>{
        let userId=sessionStorage.getItem("userId");
        users=users.filter((user)=>{
          return user.userId !=userId;
        });
        this.users=users;
    },err=>console.log("error while getting users",err));
  }

  showUsers(){
    if(this.userGroupClass.indexOf("slide-animation")==-1){
      this.userGroupClass="user-group slide-animation";
    }else{
      this.userGroupClass="user-group hide-animation";
    }
  }

  openChatBox(data){
    let options:Options={
      title:"Chat box",
      width:"40rem",
      height:"40rem",
      data:data
    }
    this.dialog.open(this.vRef,MessageComponent,undefined,options);
  }

}
