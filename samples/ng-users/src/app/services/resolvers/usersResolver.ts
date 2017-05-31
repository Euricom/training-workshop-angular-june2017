import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/userService';

@Injectable()
export class UsersResolver implements Resolve<User[]> {

  constructor (private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.userService.getAll();
  }
}
