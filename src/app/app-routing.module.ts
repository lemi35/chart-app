import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LineChartComponent } from './line-chart/line-chart.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ChartsListComponent } from './components/charts-list/charts-list.component'; // Импортируем компонент
import { EditChartModalComponent } from './components/edit-chart-modal/edit-chart-modal.component'; // Импортируем компонент
import { ChartSettingsComponent } from "./components/chart-settings/chart-settings.component";


const routes: Routes = [
  {path: 'charts', component: ChartsListComponent},
  {path: 'settings', component: ChartSettingsComponent},
  // {path: 'linechart', component: LineChartComponent},
  {path: '', redirectTo: '/charts', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
