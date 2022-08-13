import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    API_URL = environment.apiUrl
  constructor(private http: HttpClient) { }
  postProduct(data: any){
    return this.http.put<any>(`${this.API_URL}`,data);
  }
  getProduct(){
    return this.http.get<any>(`${this.API_URL}`);
  }
}
