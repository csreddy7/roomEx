import {Directive,ViewContainerRef} from "@angular/core";

@Directive({
    selector:"[component-host]"
})
export class ComponentHost{
    constructor(public vRef:ViewContainerRef){
        
    }
}