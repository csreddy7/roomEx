import { Component, OnInit ,ElementRef ,AfterViewInit} from '@angular/core';

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
  showEmpty:boolean=false;

 expenditures:Array<any>=[];
  private graph:any=null;
  private graphHeight:number=0;
  private graphWidth:number=0;
  private totalAmount:number=0;
  private firstWeekXPos:number=0;
  private secondWeekXPos:number=0;
  private thirdWeekXPos:number=0;
  private fourthWeekXPos:number=0;
  

  constructor(private elRef:ElementRef,private roomService:RoomService) { 
    this.months=this.roomService.getMonths();
  }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    this.graph=this.elRef.nativeElement.querySelector(".svg-graph"); //graph element reference
    this.renderAxis();
    this.renderTimeRow();

    this.roomService.getYears().subscribe((data)=>{
      this.years=data;
      this.selectedMonth=this.months[0];
      this.selectedYear=this.years[0];
      fetchData.call(this);
    });

    function fetchData(){
      this.roomService.getExpendituresByMonthAndYear(this.selectedMonth.value,this.selectedYear.value).subscribe( expenditures=>{
        this.expenditures=expenditures;
        this.renderExpenditureColumn();
        this.renderGraph();
      });
    }

  }
  
  renderAxis(){
    let xAxis=document.createElementNS(this.graph.namespaceURI,"line");
    xAxis.setAttribute("x1","100");
    xAxis.setAttribute("x2","95%");
    xAxis.setAttribute("y1","88%");
    xAxis.setAttribute("y2","88%");
    xAxis.setAttribute("stroke","#1d8bac");
    xAxis.setAttribute("stroke-width","2");
    this.graph.appendChild(xAxis);

    let yAxis=document.createElementNS(this.graph.namespaceURI,"line");
    yAxis.setAttribute("x1","100");
    yAxis.setAttribute("x2","100");
    yAxis.setAttribute("y1","10");
    yAxis.setAttribute("y2","88%");
    yAxis.setAttribute("stroke","#1d8bac");
    yAxis.setAttribute("stroke-width","2");
    this.graph.appendChild(yAxis);
  }

  refreshDashboard(){
    this.roomService.getExpendituresByMonthAndYear(this.selectedMonth.value,this.selectedYear.value).subscribe( expenditures=>{
      this.expenditures=expenditures;
      this.graph.innerHTML="";
      this.renderAxis();
      this.renderTimeRow();
      this.renderExpenditureColumn();
      this.renderGraph();
    });
  }

  renderTimeRow(){

      
      //calculating graph dimensions
      let dimensions=this.graph.getBoundingClientRect();
      this.graphWidth=dimensions.width;
      this.graphHeight=dimensions.height;

      // calculating line width
      let lineWidth=Math.floor(((this.graphWidth*95)/100));
      let textY="90%";

      //calculating x positions of text
      this.firstWeekXPos=Math.floor((lineWidth/4)-100);
      this.secondWeekXPos=Math.floor((lineWidth/2)-100);
      this.thirdWeekXPos=Math.floor(((lineWidth*3)/4)-100);
      this.fourthWeekXPos=Math.floor(lineWidth-100);

      //rendering text
      this.createText(this.firstWeekXPos,textY,"1st week");
      this.createText(this.secondWeekXPos,textY,"2nd week");
      this.createText(this.thirdWeekXPos,textY,"3rd week");
      this.createText(this.fourthWeekXPos,textY,"4th week");

  }

 

  renderExpenditureColumn(){
    if(this.expenditures.length>0){
      this.totalAmount=this.expenditures.reduce((sum,obj)=>{
        return sum+obj.amount;
      },0);
      console.log(this.totalAmount);
      let textX=50; // text x position

      // calculating values to be displayed
      let value1=this.totalAmount;
      let value2=Math.floor((this.totalAmount*3)/4);
      let value3=Math.floor(this.totalAmount/2);
      let value4=Math.floor(this.totalAmount/4);

      // calculating y poistions 
      let lineHeight=Math.floor(((this.graphHeight*88)/100));
      let textY4=lineHeight-100;
      let textY3=Math.floor(((lineHeight*3)/4)-100);
      let textY2=Math.floor((lineHeight/2)-100);
      let textY1=Math.floor((lineHeight/4)-100);

      //rendering text
      this.createText(textX,textY1,value1);
      this.createText(textX,textY2,value2);
      this.createText(textX,textY3,value3);
      this.createText(textX,textY4,value4);
    }
  }

  renderGraph(){
    if(this.expenditures.length>0){
      let path="";
      let firstWeekExp=0,secondWeekExp=0,thirdWeekExp=0,fourthWeekExp=0;
      let pathObj:any=document.createElementNS(this.graph.namespaceURI,"path");
  
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
  
     // rendering path
  
      let svgOriginX=100;
      let svgOriginY=Math.floor(((this.graphHeight*88)/100));
      path+="M "+svgOriginX+","+svgOriginY;
  
      if(firstWeekExp){
          let posY=svgOriginY-Math.floor(((firstWeekExp*svgOriginY)/this.totalAmount));
          let posX=this.firstWeekXPos;
          path+=" L "+posX+","+posY;
          this.createCircle(posX,posY);
      }
      if(secondWeekExp){
        let posY=svgOriginY-Math.floor(((secondWeekExp*svgOriginY)/this.totalAmount));
        let posX=this.secondWeekXPos;
        path+=" L "+posX+","+posY;
        this.createCircle(posX,posY);
      } 
      if(thirdWeekExp){
        let posY=svgOriginY-Math.floor(((thirdWeekExp*svgOriginY)/this.totalAmount));
        let posX=this.thirdWeekXPos;
        path+=" L "+posX+","+posY;
        this.createCircle(posX,posY);
      }
      if(fourthWeekExp){
        let posY=svgOriginY-Math.floor(((fourthWeekExp*svgOriginY)/this.totalAmount));
        let posX=this.fourthWeekXPos;
        path+=" L "+posX+","+posY;
        this.createCircle(posX,posY);
      }
      pathObj.setAttribute("d",path);
      pathObj.setAttribute("fill","transparent");
      pathObj.setAttribute("stroke","#1d8bac");
      this.graph.appendChild(pathObj);
    }
  }

  createText(textX,textY,content){
    let textElement=document.createElementNS(this.graph.namespaceURI,"text");
    textElement.setAttribute("x",textX);
    textElement.setAttribute("y",textY);
    textElement.setAttribute("fill","#1d8bac");
    textElement.textContent=content;
    this.graph.appendChild(textElement);
}

createCircle(x,y){
  let circleElement=document.createElementNS(this.graph.namespaceURI,"circle");
  circleElement.setAttribute("cx",x);
  circleElement.setAttribute("cy",y);
  circleElement.setAttribute("r","5");
  circleElement.setAttribute("fill","#1d8bac");
  this.graph.appendChild(circleElement);
}

}
