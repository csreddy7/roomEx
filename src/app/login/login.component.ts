import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


import { RoomService } from '../home/core/room.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private userId:string=null;
  private password:string=null;
   roomService:RoomService=null;
  constructor( roomService:RoomService,private router:Router) { 
    this.roomService=roomService;
  }

  ngOnInit() {
  }

  validateUser(){
        let data={
          userId:this.userId,
          password:this.password
      };
      this.roomService.validateUser(data).subscribe((data:any)=>{
        if(data.valid){
          this.router.navigateByUrl("home");
          sessionStorage.setItem("userId",this.userId);
          this.roomService.initializeConnection();
        }else{
          this.router.navigateByUrl("error");
        }
    },(err)=>{
      console.log(err);
    });
  }
}
