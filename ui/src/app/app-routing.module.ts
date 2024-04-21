import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyComponent } from './property/property.component';
import { ExpenseComponent } from './expense/expense.component';
import { TenantComponent } from './tenant/tenant.component';
import { DocumentComponent } from './document/document.component';
import { SettingsComponent } from './settings/settings.component';
import { OverviewComponent } from './overview/overview.component';
import { HomeExpenseComponent } from './home-expense/home-expense.component';

const routes: Routes = [
  { path: '', redirectTo: 'properties', pathMatch: 'full' },
  { path: 'properties', component: PropertyListComponent },
  { path: 'properties/:name', component: PropertyComponent },
  { path: 'tenants', component: TenantComponent },
  { path: 'tenants/:propertyName', component: TenantComponent },
  { path: 'expenses', component: ExpenseComponent },
  { path: 'expenses/:propertyName/:year', component: ExpenseComponent },
  { path: 'homeExpenses', component: HomeExpenseComponent },
  { path: 'homeExpenses/:propertyName/:year', component: HomeExpenseComponent },  
  { path: 'documents', component: DocumentComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'overview', component: OverviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
