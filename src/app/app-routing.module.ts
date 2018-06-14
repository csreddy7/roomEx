import {NgModule} from "@angular/core";
import {RouterModule,Routes} from "@angular/router";



import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes:Routes=[
    {path:"",redirectTo:"login",pathMatch:"full"},
    {path:"login",component:LoginComponent},
    {   
        path:"home",
        loadChildren:"app/home/home.module#HomeModule"
    },
    {
        path:"register",
        component:RegisterComponent
    },
    {path:"**",component:ErrorPageComponent}
]
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{
    
}
