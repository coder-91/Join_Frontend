import { Routes } from '@angular/router';
import { SummaryViewComponent } from './components/summary-view/summary-view.component';
import { ContactViewComponent } from './components/contact-view/contact-view.component';
import { BoardViewComponent } from './components/board-view/board-view.component';
import { TaskViewComponent } from './components/task-view/task-view.component';
import { PrivacyPolicyViewComponent } from './components/privacy-policy-view/privacy-policy-view.component';
import { LegalNoticeViewComponent } from './components/legal-notice-view/legal-notice-view.component';
import { HelpViewComponent } from './components/help-view/help-view.component';

export const routes: Routes = [
  { path: '', component: SummaryViewComponent },
  { path: 'summary', component: SummaryViewComponent },
  { path: 'task', component: TaskViewComponent },
  { path: 'board', component: BoardViewComponent },
  { path: 'contacts', component: ContactViewComponent },
  { path: 'privacy-policy', component: PrivacyPolicyViewComponent },
  { path: 'legal-notice', component: LegalNoticeViewComponent },
  { path: 'help', component: HelpViewComponent },
];


