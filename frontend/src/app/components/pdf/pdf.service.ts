import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PdfService {
  baseUrl = "http://localhost:8001/pdf";
  authHeader = new HttpHeaders({
    'Authorization': 'Basic WFlaOlh5ekAxMjM0',
    'Content-Type': 'application/json'
  });

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  generate(): Observable<any> {
    const url = `${this.baseUrl}/generate`;
    return this.http.post<any>(url, {}, { headers: this.authHeader }).pipe(
      map(response => response.data),
      catchError((e) => this.errorHandler(e))
    );
  }

  retrieve(): Observable<Blob> {
    const url = `${this.baseUrl}/retrieve`;
    return this.http.get(url, { responseType: 'arraybuffer', headers: this.authHeader }).pipe(
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(error: HttpErrorResponse): Observable<any> {
    let errorMessage = "An error has occurred!";
    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    this.showMessage(errorMessage, true);
    return EMPTY;
  }
}
