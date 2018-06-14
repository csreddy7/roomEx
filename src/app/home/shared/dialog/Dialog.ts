import {Injectable ,Component, ComponentFactoryResolver , ViewContainerRef,ComponentRef,ComponentFactory} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

import { DialogComponent } from './dialog.component';
import {DialogRef} from './DialogRef';
import {Options} from './Options';
@Injectable()
export class Dialog{
    dialogRef:ComponentRef<DialogComponent>=null;
    constructor(private componentFactoryResolver: ComponentFactoryResolver,private dialogService:DialogRef){

    }

    open(vRef:ViewContainerRef, component?:Function, content?:String, options?:Options){
        this.dialogRef=this.dialogService.getDialogRef();
        if(!this.dialogRef){
            if(component){
                this.dialogService.setComponent(component);
            }
            if(content){
                this.dialogService.setContent(content);
            }
            if(options){
                this.dialogService.setOptions(options);
            }
            let dialogFactory=this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
            this.dialogRef=vRef.createComponent(dialogFactory);
            // this.dialogRef.instance.createComponent();
            this.dialogService.setDialogRef(this.dialogRef);
            
        }else{
            console.info("dialog already opened.Please close the dialog and retry");
        }
    }
    
}