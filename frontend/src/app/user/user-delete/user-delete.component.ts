import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../user.service';
import { User } from './../user.model';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css'],
  standalone: true,
  imports: [CommonModule, NgIf, FormsModule, MatFormFieldModule, MatCardModule],
})
export class UserDeleteComponent implements OnInit {
  user!: User;
  dataSource: string = 'user';

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const id: any = this.route.snapshot.paramMap.get('id');
      const usersResponse = await this.userService.readById(id);
      this.user = usersResponse;
      console.log(usersResponse);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  
  async deleteUser(){
    await this.userService.delete(this.user.id);
    this.reRouting('/users');
  }

  cancel(): void {
    this.router.navigateByUrl('/users');
  }

  reRouting(route:string): void{
    this.router.navigate([route]);
  }
}
