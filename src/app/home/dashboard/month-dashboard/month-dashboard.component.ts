import { Component, OnInit ,ElementRef ,AfterViewInit} from '@angular/core';
import * as d3 from "d3";


import { RoomService } from '../../core/room.service';


@Component({
  selector: 'app-month-dashboard',
  templateUrl: './month-dashboard.component.html',
  styleUrls: ['./month-dashboard.component.css']
})
export class MonthDashboardComponent implements OnInit , AfterViewInit {

  months:Array<any>=[];
  years:Array<any>=[];
  selectedMonth=null;
  selectedYear=null;
  expenditures:Array<any>=[];
  

  constructor(private elRef:ElementRef,private roomService:RoomService) { 
    this.months=this.roomService.getMonths();
  }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    this.roomService.getYears().subscribe((data)=>{
      this.years=data;
      this.selectedMonth=this.months[0];
      this.selectedYear=this.years[0];
      fetchData.call(this);
    });

    function fetchData(){
      this.roomService.getExpendituresByMonthAndYear(this.selectedMonth.value,this.selectedYear.value).subscribe( expenditures=>{
        this.expenditures=expenditures;
        this.renderGraph();
      });
    }

  }

  refreshDashboard(){
    this.roomService.getExpendituresByMonthAndYear(this.selectedMonth.value,this.selectedYear.value).subscribe( expenditures=>{
      this.expenditures=expenditures;
      this.renderGraph();
    });
  }

  renderGraph(){
    if(this.expenditures.length>0){
      let firstWeekExp=0,secondWeekExp=0,thirdWeekExp=0,fourthWeekExp=0;
  
      //calculating weekly expenditures
      this.expenditures.reduce((sum,obj)=>{
        let day=new Date(obj.date).getDate();
        if(day>=1 && day<=7){
          firstWeekExp+=obj.amount;
        }else if(day>7 && day<=14){
          secondWeekExp+=obj.amount;
        }else if(day>14 && day<=21){
          thirdWeekExp+=obj.amount;
        }else{
          fourthWeekExp+=obj.amount;
        }
        return sum+obj.amount;
      },0);
  
      let data=[
        {"week":"1stWeek",value:firstWeekExp},
        {"week":"2ndWeek",value:secondWeekExp},
        {"week":"3rdWeek",value:thirdWeekExp},
        {"week":"4thWeek",value:fourthWeekExp}
      ]
     // rendering path

     let svg = d3.select("svg"),
     width = +svg.attr("width"),
     height = +svg.attr("height"),
     radius = Math.min(width, height) / 2,
     g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
 
    let color = d3.scaleOrdinal(["#fff", "#8a89a6", "#7b6888", "#6b486b"]);
    
    let pie = d3.pie()
        .sort(null)
        .value(function(d) { return d.value; });
    
    let path = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);
    
    let label = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);
    
    let arc = g.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
          .attr("class", "arc");
    
      arc.append("path")
          .attr("d", path)
          .attr("fill", function(d) { return color(d.data.week); });
    
      arc.append("text")
          .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
          .attr("dy", "0.35em")
          .text(function(d) { return d.data.week; });  
      
    }
  }
}
