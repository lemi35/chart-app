// chart.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ChartState } from './chart.reducer';

export const selectChartState = createFeatureSelector<ChartState>('chart');

export const selectCharts = createSelector(
  selectChartState,
  (state: ChartState) => state.charts
);