import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entity/user.entity';
import { RESPONSE_DATA } from 'src/common/responses';
import { User } from '../user/interfaces/user.interface';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import { CONSTANT } from 'src/common/constant';
import * as path from 'path';

@Injectable()
export class PdfService {
  constructor(private readonly userEntity: UserEntity) {}

  async generatePdf() {
    try {
      const data: User[] = await this.userEntity.getAllUsers();

      if (!data) {
        return [RESPONSE_DATA.DATA_NOT_FOUND, {}];
      }

      const doc = new PDFDocument({ size: 'A4' });

      const headers = Object.keys(data[0]);
      const headerValues = CONSTANT.PDF_REPORT_HEADERS;

      const writable = doc.pipe(
        fs.createWriteStream('generatedPdfs/user-data.pdf'),
      );

      let columnWidths: number[];
      let currentRow = [];
      let margin: any;

      function repeatHeader() {
        margin = doc.page.margins; 
        const tableWidth = doc.page.width - margin.left - margin.right;
        columnWidths = headers.map(() => tableWidth / headers.length);

        doc.font('Helvetica-Bold');
        doc
          .fontSize(15)
          .text(`User Data`, { align: 'center', underline: true });
        doc.moveTo(margin.left, doc.y + 5);
        doc.lineTo(margin.right, doc.y + 5);
        doc.stroke();

        doc.y += 15;
        doc.fontSize(10);
        const currentHeight: number = doc.y;
        headerValues.forEach((header, index) => {
          doc.text(
            header,
            margin.left + index * columnWidths[index],
            currentHeight,
            {
              width: columnWidths[index],
              align: 'center',
            },
          );
        });
        doc.moveTo(margin.left, doc.y);
        doc.lineTo(margin.right, doc.y);
        doc.stroke();
        doc.y += 15;
      }

      repeatHeader();

      data.forEach((row: any) => {
        doc.font('Helvetica');
        if (doc.y + 20 > doc.page.height) {
          doc.addPage();
          repeatHeader();
        }
        const currentHeight: number = doc.y;

        headers.forEach((header, index) => {
          currentRow.push(
            doc.text(
              row[header] as string,
              margin.left + index * columnWidths[index],
              currentHeight,
              {
                width: columnWidths[index],
                align: 'center',
              },
            ),
          );
        });

        doc.y += 10;
      });

      doc.end();
      writable.on('finish', () => console.log('PDF generation complete'));
      return [RESPONSE_DATA.SUCCESS, {}];
    } catch (error) {
      console.log('Error in generatePdf:---------->', error);
      return [RESPONSE_DATA.ERROR, {}];
    }
  }

  async previewPdf() {
    try {
      const pdfPath = path.join(
        __dirname,
        '../../../../generatedPdfs/user-data.pdf',
      );

      console.log(pdfPath);

      if (!fs.existsSync(pdfPath)) {
        return [RESPONSE_DATA.PDF_NOT_FOUND, {}];
      }
      const bufferData = fs.readFileSync(pdfPath);

      return [
        RESPONSE_DATA.SUCCESS,
        { contentType: 'application/pdf', response: bufferData },
      ];
    } catch (error) {
      console.log('Error in previewPdf:---------->', error);
      return [RESPONSE_DATA.ERROR, {}];
    }
  }
}
