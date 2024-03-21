import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyComponent } from './components/property/property.component';
import { ExpenseComponent } from './expense/expense.component';
import { TenantComponent } from './tenant/tenant.component';

const routes: Routes = [
  { path: '', redirectTo: 'properties', pathMatch: 'full' },
  { path: 'properties', component: PropertyListComponent },
  { path: 'properties/:name', component: PropertyComponent },
  { path: 'tenants', component: TenantComponent },
  { path: 'tenants/:propertyName', component: TenantComponent },
  { path: 'expenses', component: ExpenseComponent },
  { path: 'expenses/:propertyName/:year', component: ExpenseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
