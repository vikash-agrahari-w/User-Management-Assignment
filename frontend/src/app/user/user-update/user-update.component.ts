import { User } from './../user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
  ],
})
export class UserUpdateComponent implements OnInit {
  user: User = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit(): Promise<void> {
    const id: any = this.route.snapshot.paramMap.get('id');
    const usersResponse = await this.userService.readById(id);
    this.user = usersResponse;
  }

  async updateUser(userForm: NgForm): Promise<void> {
    if (userForm.valid) {
      await this.userService.update(this.user);
      this.reRouting('/users');
    }
  }

  cancel(): void {
    this.router.navigateByUrl('/users');
  }

  reRouting(route: string): void {
    this.router.navigate([route]);
  }
}
