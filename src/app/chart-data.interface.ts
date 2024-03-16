// chart-data.interface.ts

import * as Highcharts from 'highcharts';

export interface ChartData {
  id: number;
  title: string;
  options: Highcharts.Options; // Добавляем свойство options
}



// Next for app.component.ts's HTML template use:

// <highcharts-chart 
//   [Highcharts]="Highcharts"
//   [options]="chartOptions"

//   style="width: 100%; height: 400px; display: block;"
// ></highcharts-chart>
// and export variables:

// export class AppComponent {
//   Highcharts: typeof Highcharts = Highcharts;
//   chartOptions: Highcharts.Options = {
//     series: [{
//       data: [1, 2, 3],
//       type: 'line'
//     }]
//   };

// export class AppComponent {
//   isHighcharts = typeof Highcharts === 'object';
//   Highcharts: typeof Highcharts = Highcharts;
//   chartOptions: Highcharts.Options = {...};
// }
// <highcharts-chart
//   *ngIf="isHighcharts"
//   [Highcharts]="Highcharts"
//   [options]="chartOptions"
// ></highcharts-chart>


// Highcharts.setOptions({
//   title: {
//     style: {
//       color: 'orange'
//     }
//   }
// });

// <highcharts-chart 
// [Highcharts]="Highcharts" 
// [options]="chartOptions" 
// [constructorType]="'chart'"
// style="width: 100%; height: 400px; display: block;"
// >
// </highcharts-chart>