// chart-data.interface.ts

import * as Highcharts from 'highcharts';

export interface ChartData {
  id: number;
  title: string;
  options: Highcharts.Options; 
  edited?: boolean;
}

