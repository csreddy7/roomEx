import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'; 


import {UserComponent} from './user.component';
import { AddUserComponent } from './add-user/add-user.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [UserComponent, AddUserComponent],
  entryComponents:[AddUserComponent]
})
export class UsersModule { }
