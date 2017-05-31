import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/userService';
import { User } from '../../models/user.model';

class SubmittableFormGroup extends FormGroup {
  submitted: boolean;
}

@Component({
  selector: 'user-detail',
  templateUrl: './userDetail.component.html',
})

export class UserDetailComponent implements OnInit {
  errorMessage: String;
  userForm: SubmittableFormGroup;
  user: User = new User();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    ) {}

  ngOnInit() {
    this.userForm = new SubmittableFormGroup({
      firstName: new FormControl(
        '', [Validators.required, Validators.minLength(3)]
      ),
      lastName: new FormControl(
        '', [Validators.required, Validators.minLength(3)]
      ),
      email: new FormControl(
        '', [Validators.email]
      ),
      phone: new FormControl(),
      age: new FormControl(),
      company: new FormControl(),
      address: new FormGroup({
        street: new FormControl(),
        zip: new FormControl(),
        city: new FormControl(),
      }),
    });

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.userService.getById(id)
        .subscribe(user => {
          // store retrieved user for later use
          this.user = user;

          // fill form by user
          this.userForm.patchValue(user);
        });
    }
  }

  onSubmit() {
    this.userForm.submitted = true;
    if (!this.userForm.valid) {
      return;
    }

    // update user by form value
    this.user.updateBy(this.userForm.value);

    // save our user
    this.userService.save(this.user)
      .subscribe(
        success => this.location.back(),
        error => this.errorMessage = error,
      );
  }

  onCancel(event) {
    event.preventDefault();
    this.location.back();
  }

  onDelete(user, event) {
    event.preventDefault();
    this.userService.delete(this.user)
      .subscribe(() => {
        this.location.back();
      });
  }
}
