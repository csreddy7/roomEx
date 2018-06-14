import { Component, OnInit ,ComponentFactoryResolver , ViewContainerRef, ViewChild} from '@angular/core';

import { RoomService } from '../core/room.service';
import {Dialog} from '../shared//dialog/Dialog';
import {AddExpenditureComponent} from './add-expenditure/add-expenditure.component'
import {Options} from '../shared/dialog/Options';
import {Expenditure} from './Expenditure';

@Component({
  selector: 'app-expenditure',
  templateUrl: './expenditure.component.html',
  styleUrls: ['./expenditure.component.css']
})
export class ExpenditureComponent implements OnInit {
  expenditures:Array<any>=[];
  summary:Array<any>=[];
  months:Array<any>=[];
  years:Array<any>=[];
  selectedMonth=null;
  selectedYear=null;
  totalAmount:number=null;
  averageAmount:Number=null;


  constructor(private roomService:RoomService,private dialog:Dialog,private vRef:ViewContainerRef) {
  
   }

  ngOnInit() {
    this.months=this.roomService.getMonths();

    this.roomService.getYears().subscribe((data)=>{
      this.years=data;
      this.selectedMonth=this.months[0];
      this.selectedYear=this.years[0];
      this.fetchData();
    });
  }

  addExpenditure(){
    let options:Options={
      title:"Add expenditure",
      width:"50rem",
      height:"45rem"
  }
    this.dialog.open(this.vRef,AddExpenditureComponent,undefined,options);
  }

  fetchData(){
    this.roomService.getExpendituresByMonthAndYear(this.selectedMonth.value,this.selectedYear.value).subscribe( expenditures=>{
      this.expenditures=expenditures;
    });
    this.roomService.getUserSummary(this.selectedMonth.value,this.selectedYear.value).subscribe( summary=>{
      this.summary=summary;
      this.totalAmount=summary.reduce((sum,obj)=>{
        return sum+obj.total;
      },0);
      this.averageAmount=Math.floor(this.totalAmount/this.summary.length);
    });
  }

  refreshExpenditures(){
     this.fetchData();
  }
}
