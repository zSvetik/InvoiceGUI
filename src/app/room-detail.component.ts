import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { RoomInfo }        from './RoomInfo';
import { RoomInfoService } from './RoomInfo.service';
@Component({
  moduleId: module.id,
  selector: 'room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: [ './room-detail.component.css' ]
})

export class RoomDetailComponent implements OnInit {

  roominfo: RoomInfo = new RoomInfo();
  id: number = 0;

  constructor(
    private roominfoService: RoomInfoService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    // this.route.params
    //   .switchMap((params: Params) => this.libuserService.getUser(+params['id']))
    //   .subscribe((user) => {
    //         this.libuser = user;
    //         this.zaraza = this.libuser.login
    //         console.log("Fuking user zaraza: "+this.zaraza);
    //   });
    this.route.params
      .subscribe((params: Params)=>{
          this.id = params['id'];
          console.log("PARAMS ID: " + this.id+"<<");
          this.roominfoService.getRoom(this.id)
            .then((room) => {
                this.roominfo = room;
              }
            )
        }
      )
  }

  save(): void {
    // this.libuserService.update(this.libuser)
    //   .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  reload():void {
    this.roominfoService.getRoom(this.id)
      .then((room) => {
          this.roominfo = room;
        }
      )
  }
}
