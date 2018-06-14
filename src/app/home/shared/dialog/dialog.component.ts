import { Component, ViewChild,ComponentFactoryResolver ,OnInit , AfterViewInit , ComponentRef , OnDestroy} from '@angular/core';

import {ComponentHost} from './anchor';
import {DialogRef} from './DialogRef';
import {Options} from './Options';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit,AfterViewInit,OnDestroy{
  @ViewChild(ComponentHost)  cHost: ComponentHost;
  content:String="";
  title:String="sample dialog";
  styleObj={};
  options:Options;
  componentRef:ComponentRef<any>;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,private dialogService:DialogRef) {

   }

   ngOnInit(){
      this.options = this.dialogService.getOptions();
      if(this.options.title){
        this.title=this.options.title;
      }
   }

   ngAfterViewInit(){
    this.createComponent();
   }
   
   ngOnDestroy(){
     if(this.componentRef){
      this.componentRef.changeDetectorRef.detach();
     }
   }
   
   createComponent(){
      let component=this.dialogService.getComponent();
      let content=this.dialogService.getContent();

      if(this.options.width && this.options.height){
         this.styleObj={'width':this.options.width,'height':this.options.height}
      }

      if(content){
          this.content=content;
      }

      if(component){
          let factory=this.componentFactoryResolver.resolveComponentFactory(component);
          let vRef= this.cHost.vRef;
          vRef.clear();
          this.componentRef=vRef.createComponent(factory);
          this.componentRef.changeDetectorRef.detectChanges();
      }
   }

   cancel(){
     this.dialogService.close();
   }
   
}
