import { Component, OnInit } from '@angular/core';

import {DialogRef} from '../../shared/dialog/DialogRef';
import { RoomService } from '../../core/room.service';
import {User} from "../../users/user";
import {Expenditure} from '../Expenditure';
@Component({
  selector: 'app-add-expenditure',
  templateUrl: './add-expenditure.component.html',
  styleUrls: ['./add-expenditure.component.css']
})
export class AddExpenditureComponent implements OnInit {
commodityName:string;
sponsor:User;
amount:number;
date:string;
expenditures:Array<any>=[]

constructor(private dialogRef:DialogRef,private roomService:RoomService) { }

  sponsors:Array<any>=[];
  ngOnInit() {
    this.roomService.getUsers().subscribe(sponsor=>{
        this.sponsors=sponsor;
    })
    this.roomService.getExpenditures().subscribe( expenditures=>{
      this.expenditures=expenditures;
    })
  }

  save(){
        
        let data={
          commodityName:this.commodityName,
          sponsor:this.sponsor,
          amount:this.amount,
          date:this.date
        };

        this.roomService.createExpenditures(data).subscribe((data)=>{
          console.log(data);
          this.dialogRef.close();
      },(err)=>{
        console.log(err);
      });
  }

  // save(){
  //   let db=this.roomService.getDBInstance();
  //   let transaction=db.transaction(["expenditures"],"readwrite");
  //   let expenditurStore=transaction.objectStore("expenditures");
  //   let request=expenditurStore.add({
  //     commodityName:this.commodityName,
  //     sponsor:this.sponsor,
  //     amount:this.amount,
  //     date:this.date
  //   })
  //   request.onsuccess=(e)=>{
  //     console.log("expenditure added");
  //     this.dialogRef.close();
  //   }
  //   request.onerror=()=>{
  //     console.log("error while adding expenditure")
  //   }
  // }
}
