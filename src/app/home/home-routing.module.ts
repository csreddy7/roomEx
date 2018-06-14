import {NgModule} from "@angular/core";
import {RouterModule,Routes} from "@angular/router";


import {UserComponent} from "./users/user.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ExpenditureComponent} from "./expenditure/expenditure.component";
import { HomeComponent } from '../home/home.component';
import { RoomService } from './core/room.service';

const routes:Routes=[
    {
        path:"",
        component:HomeComponent,
        canActivate:[RoomService],
        canActivateChild:[RoomService],
        children:[
            {path:"",redirectTo:"dashboard",pathMatch:"full"},
            {path:"dashboard",component:DashboardComponent},
            {path:"users",component:UserComponent},
            {path:"expenditure",component:ExpenditureComponent}
        ]
    }
    
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class HomeRoutingModule {}