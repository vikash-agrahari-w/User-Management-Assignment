import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { User } from "./user.model";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl = "http://localhost:8001/user";
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

  create(user: User): Observable<User> {
    const url = `${this.baseUrl}/create`;
    return this.http.post<User>(url, user, { headers: this.authHeader }).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<User[]> {
    const url = `${this.baseUrl}/list`;
    return this.http.get<{ data: User[] }>(url, { headers: this.authHeader }).pipe(
      map(response => response.data),
      catchError((e) => this.errorHandler(e))
    );
  }


  readById(id: number): Observable<User> {
    const url = `${this.baseUrl}/details?id=${id}`;
    return this.http.get<{ data: User[] }>(url, { headers: this.authHeader }).pipe(
      map(response => response.data),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(user: User): Observable<User> {
    const url = `${this.baseUrl}/update?id=${user.id}`;
    return this.http.put<User>(url, user, { headers: this.authHeader }).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<User> {
    const url = `${this.baseUrl}/delete?id=${id}`;
    return this.http.delete<User>(url, { headers: this.authHeader }).pipe(
      map((obj) => obj),
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
