import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { retry  } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  constructor() {

    this.regresaObs().subscribe(
      num => console.log('subs', num ),
      err => console.error('subs', err),
      () => console.log('Subs kaput')
      );
   }

  ngOnInit(): void {
  }
regresaObs():Observable<any> {
  return new Observable( (observer: Subscriber<any>) => {
    let contador = 0;
    let intervalo = setInterval(() =>{
      contador +=1;
      observer.next(contador);
      if(contador === 3){
        clearInterval(intervalo)
        observer.complete()
      }

    }, 1000)
  });

}
}
