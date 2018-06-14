import { Injectable ,ComponentRef } from '@angular/core';

import { DialogComponent } from './dialog.component';
import {Options} from './Options';
@Injectable()
export class DialogRef {
  dialogRef:ComponentRef<DialogComponent>=null;
  component:any=null;
  content:String=null;
  options:Options;
  constructor() { }
  setDialogRef(dialogRef){
    this.dialogRef=dialogRef;
  }
  getDialogRef(){
    return this.dialogRef;
  }
  setOptions(options){
    this.options=options;
  }
  getOptions(){
    return this.options;
  }
  setContent(content){
    this.content=content;
  }
  getContent(){
    return this.content;
  }
  close(){
    this.dialogRef.destroy();
    this.dialogRef=null;
  }
  setComponent(component:any){
    this.component=component;
  }

  getComponent():any{
    return this.component;
  }
}