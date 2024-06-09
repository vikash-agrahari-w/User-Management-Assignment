import { User } from './../user.model';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { HeaderService } from '../../header/header.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-read',
  templateUrl: './user-read.component.html',
  styleUrls: ['./user-read.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule],
})
export class UserReadComponent implements OnInit {
  users: User[] = [];
  displayedColumns = ['id', 'name', 'email', 'phone', 'address', 'action'];
  pdfUrl: SafeResourceUrl | undefined;
  pdfBlob: Blob | undefined;
  generatingPDF = false;


  constructor(
    private userService: UserService,
    headerService: HeaderService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    headerService.headerData = {
      title: 'User Registration',
      icon: 'storefront',
      routeUrl: '/users',
    };
  }

  ngOnInit(): void {
    this.getUsersData();
  }
  async getUsersData() {
    try {
      const usersResponse = await this.userService.read();
      this.users = usersResponse;
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  }

  async generatePdf() {
    try {
      this.generatingPDF = true; 
      await this.userService.generate();
      this.generatingPDF = false; 
      this.router.navigate(['/users']);
    } catch (error) {
      console.log('Error generating pdf:', error);
      this.generatingPDF = false; 
    }
  }

  async downloadPdf() {
    try {
      const response = await this.userService.preview();
      this.pdfBlob = new Blob([response], { type: 'application/pdf' });
      const link = document.createElement('a');
      const fileURL = URL.createObjectURL(this.pdfBlob);
      link.href = fileURL;
      link.download = 'user-data.pdf';
      link.click();
      URL.revokeObjectURL(fileURL);
      this.router.navigate(['/users']);
    } catch (error) {
      console.log('Error downloading pdf:', error);
    }
  }

  reRouting(route:string){
    this.router.navigate([`${route}`]);
  }
}
