import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'; 

import { ExpenditureComponent } from './expenditure.component';
import { AddExpenditureComponent } from './add-expenditure/add-expenditure.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ExpenditureComponent, AddExpenditureComponent],
  entryComponents:[AddExpenditureComponent]
})
export class ExpenditureModule { }
