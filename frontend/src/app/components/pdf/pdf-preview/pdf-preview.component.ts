import { Component, OnInit } from "@angular/core";
import { PdfService } from "../pdf.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: "app-pdf-viewer",
  templateUrl: "./pdf-preview.component.html",
  styleUrls: ["./pdf-preview.component.css"],
})
export class PdfPreviewComponent implements OnInit {
  pdfUrl: SafeResourceUrl | undefined;
  pdfBlob: Blob | undefined;

  constructor(private pdfService: PdfService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.pdfService.retrieve().subscribe((response) => {
      this.pdfBlob = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(this.pdfBlob);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
    }, error => {
      console.error('Error retrieving PDF:', error);
    });
  }
}
