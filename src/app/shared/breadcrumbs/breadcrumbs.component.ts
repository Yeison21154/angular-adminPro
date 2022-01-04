import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{
  public titulo:string="";
  public titulo$:Subscription;
  constructor(private _route:Router) {
    this.titulo$ = this.CargarTitulos()
                  .subscribe(({titulo})=>{
                    this.titulo = titulo;
                    document.title =`AdminPro - ${titulo}`;});;
   }
  ngOnDestroy(): void {
    this.titulo$.unsubscribe();
  }
   CargarTitulos(){
   return  this._route.events
    .pipe(
      filter((event:any)=>event instanceof ActivationEnd),
      filter((event:ActivationEnd)=> event.snapshot.firstChild === null),
      map((event:ActivationEnd)=> event.snapshot.data)
    )
   }


}
