import { HeaderService } from "../../components/template/header/header.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-crud",
  templateUrl: "./user-crud.component.html",
  styleUrls: ["./user-crud.component.css"],
})
export class UserCrudComponent implements OnInit {
  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: "User Registration",
      icon: "storefront",
      routeUrl: "/users",
    };
  }

  ngOnInit(): void {}

  navigateToUserCreate(): void {
    this.router.navigate(["/users/create"]);
  }
  navigateToGeneratePdf(): void {
    this.router.navigate(["/users/generate-pdf"]);
  }
  
  navigateToPreviewPdf(): void {
    this.router.navigate(["/users/preview-pdf"]);
  }

  navigateToDownloadPdf(): void {
    this.router.navigate(["/users/download-pdf"]);
  }
}
