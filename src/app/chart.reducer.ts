// chart.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as ChartActions from './chart.actions';
import { ChartData } from './chart-data.interface';

export interface ChartState {
  charts: ChartData[];
}

export const initialState: ChartState = {
  charts: []
};

export const chartReducer = createReducer(
  initialState,
  on(ChartActions.addChart, (state, { chart }) => ({
    ...state,
    charts: [...state.charts, chart]
  })),
  on(ChartActions.deleteChart, (state, { id }) => ({
    ...state,
    charts: state.charts.filter(chart => chart.id !== id)
  })),
  on(ChartActions.editChart, (state, { id, chart }) => {
    const updatedCharts = state.charts.map(c => {
      if (c.id === id) {
        return { ...chart, edited: true }; // Set edited to true for the edited chart
      }
      return c;
    });
    return {
      ...state,
      charts: updatedCharts
    };
  }),
  on(ChartActions.updateChartAppearance, (state, { id, darkMode }) => ({
    ...state,
    charts: state.charts.map(c => c.id === id ? { ...c, darkMode } : c)
  }))
);
