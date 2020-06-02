import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd, Data } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {
titulo: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getDataRoute()
  }

  getDataRoute(){
    this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map( (evento: ActivationEnd) => evento.snapshot.data)
    ).subscribe(data => this.titulo = data.titulo)
  }
}
