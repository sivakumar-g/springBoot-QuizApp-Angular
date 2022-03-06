import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

    //current user: which is loggedin
    public getCurrentUser() {
      return this.http.get(`${baseUrl}/current-user`);
    }

    //generate token

    public generateToken(loginData: any) {
      return this.http.post(`${baseUrl}/generate-token`, loginData);
    }

    //login user: set token in localStorage
    public loginUser(token:any) {
      localStorage.setItem('quiztoken', token);

      return true;
    }

    //isLogin: user is logged in or not
    public isLoggedIn() {
      let tokenStr = localStorage.getItem('quiztoken');
      if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
        return false;
      } else {
        return true;
      }
    }

    // logout : remove token from local storage
    public logout() {
      localStorage.removeItem('quiztoken');
      localStorage.removeItem('quizuser');
      return true;
    }

    //get token
    public getToken() {
      return localStorage.getItem('quiztoken');
    }

    //set userDetail
    public setUser(user:any) {
      localStorage.setItem('quizuser', JSON.stringify(user));
    }

    //getUser
    public getUser() {
      let userStr = localStorage.getItem('quizuser');
      if (userStr != null) {
        return JSON.parse(userStr);
      } else {
        this.logout();
        return null;
      }
    }

    //get user role

    public getUserRole() {
      let user = this.getUser();
      return user.authorities[0].authority;
    }





}
