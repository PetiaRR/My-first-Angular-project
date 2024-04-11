import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserForAuth } from '../types/user';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {

  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: UserForAuth | undefined;
  USER_KEY = 'token';

  userSubscription: Subscription;

  get isLogged(): boolean {
    return !!this.user;
  }
  private apiUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
    this.user = user;
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
    
  });
}
  
  register(
    username: string,
    email: string,
    password: string,
    rePassword: string
  ) {
    
    //window.sessionStorage.removeItem(this.USER_KEY);
    //window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
    
    //const api = `http://localhost:3000`
    return this.http
      .post<UserForAuth>(`${this.apiUrl}/auth/register`, {
        username,
        email,
        password,
        rePassword
      })
      .pipe(tap((user) => this.user$$.next(user)));
      
  }

  login (email: string, password: string) {
    
    return this.http
    .post<UserForAuth>(`${this.apiUrl}/auth/login`, {
      email,
      password,
      
    })
    .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    
    return this.http
      .post('/auth/logout', {})
      .pipe(tap(() => this.user$$.next(undefined)));
  }
  getProfile() {
    return this.http
      .get<UserForAuth>(`${this.apiUrl}/users/profile`)
      .pipe(tap((user) => this.user$$.next(user)));
  }

  updateProfile(username: string, email: string) {
    
    return this.http
      .put<UserForAuth>(`${this.apiUrl}/users/profile`, {
        
        username,
        email,
        
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
