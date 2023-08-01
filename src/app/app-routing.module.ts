import { RouterModule, Routes } from '@angular/router';

import { EmployeeTabComponent } from './components/dealer_master/employee-tab/employee-tab.component';
import { MainDealerComponent } from './components/dealer_master/main-dealer.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: '/main-dealer', pathMatch: 'full' },
  { path: 'main-dealer', component: MainDealerComponent },
  { path: 'employee', component: EmployeeTabComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
