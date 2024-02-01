import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message:any, acction:any ='Ok') {
    this._snackBar.open(message,acction, {
      duration: 1000,
      verticalPosition:'top', 
    });
  }
}
