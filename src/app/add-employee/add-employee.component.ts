import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { CoreService } from '../core/core.service';
import { EmployeService } from '../Service/employe.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {
  EmpForm:FormGroup;

  education: string[]=[
    'matric',
    'diplama',
    'intermediate',
    'Graduation',
    'Post Graduation',
  ]
  constructor(
    private _fb: FormBuilder, 
    private _empServices:EmployeService,
    private _dialogRef:MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _coreServices:CoreService,
    ){
    this.EmpForm = this._fb.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:'',
    })

  }

  ngOnInit(): void {
    this.EmpForm.patchValue(this.data); 
  }
  onFormSubmit(){
    if(this.EmpForm.valid){
      if(this.data){
        this._empServices.updateEmployee(this.data.id, this.EmpForm.value).subscribe({
          next:(val:any)=>{
            // alert('Employee Datails Updated');
            this._coreServices.openSnackBar ('Employee Datails Updated', 'done');
            this._dialogRef.close(true);
          },
          error:(err:any)=>{
            console.error(err);
          }
        })
      }
      else{
        this._empServices.addEmployee(this.EmpForm.value).subscribe({
          next:(val:any)=>{
            // alert('Employee Added Successfully');
            this._coreServices.openSnackBar ('Employee Added Successfully', 'done');
            this._dialogRef.close(true);
          },
          error:(err: any)=>{
            console.error(err)
          }
        })
      }
      
      // console.log(this.EmpForm.value); 
    }
  }
}
