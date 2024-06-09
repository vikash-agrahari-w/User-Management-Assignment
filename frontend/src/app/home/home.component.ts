import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderService } from '../header/header.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf, MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private headerService: HeaderService) {
    this.headerService.headerData = {
      title: "Home",
      icon: "home",
      routeUrl: "",
    };
  }
 
  items = [
    {
      title: 'Create User',
      description: 'You can create a new user by entering a few details.',
      image: 'assets/img/create.png',
      routeLink: '/user/create'
    },
    {
      title: 'Update User',
      description: 'You can update an existing user\'s information.',
      image: 'assets/img/update.png',
      routeLink: ''
    },
    {
      title: 'Delete User',
      description: 'You can delete an existing user from the system.',
      image: 'assets/img/delete.png',
      routeLink: ''
    },
    {
      title: 'Users List',
      description: 'You can view a list of all the users in the system.',
      image: 'assets/img/read.png',
      routeLink: '/users'
    },
    {
      title: 'Generate User PDF',
      description: 'You can generate a PDF document containing the details of a user.',
      image: 'assets/img/generate.png',
      routeLink: '/'
    },
    {
      title: 'Preview User PDF',
      description: 'You can preview the generated PDF document before downloading it.',
      image: 'assets/img/preview.png',
      routeLink: '/pdf-preview'
    },
];
ngOnInit(): void {
}
}

