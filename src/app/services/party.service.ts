import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  constructor(private http: HttpClient) {}

  createParty(payload: any) {
    return this.http.post('party/', payload);
  }
 
  getAllParty() {
    return this.http.get('party/');
  }
   deleteParty(id:Number){
    return this.http.delete('party/?id=' + id)
   }
   updateParty(id:Number, payload:any){
    return this.http.put('party/?id=' + id, payload)
   }
   
}
