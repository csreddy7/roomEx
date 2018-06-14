import { Component, OnInit, ViewChild  } from '@angular/core';

import { TabContainerComponent } from '../shared//tab-container/tab-container.component';
import { MonthDashboardComponent } from './month-dashboard/month-dashboard.component';
import {Tab} from '../shared//tab-container/Tab'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {
  @ViewChild(TabContainerComponent) tabContainer:TabContainerComponent;
  constructor() { }
  tabs:Array<Tab>=[];
  ngOnInit() {
    this.tabs=[
                new Tab("Monthly",MonthDashboardComponent)
              ];
  }
}
