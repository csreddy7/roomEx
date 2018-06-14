import { Component, Input, OnInit ,ViewChild,ViewContainerRef ,ComponentFactoryResolver,ComponentRef,AfterViewInit,ChangeDetectorRef} from '@angular/core';

import {Tab} from './Tab'
@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.css']
})
export class TabContainerComponent implements OnInit ,AfterViewInit {
  @ViewChild("tabContent",{read:ViewContainerRef}) tabContent:ViewContainerRef;
  @Input() tabs:Array<Tab>=[];
  constructor(private componentFactoryResolver: ComponentFactoryResolver, public changeDetectorRef:ChangeDetectorRef) { } 

  ngOnInit() {

  }
  
  ngAfterViewInit(){
    if(this.tabs.length>0){ 
        this.showTab(this.tabs[0])
    }
  }

  addTab(tab:Tab){
    this.tabs.push(tab);
  }

  showTab(tab:Tab){
    setTimeout(()=>{
        let factory=this.componentFactoryResolver.resolveComponentFactory(tab.component);
        this.tabContent.clear();
        this.tabContent.createComponent(factory);
    },0);
  }
  
}
