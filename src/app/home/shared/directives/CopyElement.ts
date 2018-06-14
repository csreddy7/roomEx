import {Directive,ViewContainerRef,TemplateRef,Input,OnChanges} from "@angular/core";

@Directive({
    selector:"[appCopy]"
})
export class CopyElement{
    @Input() set appCopy(cond:boolean){
        if(cond){
            this.vcf.createEmbeddedView(this.tp);
        }else{
            this.vcf.clear();
        }
    };
    constructor(private vcf:ViewContainerRef,private tp:TemplateRef<any>){
      
    }
}