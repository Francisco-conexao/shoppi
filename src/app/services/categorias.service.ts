import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api } from './config';

@Injectable({
    providedIn: 'root'
})
export class CategoriasService {

    headers = new HttpHeaders();

    constructor(private http:HttpClient) {
        this.headers.append("Content-Type","application/json");
    }

    listar(){
        return new Promise(
            resolve=>{
                this.http.get<any>(api+'/categorias/listar',{headers: this.headers})
                .subscribe(
                    data =>{
                        resolve(data);
                    }
                )
            }
        )
    }
}
