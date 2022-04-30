import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url="https://www.instagram.com/username";
  constructor(private http: HttpClient) {}
  getfollowers(){
    return this.http.get(this.url);
  }
}
