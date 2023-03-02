import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'Ymh7dFF1VKeRt3jOk8fO2SH5Bkd90ZGK';

  private _historial: string[] = [];

 //Todo cambiar any por su tipo
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient) {
    //this._historial = JSON.parse(localStorage.getItem('historial')!)|| [];

    if( localStorage.getItem('historial') ) {
      this._historial = JSON.parse (localStorage.getItem('historial') ! );

      this.resultados = JSON.parse(localStorage.getItem('resultados')!)|| [];
    }
  }

  //insertar valores

  buscarGifs( query: string = '') {

    query = query.trim().toLowerCase();

    //Para no repetir nombres o otros
    if( !this._historial.includes( query)) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial) );
    }

   this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=Ymh7dFF1VKeRt3jOk8fO2SH5Bkd90ZGK&q=${query} z&limit=10`)
   .subscribe( (resp) =>{
   console.log(resp.data);
   this.resultados = resp.data;

   localStorage.setItem('resultados', JSON.stringify(this.resultados) );
   });

  }

}
