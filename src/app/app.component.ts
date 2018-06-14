import { Component } from '@angular/core';

import { RoomService } from './home/core/room.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(){
    // this.createDB(); using mongodb instead of indexDB
  }
  createDB(){
    if(window.indexedDB){
        let dbName="roomEx";
        let db=null;
        let request=indexedDB.open(dbName,2);
        request.onsuccess=(e:any)=>{
          // this.roomService.setDBInstance(e.target.result);
          db=e.target.result;
          console.log("  cccc"+db)
        }
        request.onerror=()=>{
          console.log("error while creatind indexdb");
        }
        request.onupgradeneeded=(e:any)=>{
          let db=e.target.result;
          db.createObjectStore("users",{autoIncrement : true});
          db.createObjectStore("expenditures",{autoIncrement : true});
          console.log("ddd"+db)
        }
    }else{
      alert("your browser doesn't support indexdb");
    }
  }
}
