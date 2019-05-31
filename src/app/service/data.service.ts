import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Issue } from '../model/issue';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  getIssues() {
    return this.http.get('http://localhost:3000/issues');
  }

  getIssue(id: number) {
    return this.http.get('http://localhost:3000/issues/' + id);
  }

  addIssue(payload: any) {
    return this.http.post('http://localhost:3000/issues', payload, httpOptions);
  }

  updateIssue(payload: any) {
    return this.http.put('http://localhost:3000/issues/' + payload.id, payload, httpOptions);
  }

  deleteIssue(id: any) {
    return this.http.delete('http://localhost:3000/issues/' + id, httpOptions);
  }
}
