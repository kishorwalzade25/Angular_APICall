import { Injectable } from "@angular/core";

@Injectable(
  {
    providedIn: 'root'
  })

export class ApiAddressService
{
  localaddress: string = "https://localhost:7011";
}
