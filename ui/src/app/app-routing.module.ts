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
import { UserListComponent } from './user-list/user-list.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './services/auth.guard';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'properties', pathMatch: 'full', canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'admin', component: AdminComponent, canActivate: [authGuard]},
  { path: 'properties', component: PropertyListComponent, canActivate: [authGuard] },
  { path: 'properties/:name', component: PropertyComponent, canActivate: [authGuard] },
  { path: 'tenants', component: TenantComponent, canActivate: [authGuard] },
  { path: 'tenants/:propertyName', component: TenantComponent, canActivate: [authGuard] },
  { path: 'expenses', component: ExpenseComponent, canActivate: [authGuard] },
  { path: 'expenses/:propertyName/:year', component: ExpenseComponent, canActivate: [authGuard] },
  { path: 'homeExpenses', component: HomeExpenseComponent, canActivate: [authGuard] },
  { path: 'homeExpenses/:propertyName/:year', component: HomeExpenseComponent, canActivate: [authGuard] },  
  { path: 'documents', component: DocumentComponent, canActivate: [authGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
  { path: 'overview', component: OverviewComponent, canActivate: [authGuard] },
  { path: 'users', component: UserListComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
