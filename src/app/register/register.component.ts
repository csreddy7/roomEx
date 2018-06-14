import { Component, OnInit } from '@angular/core';
import {Observable,Observer} from "rxjs";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  states:Array<any>=[];
  defaultOption=null;
  userId="";
  userPassword="";
  userName="";
  userMobile="";
  aadhar="";
  pan="";
  about="";
  gender=null;
  selectedState=null;
  constructor() { }

  ngOnInit() {
    this.states=[
      {name:"AP",value:"1"},
      {name:"TN",value:"2"}
    ];
    this.defaultOption={name:"--select--",value:"0"};
    this.selectedState=this.defaultOption;

    let array=[1,2,3,4];
    let obs = Observable.from(array);
   
    obs.forEach((data)=>{
      console.log("hii"+data+new Date().toString());
    });

  }
  registerUser(){
    console.log(this.gender)
  }

}
