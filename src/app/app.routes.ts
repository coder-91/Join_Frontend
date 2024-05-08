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
import {ContactViewComponent} from "./components/master-layout/alternate-layout/contact-view/contact-view.component";
import {MasterLayoutComponent} from "./components/master-layout/master-layout.component";
import {MainLayoutComponent} from "./components/master-layout/main-layout/main-layout.component";
import {AlternateLayoutComponent} from "./components/master-layout/alternate-layout/alternate-layout.component";
import {ContactDetailsComponent} from "./components/master-layout/alternate-layout/contact-view/contact-details/contact-details.component";

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
      {path: 'login', component: LoginViewComponent},
      {path: 'sign-up', component: SignUpViewComponent}
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
          {path: 'summary', component: SummaryViewComponent},
          {path: 'task', component: TaskViewComponent},
          {path: 'board', component: BoardViewComponent},
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
          {path: 'contacts', component: ContactViewComponent},
          {path: 'contacts-details', component: ContactDetailsComponent},
        ]
      }
    ]
  },
];


