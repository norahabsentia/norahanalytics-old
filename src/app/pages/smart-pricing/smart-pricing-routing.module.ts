import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SmartPricingComponent} from "./smart-pricing.component";
import {UserTrendsComponent} from "./user-trends/user-trends.component";
import {PerformanceAnalysisComponent} from "./performance-analysis/performance-analysis.component";
import {PredictionsComponent} from "./predictions/predictions.component";

const routes: Routes = [{
  path: '',
  component: SmartPricingComponent,
  children: [{
    path: 'user-trends',
    component: UserTrendsComponent,
  }, {
    path: 'predictions',
    component: PredictionsComponent,
  }, {
    path: 'performance-analysis',
    component: PerformanceAnalysisComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmartPricingRoutingModule { }

export const routedComponents = [

  SmartPricingComponent,
  UserTrendsComponent,
  PredictionsComponent,
  PerformanceAnalysisComponent
];
