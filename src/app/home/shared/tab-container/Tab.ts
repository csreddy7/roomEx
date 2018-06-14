import { Injectable } from '@angular/core';
@Injectable()
export class Tab{
    title:string="";
    component:any;
    constructor(title,component){
        this.title=title;
        this.component=component;
    }
}