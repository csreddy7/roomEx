import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DialogComponent } from './dialog/dialog.component';
import {ComponentHost} from './dialog/anchor';
import {Dialog} from './dialog/Dialog';
import {DialogRef} from './dialog/DialogRef';
import {FilterName} from "./directives/FilterName";
import {CopyElement} from "./directives/CopyElement";
import {HighLight} from "./directives/HighLight";
import {TextTransform} from "./pipes/TextTransform";


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DialogComponent,
    ComponentHost,
    FilterName,
    HighLight,
    CopyElement,
    TextTransform
  ],
  exports:[FilterName],
  entryComponents:[DialogComponent],
  providers:[Dialog,DialogRef]
})
export class SharedModule { }
