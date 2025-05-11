import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, tap, throwError } from "rxjs";
import { IEvent, IEvent_Location, ILocation } from "../Models/event.models";
import { ApiAddressService } from "../Service/api_address.service";
import { AuthService } from "../Service/auth.service";

@Injectable(
  {
    providedIn: 'root'
  })

export class ApiCallService
{
  /*Returning an Observable from the Service*/
  /*https://codecraft.tv/courses/angular/http/http-with-observables/*/
  /*https://medium.com/@erVikas1/how-to-design-a-typescript-model-for-response-returned-by-httpclient-library-in-angular-a5e7f6c6b110*/

  constructor(private apiaddress: ApiAddressService, private http: HttpClient, private authService: AuthService) { }
  url: string = "";


  getEvent(): Observable<IEvent[]>
  {
    this.url = this.apiaddress.localaddress + "/api/event/location";

    let options =
    {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authService.getTokenBearer()}`,
          'Accept': 'application/json'
        })
    };

    return this.http.get<IEvent[]>(this.url,options).pipe(
      tap(data =>
      { /*console.log(data)*/ })
    )
  }
  // https://stackoverflow.com/questions/39863317/how-to-force-angular2-to-post-using-x-www-form-urlencoded
  getEvent_location(eventId: number, locationId: number): Observable<IEvent_Location>
  {
    this.url = this.apiaddress.localaddress + `/api/event/location/${eventId}/${locationId}`;
    let options =
    {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authService.getTokenBearer()}`,
          'Accept': 'application/json'
        })
    };

    return this.http.get<IEvent_Location>(this.url,options).pipe();
  }

  //https://rxjs.dev/api/operators/tap
  insertLocation(eventId:number): Observable<ILocation>
  {
    this.url = this.apiaddress.localaddress + `/api/event/location/${eventId}`;
    let body: any = {
      locationId: 0,
      address:"Gorai 1",
      city: "Mumbai",
      country:"India",
      eventId:eventId
    }
    let options =
    {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authService.getTokenBearer()}`,
          'Accept': 'application/json'
        })
    };

    return this.http.post<ILocation>(this.url, body, options);

  }

  update_Location(eventId: number, eventlocation: ILocation): Observable<ILocation>
 /* update_Location(eventId: number, eventlocation: ILocation): Observable<ILocation|boolean>*/
  {
    this.url = this.apiaddress.localaddress + `/api/event/location/${eventId}`;

    let body: any = eventlocation;
    let options =
    {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authService.getTokenBearer()}`,
          'Accept': 'application/json'
        })
    };

    return this.http.put<ILocation>(this.url, body, options)
      .pipe(tap((data: ILocation) => { }))
      .pipe(catchError(this.handleError<any>('update_Location',[])))
     /*.pipe(catchError((error: any) => { console.log(error); return of(false) }))*/
  }

  private handleError<T>(operation: string, result?: T)
  {
    return (error: any): Observable<T> =>
    {
      console.log(error);
      return of(result as T)
    }
  }


}
