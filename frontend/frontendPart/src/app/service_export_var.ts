import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',  // le service partagable dans tt l'app .
  })


export class Service_export_var {

    private _x:boolean ;

    getx():boolean {         
       return this._x;
    }

    setx(value_bool):boolean{
      this._x = value_bool ;
      return this._x ;
    }

    
}