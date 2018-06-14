import { NgModule } from '@angular/core';

import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import { HomeComponent } from './home.component';
import{HomeRoutingModule} from './home-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ExpenditureModule } from './expenditure/expenditure.module';
import {UsersModule} from './users/users.module';

@NgModule({
  imports: [
    CoreModule,
    DashboardModule,
    ExpenditureModule,
    UsersModule,
    HomeRoutingModule,
    SharedModule
  ],
  exports:[SharedModule,HomeRoutingModule],
  declarations: [HomeComponent]
})
export class HomeModule { }

