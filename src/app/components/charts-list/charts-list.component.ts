// charts-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ChartData } from '../../chart-data.interface';
import { ChartManagementService } from '../../chart-management.service';
import * as Highcharts from 'highcharts'; // Импорт Highcharts

@Component({
    selector: 'app-charts-list',
    templateUrl: './charts-list.component.html',
    styleUrls: ['./charts-list.component.css']
  })
  export class ChartsListComponent implements OnInit {

    charts: ChartData[] = [];
    filterYear: number | null = null; // Используем числовой тип для года
    filteredCharts: ChartData[] = [];
    Highcharts: typeof Highcharts = Highcharts; 
    
    constructor(private chartService: ChartManagementService) { }
  
    ngOnInit(): void {
      this.getCharts();
    }
  
    getCharts(): void {
        this.chartService.getAllCharts()
          .subscribe(charts => {
            this.charts = charts;
            this.filteredCharts = charts; // Инициализируем filteredCharts
          });
      }
  
    filterCharts(): void {
        if (this.filterYear) {
          this.chartService.filterChartsByYear(this.filterYear)
            .subscribe(filteredCharts => {
              this.charts = filteredCharts;
              this.filteredCharts = filteredCharts;
            });
        } else {
          this.getCharts();
        }
    }
  }
