import { Component, OnInit } from '@angular/core';
import { ApiCallService } from './API/apiCall.service';
import { IEvent, IEvent_Location, ILocation, IUser } from './Models/event.models';
import { AuthService } from './Service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Event_APICalls';

  constructor(private apicall: ApiCallService, private authservice: AuthService) { }

  ngOnInit()
  {
    this.authservice.loginUser("kishor", "@12345").subscribe((user: boolean | IUser) => {
      if (!user)
      {

      }
      else
      {
        //this.apicall.getEvent().subscribe((events: IEvent[]) => { console.log(events); })
        //this.apicall.getEvent_location(12, 13).subscribe((eventLocation: IEvent_Location) => { console.log(eventLocation); });
        //this.apicall.insertLocation(12).subscribe((location: ILocation) => { console.log(location) });

        let body = {
          "locationId": 13,
          "address": "61/A-11,Goari (1) Pradnya",
          "city": "Mumbai-Suburban",
          "country": "India",
          "eventId": 12
        };
        this.apicall.update_Location(body.eventId, body).subscribe((response: ILocation) => { console.log(response); });
       
      }
      
    });

      
   

     

  }
}
