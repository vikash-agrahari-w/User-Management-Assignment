import { FormsModule, NgForm } from '@angular/forms';
import { UserTable } from './../user.model';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    NgIf
  ],
})
export class UserCreateComponent implements OnInit {
  user: UserTable = {
    name: '',
    email: '',
    phone: '',
    address: '',
  };

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  async createUser(userForm: NgForm): Promise<void> {
    if (userForm.valid) { 
      await this.userService.create(this.user);
      this.reRouting('/users');
    }
  }

  cancel(): void {
    this.router.navigate(['users']);
  }

  reRouting(route: string): void {
    this.router.navigate([`${route}`]);
  }
}
