import { Routes } from '@angular/router';
import { AuthenticationLayoutComponent } from './components/authentication-layout/authentication-layout.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { LoginViewComponent } from './components/authentication-layout/login-view/login-view.component';
import { SignUpViewComponent } from './components/authentication-layout/sign-up-view/sign-up-view.component';
import { SummaryViewComponent } from './components/main-layout/summary-view/summary-view.component';
import { TaskViewComponent } from './components/main-layout/task-view/task-view.component';
import { BoardViewComponent } from './components/main-layout/board-view/board-view.component';
import { ContactViewComponent } from './components/main-layout/contact-view/contact-view.component';
import { PrivacyPolicyViewComponent } from './components/main-layout/privacy-policy-view/privacy-policy-view.component';
import { LegalNoticeViewComponent } from './components/main-layout/legal-notice-view/legal-notice-view.component';
import { ImprintViewComponent } from './components/main-layout/imprint-view/imprint-view.component';
import { HelpViewComponent } from './components/main-layout/help-view/help-view.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},


  { path: '', component: AuthenticationLayoutComponent, children:[{
    path: 'login', component: LoginViewComponent},
    {path: 'sign-up', component: SignUpViewComponent}
  ] },

  { path: '', component: MainLayoutComponent, children:[
    {path: 'summary', component: SummaryViewComponent},
    {path: 'task', component: TaskViewComponent},
    {path: 'board', component: BoardViewComponent},
    {path: 'contacts', component: ContactViewComponent},
    {path: 'privacy-policy', component: PrivacyPolicyViewComponent},
    {path: 'legal-notice', component: LegalNoticeViewComponent},
    {path: 'imprint', component: ImprintViewComponent},
    {path: 'help', component: HelpViewComponent},
  ] },
];


