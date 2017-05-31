import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user.model';
import { UserService } from '../../services/userService';

@Component({
  selector: 'user-panel-list',
  templateUrl: './userPanelList.component.html',
  styleUrls: ['./userPanelList.component.css']
})
export class UserPanelListComponent implements OnInit {
  users: User[];
  // errorMessage: string;

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    // get data from RouteResolver
    // this.users = this.route.snapshot.data['users'] as User[];
    this.userService.getAll()
      .subscribe(
        users => this.users = users,
        // error => this.errorMessage = error
      );
  }
}
