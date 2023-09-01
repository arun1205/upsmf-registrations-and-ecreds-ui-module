import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseServiceService } from 'src/app/services/base-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  submitted: boolean = false;

  public newUserformGroup: FormGroup;

  roleTypesArray = ["Admin", "Secretary", "Grievance Nodal", "Nodal Officer"]
  activeStatusArray = ["Active ", "Inactive"];
  constructor(private formBuilder: FormBuilder,private baseService: BaseServiceService,
  ) {
    
   }

  ngOnInit() {
    this.createForm();
  }

  createForm() {

    this.newUserformGroup = this.formBuilder.group({
      status: new FormControl('', [
        Validators.required]),
      fName: new FormControl('', [
        Validators.required]),
      lName: new FormControl('', [
        Validators.required]),
      role: new FormControl('', [
        Validators.required]),
      email: new FormControl('arun@awe.com', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phoneNo: new FormControl('8989786756', [
        Validators.required,
        Validators.pattern("^(0|91)?[6-9][0-9]{9}$")]),

    });
  }

  onnewUserformSubmit(e: any) {
this.submitted = true
  }

  onReset() {
    this.submitted = false;
    this.newUserformGroup.reset();
  }
}
