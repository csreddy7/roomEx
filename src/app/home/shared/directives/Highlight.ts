import {Directive,ElementRef}  from "@angular/core";

@Directive({
    selector:"[highLight]"
})
export class HighLight{
    constructor(el:ElementRef){
        el.nativeElement.style.backgroundColor="green";
    }
}