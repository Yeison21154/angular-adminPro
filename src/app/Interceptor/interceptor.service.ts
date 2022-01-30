import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicosService } from '../services/medicos.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private mediServ:MedicosService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token') || ''
    });

    let params = new HttpParams().append('nombre','yeribel amado');

    const reqClone = req.clone({
      headers,
      params
    })
    return next.handle(reqClone);
    
    //return next.handle(req);
  }
}
