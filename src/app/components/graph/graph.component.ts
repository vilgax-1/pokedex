import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, RadarController, RadialLinearScale,  LineElement, PointElement, Filler } from 'chart.js';
import { BehaviorSubject } from 'rxjs';
Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler);

const orderStatistics = {

}

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements AfterViewInit {
  data$ = new BehaviorSubject<any>({});
  arrayPower = new Array();
  
  @Input() set setPokemon(value: any){
    this.data$.next(value);
  }
  
  @ViewChild('canvas') canvas?: ElementRef;
  myChart: any;
  
  constructor() {}
  
  ngAfterViewInit(): void {
    this.data$.subscribe({
      next: power => {
        if(!!this.myChart){
          this.myChart.destroy();
        }   
        if(power){
          this.arrayPower = power?.flatMap((hability: any) => ({value: hability.base_stat, type: hability.stat.name }));
          this.buildChart();
        }
      }
    }) 
  }

  getValueByName(name: string): number{
    return this.arrayPower.find( hability => hability.type === name).value;
  }
  
  buildChart(pk?: any): void{
    const ctx: CanvasRenderingContext2D = this.canvas?.nativeElement.getContext('2d');  
    this.myChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Attack', 'Defense', 'Speed', 'Sp Atk', 'Sp Def', 'HP'],
        datasets: [
          {
            data: [
              this.getValueByName('attack'),
              this.getValueByName('defense'),
              this.getValueByName('speed'),
              this.getValueByName('special-attack'),
              this.getValueByName('special-defense'),
              this.getValueByName('hp'),
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
          },
        ]
      },
      options: {
        responsive: true,
      }
    });
  }
}
