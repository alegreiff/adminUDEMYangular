import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: [
  ]
})
export class GraficoDonaComponent implements OnInit {
@Input() data: number[] = [24, 30, 46]
@Input() labels: string[] = [];
@Input() chartType: string;

  constructor() { }

  ngOnInit(): void {
  }

}
