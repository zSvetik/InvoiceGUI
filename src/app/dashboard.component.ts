import { Component, OnInit } from '@angular/core';

import { RoomInfo }        from './RoomInfo';
import { RoomInfoService } from './RoomInfo.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  rooms: RoomInfo[] = [];

  constructor(private roominfoService: RoomInfoService) { }

  ngOnInit(): void {
    this.roominfoService.getRooms()
      .then(roomInfoList => this.rooms = roomInfoList);
  }
}
