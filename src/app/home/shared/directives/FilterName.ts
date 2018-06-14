import {Directive , Input}  from "@angular/core";
import { NG_VALIDATORS,Validator,AbstractControl } from '@angular/forms';

@Directive({
    selector:"[filterName]",
    providers:[{provide:NG_VALIDATORS,useExisting:FilterName,multi:true}]
})
export class FilterName implements Validator{
    @Input("filterName") userName:string;
    constructor(){}
    validate(control:AbstractControl):any{
        let value=control.value;
        let reg=new RegExp(this.userName);
        return reg.test(value)?{"filterName":{val:value}}:null;
    }
}