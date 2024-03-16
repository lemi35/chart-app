// src\app\app.module.ts

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HighchartsChartModule } from "highcharts-angular";
// import { HighchartsChartModule } from "../../highcharts-angular/src/lib/highcharts-chart.module";
import { ChartManagementService } from './chart-management.service';
import { ChartsListComponent } from './components/charts-list/charts-list.component'; // Импортируем компонент
import { EditChartModalComponent } from './components/edit-chart-modal/edit-chart-modal.component'; // Импортируем компонент
import { NgbModalModule, NgbModule, NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap'; // Импортируем NgbModalModule
import { FormsModule } from '@angular/forms';
import { ChartSettingsComponent } from "./components/chart-settings/chart-settings.component";

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
    
  ],
  providers: [ChartManagementService, NgbActiveModal ],
  bootstrap: [AppComponent]
})
export class AppModule { }
