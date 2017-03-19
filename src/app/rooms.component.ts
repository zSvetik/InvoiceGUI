import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { RoomInfo }                from './RoomInfo';
import { RoomInfoService }         from './RoomInfo.service';

@Component({
  moduleId: module.id,
  selector: 'inv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: [ './rooms.component.css' ]
})
export class RoomsComponent implements OnInit {
  roomInfo: RoomInfo = new RoomInfo();
  rooms: RoomInfo[];
  selectedRoom: RoomInfo;

  constructor(
    private roominfoService: RoomInfoService,
    private router: Router) { }

  getRooms(): void {
    this.roominfoService
      .getRooms()
      .then(rooms => this.rooms = rooms);
  }

  add(area: number, guests: number): void {
    let room:RoomInfo = new RoomInfo();
    room.owner = this.roomInfo.owner;
    room.area = 1;
    room.guests = 1;
    this.roominfoService.create(room)
      .then(room => {
        this.rooms.push(room);
        this.selectedRoom = null;
      });
  }

  delete(room: RoomInfo): void {
    this.roominfoService
      .delete(room.id)
      .then(() => {
        this.rooms = this.rooms.filter(h => h !== room);
        if (this.selectedRoom === room) { this.selectedRoom = null; }
      });
  }

  ngOnInit(): void {
    this.getRooms();
  }

  onSelect(room: RoomInfo): void {
    this.selectedRoom = room;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedRoom.id]);
  }

  reload():void {
    this.getRooms();
  }
}
