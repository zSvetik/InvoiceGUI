import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';

import 'rxjs/add/operator/toPromise';

import { RoomInfo } from './RoomInfo';

@Injectable()
export class RoomInfoService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private roomsUrl = 'http://localhost:8080/room';  // URL to web api
  private token:string;
  constructor(
    private http: Http,
    private localStService: LocalStorageService
  ) { }

  login(login:string, password: string){
    //TODO: implement later
    this.token = "12345678";
    this.localStService.add('login',login);
    this.localStService.add('password',login);
    this.localStService.add('token',this.token);
    this.headers.append('Authorization: Bearer',this.token);
  }

  getRooms(): Promise<RoomInfo[]> {
    const url = `${this.roomsUrl}/all`;
    return this.http.get(url,{headers: this.headers})
      .toPromise()
      .then(response =>{
        console.log("room JSON: "+JSON.stringify(response.json()));
        return Promise.resolve(response.json().roomInfoList as RoomInfo[]);
      })
      .catch(this.handleError);
  }

//example of debug of promise
  getRoom(id: string): Promise<RoomInfo> {
    const url = `${this.roomsUrl}/byid/${id}`;
    return this.http.get(url,{headers: this.headers}).toPromise()
      .then(response => {
        let room: RoomInfo;
        console.log("room JSON: "+JSON.stringify(response.json()));
        room = response.json().roomInfoList[0];
        console.log("Room: "+room.id)
        return Promise.resolve(room);
      })
      .catch(
        this.handleError
      );
  }

  create(room:  RoomInfo): Promise<RoomInfo> {
    const url = `${this.roomsUrl}/add`;
    let data={"roomInfo":null};
    data.roomInfo = room;
    return this.http.post(url,data,{headers: this.headers})
      .toPromise()
      .then(response =>{
        console.log("room create JSON: "+JSON.stringify(response.json()));
        response.json().roomInfoList[0] as RoomInfo;
      })
      .catch(this.handleError);
  }

  update(roomInfo:  RoomInfo): Promise<RoomInfo> {
    const url = `${this.roomsUrl}/update`;
    let data={"roomInfo":null};
    data.roomInfo = roomInfo;
    console.log("data update JSON: " + JSON.stringify(data));
    return this.http.post(url, data, {headers: this.headers})
      .toPromise()
      .then(response => {
        console.log("room update JSON: "+JSON.stringify(response.json()));
        response.json().roomInfoList[0] as RoomInfo;})
      .catch(this.handleError);
  }

  delete(id: string): Promise<number> {
    const url = `${this.roomsUrl}/del/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().retcode as number)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
