import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeModule } from '../../@theme/theme.module';

import { NorahSchedulerComponent } from './norah-scheduler.component';
import { TextInputHighlightModule } from 'angular-text-input-highlight';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: NorahSchedulerComponent,
      },
    ]),
    ThemeModule,
    TextInputHighlightModule,
  ],
  exports: [],
  declarations: [NorahSchedulerComponent],
  providers: [],
})
export class NorahSchedulerModule {
}
