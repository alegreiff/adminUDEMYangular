import { Component, OnInit } from '@angular/core';
declare function init_plugins();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',

})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    init_plugins()
  }

}
