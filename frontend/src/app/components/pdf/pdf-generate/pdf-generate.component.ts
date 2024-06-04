import { Component, OnInit } from "@angular/core";
import { PdfService } from "../pdf.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-pdf-generator",
  templateUrl: "./pdf-generate.component.html",
  styleUrls: ["./pdf-generate.component.css"],
})
export class PdfGenerateComponent implements OnInit {
  constructor(private pdfService: PdfService, private router: Router) {}

  ngOnInit(): void {
    this.pdfService.generate().subscribe(() => {
      this.pdfService.showMessage("PDF Generated successfully!");

      this.router.navigate(["/users"]);
    });
  }
}
