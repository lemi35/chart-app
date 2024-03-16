// chart-management.service.ts
import { Injectable } from '@angular/core';
import { ChartData } from './chart-data.interface';
import { Observable, BehaviorSubject, map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})


export class ChartManagementService {
  private chartsSubject = new BehaviorSubject<ChartData[]>([]);


  constructor() {
    // Инициализация сервиса с начальными данными
    this.chartsSubject.next([
    {
      id: 1,
      title: "Chart Column",
      options: {
        chart: {
          type: 'line'
        },
        title: {
          text: 'Report 1'
        },
        xAxis: {
          // Настройки для оси X
        },
        yAxis: {
          // Настройки для оси Y
        },
        series: [{
          name: 'Data',
          type: 'column', // Добавляем тип серии данных
          data: [[2022, 153], [2023, 253], [2024, 201]] // Пример данных для графика
        }],
        colors: ['#FF5733']
      }
    },
    {
      id: 2,
      title: "Chart Bar", 
      options: {
        title: {
          text: 'Report 2'
        },
        series: [
          {
            name: 'Company A',
            type: 'bar', // Добавляем тип серии данных
            data: [[2021, 120], [2022, 50], [2023, 180], [2024, 70]] // Пример данных для графика
          },
          {
            name: 'Company B',
            type: 'bar', // Добавляем тип серии данных
            data: [[2021, 180], [2022, 30], [2023, 280], [2024, 270]] // Пример данных для графика
          }
        ]
      }
    },
    {
      id: 3,
      title: "Chart Pie",
      options: {
        title: {
          text: 'Report 3'
        },
        xAxis: {
          // Настройки для оси X
        },
        yAxis: {
          // Настройки для оси Y
        },
        series: [
          {
            name: 'Data',
            type: 'pie', // Добавляем тип серии данных
            data: [[0, 1], [1, 2], [2, 3]] // Пример данных для графика
          }
        ],
        colors: ['#FF5733', '#2ecc71', '#2caffe']
      }
    },
    {
      id: 4,
      title: "Chart Line",
      options: {
        title: {
          text: 'Report 4'
        },
        xAxis: {
          // Настройки для оси X
        },
        yAxis: {
          // Настройки для оси Y
        },
        series: [
          {
            name: 'Data',
            type: 'line', // Добавляем тип серии данных
            data: [[1999, 10], [2009, 20], [2019, 30]] // Пример данных для графика
          },
          {
            name: 'Data 2',
            type: 'line', // Добавляем тип серии данных
            data: [[1999, 30], [2009, 18], [2019, 12]] // Пример данных для графика
          }
        ]
      }
    },
    {
      id: 5,
      title: "Chart Area",
      options: {
        title: {
          text: 'Report 5'
        },
        xAxis: {
          // Настройки для оси X
        },
        yAxis: {
          // Настройки для оси Y
        },
        series: [
          {
            name: 'Data',
            type: 'area', // Добавляем тип серии данных
            data: [[1999, 10], [2009, 20], [2019, 15]] // Пример данных для графика
          },
          {
            name: 'Data 2',
            type: 'area', // Добавляем тип серии данных
            data: [[1999, 30], [2009, 15], [2019, 40]] // Пример данных для графика
          }
        ]
      }
    },
    {
      id: 6,
      title: "Chart Spline",
      options: {
        title: {
          text: 'Report 6'
        },
        xAxis: {
          // Настройки для оси X
        },
        yAxis: {
          // Настройки для оси Y
        },
        series: [
          {
            name: 'Data',
            type: 'spline', // Добавляем тип серии данных
            data: [[1999, 10], [2009, 20], [2019, 15]] // Пример данных для графика
          },
          {
            name: 'Data 2',
            type: 'spline', // Добавляем тип серии данных
            data: [[1999, 30], [2009, 15], [2019, 40]] // Пример данных для графика
          }
        ]
      }
    }
  ]);

}

 

// Получение всех графиков
getAllCharts(): Observable<ChartData[]> {
  return this.chartsSubject.asObservable();
}

// Добавление нового графика
addChart(chart: ChartData): void {
  const currentCharts = this.chartsSubject.value;
  const updatedCharts = [...currentCharts, chart];
  this.chartsSubject.next(updatedCharts);
}

// Удаление графика по идентификатору
deleteChart(chartId: number): void {
  const currentCharts = this.chartsSubject.value;
  const updatedCharts = currentCharts.filter(chart => chart.id !== chartId);
  this.chartsSubject.next(updatedCharts);
}

// Обновление графика по идентификатору
updateChart(chartId: number, updatedChart: ChartData): void {
  const currentCharts = this.chartsSubject.value;
  const updatedCharts = currentCharts.map(chart => {
    if (chart.id === chartId) {
      return updatedChart;
    }
    return chart;
  });
  this.chartsSubject.next(updatedCharts);
}

// Фильтрация графиков по году
filterChartsByYear(year: number): Observable<ChartData[]> {
  return this.chartsSubject.asObservable().pipe(
    map(charts => charts.filter(chart => {
      return chart.options.series?.some(series => {
        // Проверяем, является ли тип графика поддерживаемым для фильтрации по году
        if (series.type === 'line' || series.type === 'spline' || series.type === 'bar' || series.type === 'pie' || series.type === 'area' || series.type === 'column') {
          return (series.data as number[][]).some(dataPoint => dataPoint[0] === year);
        }
        return false;
      });
    }))
  );
}


}