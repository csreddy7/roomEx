import {Directive,HostListener,ElementRef} from '@angular/core';
import {Router} from '@angular/router';
@Directive({
    selector:"[active-route]"
})
export class ActiveRoute{
    styleObj:any;
    constructor(private route:Router,private eleRef:ElementRef){

    }
    ngOnInit(){
       
    }

    @HostListener('click') onclick(e){
        let arr=this.eleRef.nativeElement.children,
            length=arr.length;
        for(let i=0;i<length;i++){
            if("/home/"+arr[i].getAttribute("name")!=this.route.url){
                arr[i].style.color="#1d8bac";
            }else{
                arr[i].style.color="#a93e5b";
            }
        }
    }
}