import { Component, OnInit,ViewContainerRef ,AfterViewInit } from '@angular/core';

import {ShowNotifierComponent} from './show-notifier/show-notifier.component';
import {Dialog} from '../../shared//dialog/Dialog';
import {Options} from '../../shared/dialog/Options';
import { RoomService } from '../room.service';
@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.css']
})
export class NotifierComponent implements OnInit,AfterViewInit{
  private socket:any=null;
  count:number=0;
  private notifications:Array<any>=[];
  constructor(private dialog:Dialog,private vRef:ViewContainerRef, private roomSerivice:RoomService) { }

  ngOnInit() {
    this.roomSerivice.getNotifications().subscribe((notifications)=>{
      this.notifications=notifications;
      this.count=this.notifications.length;
    });
  }

  ngAfterViewInit(){
    this.socket=this.roomSerivice.getSocket();
    if(this.socket){
      this.socket.addEventListener("message",(event)=>{
        console.log("message from server",event.data);
        this.pushNotifications(event.data);
      });
    }
  }


  pushNotifications(response){
    let data=JSON.parse(response);
    if(data.notification){
      this.notifications.push({message:data});
      console.log(this.notifications);
      this.count=this.notifications.length;
    }
  }

  showNotifications(){
    let options:Options={
      title:"Notifications",
      width:"50rem",
      height:"45rem",
      data:this.notifications
  }
    this.dialog.open(this.vRef,ShowNotifierComponent,undefined,options);
  }

}
