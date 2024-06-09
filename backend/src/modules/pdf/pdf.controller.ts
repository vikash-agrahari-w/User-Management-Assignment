import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpResponse } from 'src/common/httpResponse';
import { PdfService } from './pdf.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('PDF Module')
@Controller('/')
export class PdfController {
  constructor(
    private readonly httpResponse: HttpResponse,
    private readonly pdfService: PdfService,
  ) {}

  
  @Post('/generate')
  @ApiOperation({ summary: 'api to generate user data PDF' })
  @ApiBasicAuth()
  @UseGuards(AuthGuard('basic'))
  async PdfListing(
    @Res() response: Response,
  ) {
    try {
      const [status, result] = await this.pdfService.generatePdf();
      return this.httpResponse.sendResponse(response, status, result);
    } catch (error) {
      throw error;
    }
  }

  @Get('/preview')
  @ApiOperation({ summary: 'api to preview user data PDF' })
  @ApiBasicAuth()
  @UseGuards(AuthGuard('basic'))
  async PdfPreview(
    @Res() response: Response,
  ) {
    try {
      const [status, result] = await this.pdfService.previewPdf();
      return this.httpResponse.sendResponse(response, status, result);
    } catch (error) {
      throw error;
    }
  }
}
