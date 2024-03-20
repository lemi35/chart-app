// chart.actions.ts
import { createAction, props } from '@ngrx/store';
import { ChartData } from './chart-data.interface';


export const addChart = createAction('[Chart] Add Chart', props<{ chart: ChartData }>());
export const deleteChart = createAction('[Chart] Delete Chart', props<{ id: number }>());
export const editChart = createAction('[Chart] Edit Chart', props<{ id: number, chart: ChartData }>());
export const updateChartAppearance = createAction('[Chart] Update Chart Appearance', props<{ id: number, darkMode: boolean }>());
