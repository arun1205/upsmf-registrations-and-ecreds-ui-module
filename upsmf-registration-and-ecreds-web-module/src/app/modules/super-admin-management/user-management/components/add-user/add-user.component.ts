import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseServiceService } from 'src/app/services/base-service.service';
import { SuperAdminService } from '../../../service/super-admin.service';
import { ConfigService } from 'src/app/modules/shared';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  submitted: boolean = false;
  roleSelectedValue:string = ''
  public newUserformGroup: FormGroup;
  endPointUrl:string;
  userId:string;
  isEditUser:boolean = false;
  userDetails:any;

  roleTypesArray = ["CouncilAdmin", "ExternalCouncil", "ExamBody"];
  councilTypeArray:any
  activeStatusArray = ["Active ", "Inactive"];
  constructor(private formBuilder: FormBuilder,private baseService: BaseServiceService,
    private superAdminService: SuperAdminService,
    private configService: ConfigService,
    private route: ActivatedRoute
  ) {
    
   }

  ngOnInit() {
    this.createForm();
    this.route.queryParams.subscribe((param)=>{
      console.log(param['id']);
      this.userId = param['id'];
      console.log(this.userId);
      if(this.userId !== undefined) {
        this.isEditUser = true;
        this.getUserDetails();
      }
    })
  }
  getUserDetails() {
    this.superAdminService.getUserDetails(this.userId).subscribe({
      next: (res) => {
        console.log(res)
        this.userDetails = res.responseData;
        // this.setUserFormData();
      }
    })
  }
  setUserFormData(){
    let firstName = '', lastName = '';
    console.log(this.userDetails);
    if((this.userDetails.firstName && this.userDetails.firstName !== "") && (this.userDetails.lastName && this.userDetails.lastName !== "")) {
      firstName = this.userDetails.firstName,
      lastName = this.userDetails.lastName
    };
    this.newUserformGroup.setValue({
      firstName: firstName,
      lastName: lastName,
      username: this.userDetails?.username,
      phone:this.userDetails?.attributes.phoneNumber,
      role:this.userDetails?.attributes.Role[0],
      status: this.userDetails?.enabled === true? 'Active' : 'Inactive'
    })
    console.log(this.newUserformGroup.value);
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
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phoneNo: new FormControl('', [
        Validators.required,
        Validators.pattern("^(0|91)?[6-9][0-9]{9}$")]),
      council: new FormControl('', [
          Validators.required]),

    });
  }

  roleTypeSelected(e:any){
   console.log('Role',e)
   this.roleSelectedValue = e.value;
   console.log(this.roleSelectedValue)
   switch (this.roleSelectedValue) {
      case 'CouncilAdmin':
        this.councilTypeArray = ["UPSMFAC", "UPNM", "UPDC","UPMC"]
        this.endPointUrl = this.configService.urlConFig.URLS.USER.CREATE_COUNCIL_USER
        break;
      case 'ExternalCouncil':
        this.councilTypeArray = ['OtherState']
        this.endPointUrl = this.configService.urlConFig.URLS.USER.CREATE_EXTERNAL_USER
        break;
      case 'ExamBody':
          this.councilTypeArray = ["UPSMFAC", "UPNM", "UPDC","UPMC"]
          this.endPointUrl = this.configService.urlConFig.URLS.USER.CREATE_EXAMINATION_USER
        break;

      default:
        return '';
    }
    return;
  }

  onnewUserformSubmit(e: any) {
    console.log(e)
    const name = e.fName + ' ' + e.lName
    e.name = name
    const userObject = {
      name:name,
      phoneNumber: e.phoneNo,
      email: e.email,
      council: e.council
    }

    this.superAdminService.Createuser$(userObject, this.endPointUrl).subscribe({
      next:(res)=>{
        console.log(res)
      }
    })

   this.submitted = true
  }

  onReset() {
    this.submitted = false;
    this.newUserformGroup.reset();
  }
}
