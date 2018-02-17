import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxEchartsModule} from "ngx-echarts";
import {routedComponents, SmartPricingRoutingModule} from "./smart-pricing-routing.module";
import {AgmCoreModule} from "@agm/core";
import {ThemeModule} from "../../@theme/theme.module";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";

import {Ng2SmartTableModule} from "ng2-smart-table";

@NgModule({
  imports: [
    ThemeModule,
    AgmCoreModule.forRoot(),
    LeafletModule.forRoot(),
    SmartPricingRoutingModule,
    NgxEchartsModule,
    Ng2SmartTableModule
  ],
  exports: [],
  declarations: [

    ...routedComponents,

  ],
})
export class SmartPricingModule { }
