import { Component } from '@angular/core';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent{
	// Pie
  public pieChartLabels:string[] = ['Papas Sabritas', 'Papas Barcel', 'Papas Pringles'];
  public pieChartData:number[] = [500, 300, 100];
  public pieChartType:string = 'pie';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Juan', 'Daniel', 'Jorge', 'Mario', 'Raul', 'Luis', 'Daniel'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 70, 80, 81, 82, 75, 77], label: 'Ingresos generados por cliente en MXN'}
  ];

  // lineChart
  public lineChartData:Array<any> = [
    {data: [5, 9, 0, 1, 6], label: 'Food'},
    {data: [8, 4, 4, 9, 6], label: 'Drinks'},
    {data: [1, 4, 7, 9, 1], label: 'Candy'}
  ];
  public lineChartLabels:Array<any> = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
  public lineChartType:string = 'line';
  
 
 
}
