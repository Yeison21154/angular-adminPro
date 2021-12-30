import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType} from 'chart.js';
@Component({
  selector: 'app-gdonas',
  templateUrl: './gdonas.component.html',
  styles: [
  ]
})
export class GdonasComponent{
  @Input() title:string = "Sin Titulo";
  @Input() doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';


}
