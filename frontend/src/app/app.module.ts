import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from './modules/layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CarBrandsModule } from './modules/car-brands/car-brands.module';
import { ModulesModule } from './modules/modules.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MatSidenavModule,
    ModulesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
