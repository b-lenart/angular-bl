import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  private userUrl = 'https://jsonplaceholder.typicode.com/users';

  getPosts(): Observable<any> {
    return this.http.get(this.postsUrl);
  }

  getUser(userId: number) {
    const url = `${this.userUrl}/${userId}`;
    return this.http.get(url);
  }
}
