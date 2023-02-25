import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'Ymh7dFF1VKeRt3jOk8fO2SH5Bkd90ZGK';

  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient) {

  }

  //insertar valores

  buscarGifs( query: string = '') {

    query = query.trim().toLowerCase();

    //Para no repetir nombres o otros
    if( !this._historial.includes( query)) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
    }

   this.http.get('https://api.giphy.com/v1/gifs/search?api_key=Ymh7dFF1VKeRt3jOk8fO2SH5Bkd90ZGK&q=dragon ball z&limit=10')
   .subscribe( (resp: any) =>{
   console.log(resp.data);
   });

  }

}
