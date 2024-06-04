import { Component, OnInit } from "@angular/core";
import { PdfService } from "../pdf.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-pdf-downloader",
  templateUrl: "./pdf-download.component.html",
  styleUrls: ["./pdf-download.component.css"],
})
export class PdfDownLoadomponent implements OnInit {
  pdfBlob: Blob | undefined;

  constructor(private pdfService: PdfService, private router: Router) {}

  ngOnInit(): void {
    this.pdfService.retrieve().subscribe(
      (response) => {
        this.pdfBlob = new Blob([response], { type: "application/pdf" });
        const link = document.createElement("a");
        const fileURL = URL.createObjectURL(this.pdfBlob);
        link.href = fileURL;
        link.download = "user-data.pdf";
        link.click();
        URL.revokeObjectURL(fileURL);
        this.pdfService.showMessage("PDF Downloaded Successfully!");
        this.router.navigate(["/users"]);
      },
      (error) => {
        console.error("No PDF available to download.", error);
      }
    );
  }
}
