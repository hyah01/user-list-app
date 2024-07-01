import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiurl = "http://localhost:3000/users"

  constructor(private http: HttpClient) {}

  searchUser(substring: string, searchBy: 'name' | 'role'): Observable<User[]>{
    // get all data and then pipe it
    return this.http.get<User[]>(this.apiurl).pipe(
      // map it to filter to get results that match name or role
      map(users => users.filter(user => user[searchBy].toLowerCase().includes(substring.toLowerCase())))
    )
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiurl, user);
  }


}
