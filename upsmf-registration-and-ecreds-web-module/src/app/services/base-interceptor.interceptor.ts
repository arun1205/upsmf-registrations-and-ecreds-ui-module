import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError, tap, } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class BaseInterceptorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(e => {
        if (request.method == "POST" || request.method == "PUT")
          if (e instanceof HttpResponse && e.status == 200) {
            this.snackBar.open('Action completed successfully !!', 'close', {
              duration:5000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
              panelClass: 'red-snackbar',
            });
          }
      }),
      catchError(error => {
        this.snackBar.open('Error while completing action.', 'close', {
          duration:5000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
          panelClass: 'red-snackbar',
        });
        return throwError(error);
      })
    );
   // return next.handle(request);
  }
}


