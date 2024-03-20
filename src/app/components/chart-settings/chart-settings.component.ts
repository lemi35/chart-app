// chart-settings.component.ts
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ChartData } from '../../chart-data.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditChartModalComponent } from '../edit-chart-modal/edit-chart-modal.component';
import { ChartState } from '../../chart.reducer';
import { ChartManagementService } from '../../chart-management.service'; 
import { editChart, deleteChart } from '../../chart.actions';

@Component({
  selector: 'app-chart-settings',
  templateUrl: './chart-settings.component.html',
  styleUrls: ['./chart-settings.component.css']
})
export class ChartSettingsComponent implements OnInit {
  charts$: Observable<ChartData[]> | undefined;
  private lastId: number = 100; // for mocking id increment without DB 

  constructor(
    private modalService: NgbModal,
    private store: Store<ChartState>,
    private chartService: ChartManagementService // Inject ChartManagementService
  ) { }

  ngOnInit(): void {
    this.charts$ = this.chartService.getAllCharts(); // Use ChartManagementService to get charts
    //this.charts$ = this.store.select(state => state.charts);
  }

  openEditChartModal(chart: ChartData): void {
    const modalRef = this.modalService.open(EditChartModalComponent);
    modalRef.componentInstance.chart = chart;
  }

  editChart(chartId: number, updatedChart: ChartData): void {
    updatedChart.edited = true; // Set edited flag to true
    this.chartService.updateChart(chartId, updatedChart); // Use ChartManagementService to update chart
    this.store.dispatch(editChart({ id: chartId, chart: updatedChart }));
  }

  deleteChart(chartId: number): void {
    this.chartService.deleteChart(chartId); // Use ChartManagementService to delete chart
    this.store.dispatch(deleteChart({ id: chartId }));
  }

  createChart(): void {
    const startYear = 2001; 
    const endYear = 2020;   
    const newChart: ChartData = {
      id: ++this.lastId,
      title: 'New Chart',
      options: this.chartService.generateRandomChartOptions(startYear, endYear) // Use ChartManagementService to generate options
    };

    this.chartService.addChart(newChart); // Use ChartManagementService to add chart
    this.openEditChartModal(newChart);
  }
}
