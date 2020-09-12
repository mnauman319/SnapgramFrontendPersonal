import { Injectable } from '@angular/core';
import { User } from '../models/user'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //if we want to persist the data through refreshes then we need to use local storage or cookie
  //this userService will get cleared on refresh
  loggedInUser: User;
  baseUrl: string = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  async createUser(user: User): Promise<User> {
    this.loginBackend();
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa("mark:password") });
    user = await this.http.post<User>(`${this.baseUrl}/users`, user,{headers}).toPromise();
    return user;
  }

  async testingUser() {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa("mark:password") });
    let user: User;
    user = await this.http.get<User>(`${this.baseUrl}/users/1`,{headers}).toPromise();
    return user;
  }

  async searchUserByUsername(username: string) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa("mark:password") });
    let user: User;
    user = await this.http.get<User>(`${this.baseUrl}/users?username=${username}`,{headers}).toPromise();
    return user;
  }

  async attemptLogin(username: string, password: string): Promise<User> {
    this.loginBackend();
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa("mark:password") });
    let httpResponse = await this.http.post<User>(`${this.baseUrl}/loginUser`,{username, password},{headers}).toPromise();
    return httpResponse;
  }
  loginBackend(){
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa("mark:password") });
    this.http.get(`${this.baseUrl}/login`,{headers, responseType: 'text' as 'json' });
  }
  clearUser() {
    this.loggedInUser.userId = 0;
    this.loggedInUser.username = "";
    this.loggedInUser.password = "";
    this.loggedInUser.fName = "";
    this.loggedInUser.lName = "";
    this.loggedInUser.photos = [];
  }
}
