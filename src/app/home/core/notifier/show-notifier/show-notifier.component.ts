import { Component, OnInit } from '@angular/core';

import {DialogRef} from '../../../shared/dialog/DialogRef';
@Component({
  selector: 'app-show-notifier',
  templateUrl: './show-notifier.component.html',
  styleUrls: ['./show-notifier.component.css']
})
export class ShowNotifierComponent implements OnInit {
   notifications:Array<any>=null;
  constructor(private dialogRef:DialogRef) { }

  ngOnInit() {
    this.notifications=this.dialogRef.getOptions().data;
  }
  

}
