import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'; 

import { DashboardComponent } from './dashboard.component';
import { TabContainerComponent } from '../shared/tab-container/tab-container.component';
import { MonthDashboardComponent } from './month-dashboard/month-dashboard.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [DashboardComponent,TabContainerComponent, MonthDashboardComponent],
  entryComponents:[MonthDashboardComponent]
})
export class DashboardModule { }
