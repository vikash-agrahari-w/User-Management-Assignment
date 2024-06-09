import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-pdf-preview',
  templateUrl: './pdf-preview.component.html',
  styleUrls: ['./pdf-preview.component.css'],
  standalone: true,
  imports: [NgIf, CommonModule, RouterModule]
})
export class PdfPreviewComponent implements OnInit {
  pdfUrl: SafeResourceUrl | undefined;
  pdfBlob: Blob | undefined;

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private userService: UserService) { }

  async ngOnInit(): Promise<any> {
   await this.perviewPdf();
  }

  async perviewPdf(): Promise<any>{
    try {
      const response = await this.userService.preview();
      this.pdfBlob = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(this.pdfBlob);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
    } catch (error) {
      console.log('Error previewing pdf:', error);
    }
  }
}
