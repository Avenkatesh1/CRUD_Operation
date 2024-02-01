import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';
import { EmployeService } from './Service/employe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'curd-app';
  displayedColumns: string[] = 
  ['id',
   'firstName', 
   'lastName', 
   'email',
   'dob',
   'gender',
   'education',
   'company',
   'experience',
   'package',
   'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog:MatDialog, 
    private _empservice:EmployeService, 
    private _coreService:CoreService

    ){}

  ngOnInit(): void {
    this.getEmployeeList();
  }
// <----This is an Add button logic -->
  OpenAddEditEmpForm(){
    const dialogRef = this._dialog.open(AddEmployeeComponent);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if (val){
          this.getEmployeeList();
        }
      },
    });
  
  }

  getEmployeeList(){
    this._empservice.getEmployeeList().subscribe({
      next:(res)=>{
        this.dataSource= new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmployee(id:number){
    this._empservice.deleteEmployee(id).
    subscribe({
      next:(res)=>{
        // alert('Employee Deleted!');
        this._coreService.openSnackBar ('Employee Deleted!', 'done');
        this.getEmployeeList();
      },
      error: console.log,   
    });
  }
  OpenEditForm(data: any){
     const dialogRef= this._dialog.open(AddEmployeeComponent,{
      data,

     });
     dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if (val){
          this.getEmployeeList();
        }
      },
    });
  }
}
