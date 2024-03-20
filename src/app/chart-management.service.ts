// chart-management.service.ts
import { Injectable } from '@angular/core';
import { ChartData } from './chart-data.interface';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { ChartState } from './chart.reducer'; // Replace 'app.reducer' with the file where you combine reducers in your application


@Injectable({
  providedIn: 'root'
})

export class ChartManagementService {
  private chartsSubject = new BehaviorSubject<ChartData[]>([]);
  private static readonly availableChartTypes: string[] = ['line', 'bar', 'pie', 'area', 'spline', 'column'];
  
  constructor(private store: Store<ChartState>) {
    // Initialize service with initial data
    this.initializeCharts();
  }

  // Initialize charts with random data
  private initializeCharts(): void {
    const charts: ChartData[] = [];

    // Create multiple charts with random data
    for (let i = 1; i <= 6; i++) {
      const startYear = this.getRandomYear(2000, 2020);
      const endYear = this.getRandomYear(startYear + 1, 2025);
      const randomChartData: ChartData = {
        id: i,
        title: `Chart ${i}`,
        options: this.generateRandomChartOptions(startYear, endYear)
      };
      charts.push(randomChartData);
    }

    // Update charts subject
    this.chartsSubject.next(charts);
  }

  // Generate random chart options
  public generateRandomChartOptions(startYear: number, endYear: number): any {
    const randomChartType = ChartManagementService.availableChartTypes[Math.floor(Math.random() * ChartManagementService.availableChartTypes.length)];

    // Define random data points based on your chart requirements
    const randomData: number[][] = [];

      for (let year = startYear; year <= endYear; year++) {
        const value = Math.floor(Math.random() * 100) + 1; // Generate random value
        randomData.push([year, value]);
      }
  
      // Define chart options with the randomly selected chart type
      const options = {
        title: {
          text: 'Chart'
        },
        xAxis: {
          // Define xAxis options
        },
        yAxis: {
          // Define yAxis options
        },
        series: [{
          name: 'Data',
          type: randomChartType, // Set the randomly selected chart type
          data: randomData
        }]
      };
  
      return options;
    }
  

private getRandomYear(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getAllCharts(): Observable<ChartData[]> {
  return this.chartsSubject.asObservable();
}

addChart(newChart: ChartData): void {
  if (!newChart.options) {
    newChart.options = this.generateRandomChartOptions(2000, 2020);
  }

  // Add the new chart to the charts array
  const currentCharts = this.chartsSubject.value;
  const updatedCharts = [...currentCharts, newChart];
  this.chartsSubject.next(updatedCharts);
}

deleteChart(chartId: number): void {
  const currentCharts = this.chartsSubject.value;
  const updatedCharts = currentCharts.filter(chart => chart.id !== chartId);
  this.chartsSubject.next(updatedCharts);
}

updateChart(chartId: number, updatedChart: ChartData): void {
  const currentCharts = this.chartsSubject.value;
  const updatedCharts = currentCharts.map(chart => {
    if (chart.id === chartId) {
      const editedChart = { ...updatedChart, edited: true }; 

      return editedChart;
    }
    return chart;
  });
  this.chartsSubject.next(updatedCharts);
}

filterChartsByYear(year: number): Observable<ChartData[]> {
  return this.chartsSubject.asObservable().pipe(
    map(charts => charts.filter(chart => {
      return chart.options.series?.some(series => {
        if (series.type === 'line' || series.type === 'spline' || series.type === 'bar' || series.type === 'pie' || series.type === 'area' || series.type === 'column') {
          return (series.data as number[][]).some(dataPoint => dataPoint[0] === year);
        }
        return false;
      });
    }))
  );
}


}