import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderService } from './header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatToolbarModule],
})
export class HeaderComponent implements OnInit {

  constructor(private headerService: HeaderService, private router: Router) { }

  ngOnInit(): void {
  }

  get title(): string {
    return this.headerService.headerData.title
  }

  get icon(): string {
    return this.headerService.headerData.icon
  }

  get routeUrl(): string {
    return this.headerService.headerData.routeUrl
  }

  navigateToRoute() {
    // Navigate using this.router.navigate()
    this.router.navigateByUrl(this.routeUrl);
  }
}
