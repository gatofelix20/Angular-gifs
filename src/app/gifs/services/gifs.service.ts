import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }

  //insertar valores

  buscarGifs( query: string = '') {

    query = query.trim().toLowerCase();

    //Para no repetir nombres o otros
    if( !this._historial.includes( query)) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
    }

    console.log(this._historial);

  }

}
