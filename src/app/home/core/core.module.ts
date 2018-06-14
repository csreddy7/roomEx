import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from '@angular/forms'; 



import { NavigatorComponent } from './navigator/navigator.component';
import {RouterModule} from "@angular/router";
import { ActiveRoute } from './navigator/ActiveRoute';

import { NotifierComponent } from './notifier/notifier.component';
import { ShowNotifierComponent } from './notifier/show-notifier/show-notifier.component';
import { MessengerComponent } from './messenger/messenger.component';
import { MessageComponent } from './messenger/message/message.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    NavigatorComponent,
    ActiveRoute,
    NotifierComponent,
    ShowNotifierComponent,
    MessengerComponent,
    MessageComponent
  ],
  entryComponents:[ShowNotifierComponent,MessageComponent],
  exports:[NavigatorComponent,NotifierComponent,MessengerComponent]
})
export class CoreModule { }
