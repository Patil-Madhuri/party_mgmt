import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { PartyListComponent } from './component/party-list/party-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'party-list', component: PartyListComponent },
  // ,canActivate: [AuthGuard]
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
