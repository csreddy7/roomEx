import { Component, OnInit ,ComponentFactoryResolver , ViewContainerRef, ViewChild} from '@angular/core';

import { RoomService } from '../core/room.service';
import {User} from "./user";
import { AddUserComponent } from './add-user/add-user.component';
import {Dialog} from '../shared//dialog/Dialog';
import {Options} from '../shared//dialog/Options';
@Component({
    selector:'app-users',
    templateUrl:'./user.component.html',
    styleUrls:['./user.component.css']
})
export class UserComponent implements OnInit{
    users:Array<any>=[];
    constructor(private roomService:RoomService,private dialog:Dialog,private vRef:ViewContainerRef){}
    ngOnInit() {
        this.roomService.getUsers().subscribe(users=>{
            this.users=users;
        },err=>console.log("error while getting users",err));
    }
    addUser(){
        console.log("adduser clicked"); 
        let options:Options={
            title:"Add user",
            width:"50rem",
            height:"30rem"
        }
        this.dialog.open(this.vRef,AddUserComponent,undefined,options);
    }
}