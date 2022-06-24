import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BtcComponent } from './btc/btc.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"btc", component:BtcComponent},
  {path:"form", component:FormComponent},
  {path:"calculator", component:CalculatorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
