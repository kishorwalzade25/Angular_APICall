export interface IEvent
{
  eventId:number,
  name:string,
  date:Date,
  time:string,
  price:number
  imageUrl:string,
  eventLocation?: ILocation,
  onlineUrl?: string,
  sessionDTOs?:ISession[]

}

export interface ILocation
{
  locationId:number,
  address: string,
  city: string,
  country:string,
  eventId:number
}

export interface ISession {
  
sessionId:number,
name:string,
presenter:string,
duration:number,
level:string,
abstract:string,
eventId:number
    
}

export interface IEvent_Location
{
  eventId: number,
  name: string,
  date: Date,
  time: string,
  price: number
  imageUrl: string,
  eventLocation: ILocation
}

export interface IUser
{
  userName: string,
  userLastName: string,
  tokenBearer:string
}
