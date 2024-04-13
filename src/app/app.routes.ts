import { Routes } from '@angular/router';
import { SummaryViewComponent } from './components/summary-view/summary-view.component';
import { ContactViewComponent } from './components/contact-view/contact-view.component';
import { BoardViewComponent } from './components/board-view/board-view.component';
import { TaskViewComponent } from './components/task-view/task-view.component';
import { PrivacyPolicyViewComponent } from './components/privacy-policy-view/privacy-policy-view.component';
import { LegalNoticeViewComponent } from './components/legal-notice-view/legal-notice-view.component';
import { HelpViewComponent } from './components/help-view/help-view.component';
import { ImprintViewComponent } from './components/imprint-view/imprint-view.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { RegisterViewComponent } from './components/register-view/register-view.component';

export const routes: Routes = [
  { path: '', component: LoginViewComponent, outlet: 'auth' },
  { path: 'login', component: LoginViewComponent, outlet: 'auth' },
  { path: 'register', component: RegisterViewComponent, outlet: 'auth' },
  { path: 'summary', component: SummaryViewComponent, outlet: 'primary'  },
  { path: 'task', component: TaskViewComponent, outlet: 'primary'   },
  { path: 'board', component: BoardViewComponent, outlet: 'primary'   },
  { path: 'contacts', component: ContactViewComponent, outlet: 'primary'   },
  { path: 'privacy-policy', component: PrivacyPolicyViewComponent, outlet: 'primary'   },
  { path: 'legal-notice', component: LegalNoticeViewComponent, outlet: 'primary'   },
  { path: 'imprint', component: ImprintViewComponent, outlet: 'primary'   },
  { path: 'help', component: HelpViewComponent, outlet: 'primary'   },
];


