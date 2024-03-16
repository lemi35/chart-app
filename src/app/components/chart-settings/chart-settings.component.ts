// chart-settings.component.ts

import { Component, OnInit } from '@angular/core';
import { ChartData } from '../../chart-data.interface';
import { ChartManagementService } from '../../chart-management.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditChartModalComponent } from '../edit-chart-modal/edit-chart-modal.component';

@Component({
    selector: 'app-chart-settings',
    templateUrl: './chart-settings.component.html',
    styleUrls: ['./chart-settings.component.css']
  })
  export class ChartSettingsComponent implements OnInit {

    charts: ChartData[] = [];
    private lastId: number = 100; // for mocking id increment without DB 

    constructor(
      private modalService: NgbModal, 
      private chartService: ChartManagementService
    ) { }
    
    ngOnInit(): void {
        this.getCharts();
      }
      
      getCharts(): void {
        this.chartService.getAllCharts()
          .subscribe(charts => this.charts = charts);
      }


      openEditChartModal(chart: ChartData): void {
        const modalRef = this.modalService.open(EditChartModalComponent);
        modalRef.componentInstance.chart = chart;
      }
            
      deleteChart(chartId: number): void {
        this.chartService.deleteChart(chartId)
        this.getCharts();
      }


      
      createChart(): void {
        const newChart: ChartData = {
          id: ++this.lastId, 
          title: 'New Chart',
          options: {
            chart: {
              type: 'line'
            },
            title: {
              text: 'New Chart'
            },
            xAxis: {
              // Настройки для оси X
            },
            yAxis: {
              // Настройки для оси Y
            },
            series: [{
              name: 'Data',
              type: 'line', // Добавляем тип серии данных
              data: [[1999, 1], [2010, 2], [2020, 3]] // Пример данных для графика
            }],
            colors: [ '#000000' ]
          }
        };
      
        this.chartService.addChart(newChart);
        this.getCharts(); // Обновляем список графиков после добавления нового
        this.openEditChartModal(newChart)
      }
      
      
      
      

  }
  