import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyComponent } from './property/property.component';
import { ExpenseComponent } from './expense/expense.component';
import { TenantComponent } from './tenant/tenant.component';
import { DocumentComponent } from './tenant/document/document.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: 'properties', pathMatch: 'full' },
  { path: 'properties', component: PropertyListComponent },
  { path: 'properties/:name', component: PropertyComponent },
  { path: 'tenants', component: TenantComponent },
  { path: 'tenants/:propertyName', component: TenantComponent },
  { path: 'expenses', component: ExpenseComponent },
  { path: 'expenses/:propertyName/:year', component: ExpenseComponent },
  { path: 'documents', component: DocumentComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
