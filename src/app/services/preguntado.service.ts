import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntadoService {
  api:string = 'https://thesimpsonsquoteapi.glitch.me/quotes?character=';

  constructor(private http: HttpClient) { }

  getHomer = (): Observable<any> => {
    return this.http.get(this.api + 'homer');
  }

  getLisa = (): Observable<any> => {
    return this.http.get(this.api + 'lisa');
  }

  getBart = (): Observable<any> => {
    return this.http.get(this.api + 'bart');
  }
}
