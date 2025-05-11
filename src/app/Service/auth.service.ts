import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, tap } from "rxjs";
import { IUser } from "../Models/event.models";
import { ApiAddressService } from "./api_address.service";

@Injectable(
  {
    providedIn: 'root'
  })

export class AuthService
{
  currentUser!: IUser;
  Url: string = "";
  constructor(private apicall: ApiAddressService, private http: HttpClient) { }

  loginUser(username: string, password: string):Observable<IUser|boolean>
  {
    this.Url = this.apicall.localaddress + "/api/authenticate";
    let userbody: any =
    {
      userName:username,
      password:password
    }
    let options =
    {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
        })
    };

    return this.http.post<IUser>(this.Url, userbody, options)
      .pipe
      (
        tap((user: IUser) =>
       {
        this.currentUser =
       {
        userName: user.userName,
        userLastName: user.userLastName,
        tokenBearer: user.tokenBearer
       };
        })
      )
      .pipe(catchError(err => { return of(false) }));
    
  }

  isAuthenticated(): boolean
  {
    return !!this.currentUser;
  }

  getTokenBearer(): string
  {
    return this.currentUser.tokenBearer;
  }
}
