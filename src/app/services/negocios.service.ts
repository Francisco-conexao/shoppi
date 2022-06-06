import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api } from './config';

@Injectable({
  providedIn: 'root'
})
export class NegociosService {

    headers = new HttpHeaders();

    constructor(private http:HttpClient) {
        this.headers.append("Content-Type","application/json");
    }

    listar(datos){
        return new Promise(
            resolve=>{
                this.http.post<any>(api+'/negocios/listar',datos, {headers: this.headers})
                .subscribe(
                    data =>{
                        resolve(data);
                    }
                )
            }
        )
    }

    negocio(datos){
        return new Promise(
            resolve=>{
                this.http.post<any>(api+'/negocios/negocio',datos, {headers: this.headers})
                .subscribe(
                    data =>{
                        resolve(data);
                    }
                )
            }
        )
    }

    listarProductos(datos){
        return new Promise(
            resolve=>{
                this.http.post<any>(api+'/negocios/listarProductos',datos, {headers: this.headers})
                .subscribe(
                    data =>{
                        resolve(data);
                    }
                )
            }
        )
    }
}
