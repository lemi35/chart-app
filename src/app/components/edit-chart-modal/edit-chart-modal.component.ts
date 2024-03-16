// edit-chart-modal.component.ts

import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Импортируем NgbActiveModal для работы с модальным окном
import { ChartData } from '../../chart-data.interface';
import { ChartManagementService } from '../../chart-management.service';

@Component({
  selector: 'app-edit-chart-modal',
  templateUrl: './edit-chart-modal.component.html',
  styleUrls: ['./edit-chart-modal.component.css']
})
export class EditChartModalComponent {
  @Input() chart!: ChartData; // Добавляем восклицательный знак для указания на то, что это свойство будет инициализировано в родительском компоненте
  chartSettings: any = { type: '', color: '' }; // Создаем объект для хранения настроек графика
  chartTypes: string[] = ['line', 'bar', 'pie', 'area', 'spline', 'column']; // Пример типов графиков


  constructor(
    public activeModal: NgbActiveModal,           // Внедряем NgbActiveModal для управления состоянием модального окна
    private chartService: ChartManagementService

  ) { }

  saveChanges(): void {

    // Сохраняем настройки графика
    // Проверяем, что this.chart и все связанные свойства определены
    if (this.chart && this.chart.options && this.chart.options.series && this.chart.options.series.length > 0) {
      // Присваиваем значение только если свойства определены
      this.chart.options.series[0].type = this.chartSettings.type;
    }
    this.chart.options.colors = [this.chartSettings.color];

    this.chartService.updateChart(this.chart.id, this.chart)
    this.activeModal.close(); // Закрываем модальное окно после успешного обновления графика
  }


  closeModal(): void {
    this.activeModal.dismiss(); // Закрываем модальное окно без сохранения изменений
  }

  // логика создания.удаления перемещена в chart-settings.component.ts
  // deleteChart(): void {
  //   if (this.chart && this.chart.id !== null) {
  //     this.chartService.deleteChart(this.chart.id)
  //       .subscribe(() => {
  //         this.activeModal.close();
  //       });
  //   }
  // }

  // createChart(): void {
  //   const newChart: ChartData = {
  //     id: 0, // Предполагая, что id должен быть числом, не null
  //     type: this.chart.type,
  //     title: this.chart.title,
  //     color: this.chart.color,
  //     data: []
  //   };

  //   this.chartService.addChart(newChart)
  //     .subscribe(createdChart => {
  //       this.activeModal.close(createdChart);
  //     });
  // }

}
