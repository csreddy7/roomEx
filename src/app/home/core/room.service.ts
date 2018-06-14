import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {CanActivate,CanActivateChild} from "@angular/router";
import {of} from "rxjs/observable/of";
import { HttpClient ,HttpHeaders } from '@angular/common/http';


import {User} from "../users/user";
import {Expenditure} from '../expenditure/Expenditure';

const httpHeaders=new HttpHeaders({"Content-Type":"application/json"});
const httpOptions={
  headers:httpHeaders
}

@Injectable()
export class RoomService implements CanActivate,CanActivateChild {
  db:IDBDatabase=null;
  socket:any=null;
  url:string="http://10.19.73.69:7474";
  constructor(private http:HttpClient) { }

  initializeConnection(){
    let userId=sessionStorage.getItem("userId");
    this.socket=new WebSocket("ws://10.19.73.69:7777?userId="+userId);
  
    this.socket.addEventListener("open",(event)=>{
        console.log("opened connection to ws server on 7777");
    });

  }

  canActivate(){
     return true;
  }

  canActivateChild(){
    return true;
  }
  getSocket(){
    return this.socket;
  }

  getUsers():Observable<any>{
    return this.http.get(this.url+"/users");
  }

  createUser(data){
    return this.http.post(this.url+"/users/create",data,httpOptions)
  }

  validateUser(data){
    return this.http.post(this.url+"/user/validate",data,httpOptions)
  }

  getExpenditures():Observable<any>{
    return this.http.get(this.url+"/expenditures");
  }

  getUserSummary(month,year):Observable<any>{
    return this.http.get(this.url+"/userSummary?month="+month+"&year="+year);
  }

  getNotifications():Observable<any>{
    return this.http.get(this.url+"/notifications");
  }
   
  getMonths():Array<any>{
      return [
        {value:1,name:"january"},
        {value:2,name:"febrauary"},
        {value:3,name:"march"},
        {value:4,name:"april"},
        {value:5,name:"may"},
        {value:6,name:"june"},
        {value:7,name:"july"},
        {value:8,name:"august"},
        {value:9,name:"september"},
        {value:10,name:"october"},
        {value:11,name:"november"},
        {value:12,name:"december"}
    ];
  }

  getYears():Observable<any>{
    return this.http.get(this.url+"/years");
}

  createExpenditures(data){
    return this.http.post(this.url+"/expenditures/create",data,httpOptions)
  }

  getExpendituresByMonthAndYear(month,year):Observable<any>{
    return this.http.get(this.url+"/expenditures/monthandyear?month="+month+"&year="+year);
  }
  
  // getExpenditures():Observable<Expenditure[]>{
  //   let observable= Observable.create((observer)=>{
  //       let db=this.getDBInstance(); 
  //       let expenditures=[];
  //       if(db){
  //         let transaction=db.transaction("expenditures");
  //         let objectStore=transaction.objectStore("expenditures");
  //         objectStore.openCursor().onsuccess=(e:any)=>{
  //             let cursor=e.target.result;
  //             if(cursor && cursor.value){
  //               expenditures.push(cursor.value);
  //               cursor.continue();
  //             }else{
  //               console.log("expenditures read complete",expenditures);
  //               observer.next(expenditures);
  //               observer.complete();
  //             }
  //         }
  //       }
  //   });
  //   return observable;
  // }
  
  setDBInstance(instance){
    this.db=instance;
  }

  getDBInstance(){
    return this.db;
  }
}
