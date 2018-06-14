import { Component, OnInit  } from '@angular/core';


import {DialogRef} from '../../../shared/dialog/DialogRef';
import { RoomService } from '../../room.service';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
   messages:Array<any>=[];
   newMessage:string="";
   private socket:any=null;
  constructor(private dialogRef:DialogRef,private roomSerivice:RoomService) { }

  ngOnInit() {
    this.socket=this.roomSerivice.getSocket();
    if(this.socket){
      this.socket.addEventListener("message",(event)=>{
        console.log("message from server",event.data);
        this.pushNotifications(event.data);
      });
    }
  }
  postMessage(){
    let userId=sessionStorage.getItem("userId");
    let obj={userId:userId,data:this.newMessage};
    this.messages.push(obj);

    //sending message to the other user
    let message={message:{userId:this.dialogRef.options.data.userId,data:this.newMessage}};
    this.socket.send(JSON.stringify(message));
    
    this.newMessage="";
  }

  pushNotifications(response){
    let data=JSON.parse(response);
    if(data.message){
      this.messages.push(data.message);
    }
  }

}
