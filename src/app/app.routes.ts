import {Routes} from '@angular/router';
import {AuthenticationLayoutComponent} from './components/authentication-layout/authentication-layout.component';
import {LoginViewComponent} from './components/authentication-layout/login-view/login-view.component';
import {SignUpViewComponent} from './components/authentication-layout/sign-up-view/sign-up-view.component';
import {SummaryViewComponent} from "./components/master-layout/main-layout/summary-view/summary-view.component";
import {TaskViewComponent} from "./components/master-layout/main-layout/task-view/task-view.component";
import {BoardViewComponent} from "./components/master-layout/main-layout/board-view/board-view.component";
import {PrivacyPolicyViewComponent} from "./components/master-layout/main-layout/privacy-policy-view/privacy-policy-view.component";
import {LegalNoticeViewComponent} from "./components/master-layout/main-layout/legal-notice-view/legal-notice-view.component";
import {ImprintViewComponent} from "./components/master-layout/main-layout/imprint-view/imprint-view.component";
import {HelpViewComponent} from "./components/master-layout/main-layout/help-view/help-view.component";
import {UserViewComponent} from "./components/master-layout/alternate-layout/user-view/user-view.component";
import {MasterLayoutComponent} from "./components/master-layout/master-layout.component";
import {MainLayoutComponent} from "./components/master-layout/main-layout/main-layout.component";
import {AlternateLayoutComponent} from "./components/master-layout/alternate-layout/alternate-layout.component";
import {UserDetailsComponent} from "./components/master-layout/alternate-layout/user-view/user-details/user-details.component";
import {AuthGuard} from "./guards/auth/auth.guard";
import {LoggedInGuard} from "./guards/loggedIn/logged-in.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthenticationLayoutComponent,
    children: [
      {path: 'login', component: LoginViewComponent, canActivate: [LoggedInGuard]},
      {path: 'sign-up', component: SignUpViewComponent, canActivate: [LoggedInGuard]}
    ]
  },
  {
    path: '',
    component: MasterLayoutComponent,
    children: [
      {
        path: '',
        component: MainLayoutComponent,
        children:[
          {path: 'summary', component: SummaryViewComponent, canActivate: [AuthGuard]},
          {path: 'task', component: TaskViewComponent, canActivate: [AuthGuard]},
          {path: 'board', component: BoardViewComponent, canActivate: [AuthGuard]},
          {path: 'privacy-policy', component: PrivacyPolicyViewComponent},
          {path: 'legal-notice', component: LegalNoticeViewComponent},
          {path: 'imprint', component: ImprintViewComponent},
          {path: 'help', component: HelpViewComponent},
        ]
      },

      {
        path: '',
        component: AlternateLayoutComponent,
        children:[
          {path: 'users', component: UserViewComponent, canActivate: [AuthGuard]},
          {path: 'users-details', component: UserDetailsComponent, canActivate: [AuthGuard]},
        ]
      }
    ]
  },
  { path: '**', redirectTo: '/summary', pathMatch: 'full' }

];


