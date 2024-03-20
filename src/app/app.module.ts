// src\app\app.module.ts

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { chartReducer } from './chart.reducer';
import { ChartEffects } from './chart.effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HighchartsChartModule } from "highcharts-angular";
import { ChartManagementService } from './chart-management.service';
import { ChartsListComponent } from './components/charts-list/charts-list.component';
import { EditChartModalComponent } from './components/edit-chart-modal/edit-chart-modal.component'; 
import { NgbModalModule, NgbModule, NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap'; 
import { FormsModule } from '@angular/forms';
import { ChartSettingsComponent } from "./components/chart-settings/chart-settings.component";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    ChartsListComponent, 
    EditChartModalComponent,
    ChartSettingsComponent,
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    NgbModalModule,
    HighchartsChartModule,
    StoreModule.forRoot({ chart: chartReducer }),
    EffectsModule.forRoot([ChartEffects]),
    RouterModule
    
  ],
  providers: [ChartManagementService, NgbActiveModal ],
  bootstrap: [AppComponent]
})
export class AppModule { }
