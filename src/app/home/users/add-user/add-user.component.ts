import { Component, OnInit } from '@angular/core';


import {DialogRef} from '../../shared/dialog/DialogRef';
import { RoomService } from '../../core/room.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  constructor(private dialogRef:DialogRef,private roomService:RoomService) { }
  userName:string;
  phoneNo:string;
  userId:string;
  ngOnInit() {
    
  }

  save(){
    
    let data={
        name:this.userName,
        mobile:this.phoneNo,
        userId:this.userId
    };

    this.roomService.createUser(data).subscribe((data)=>{
        console.log(data);
        this.dialogRef.close();
    },(err)=>{
      console.log(err);
    });

  }

  
}
