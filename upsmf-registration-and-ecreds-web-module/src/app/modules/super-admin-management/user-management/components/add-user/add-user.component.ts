import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseServiceService } from 'src/app/services/base-service.service';
import { SuperAdminService } from '../../../service/super-admin.service';
import { BreadcrumbItem, ConfigService } from 'src/app/modules/shared';
import { ActivatedRoute, Route, Router } from '@angular/router';

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
  roleType:string = ''
  osId:string = ''
  osId1:string = ''
  userIds:string =''

  roleTypesArray = ["CouncilAdmin", "ExternalCouncil", "ExamBody","Regulator"];
  councilTypeArray:string[]=["UPSMF", "UPNM", "UPDC","UPMC"]
  activeStatusArray = ["Active", "Inactive"];
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Workspace', url: '/super-admin' },
    { label: 'User List', url: '/super-admin/user-manage' },
    { label: 'User Details', url: '/super-admin/new-user' },
  ];
  constructor(private formBuilder: FormBuilder,private baseService: BaseServiceService,
    private superAdminService: SuperAdminService,
    private configService: ConfigService,
    private route: ActivatedRoute,
    private router: Router
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
        console.log('1stRes',res)
        this.userDetails = res
        console.log('usd',this.userDetails)
        this.setUserFormData();
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
    if(this.userDetails?.attributes.role[0] === 'CouncilAdmin'){
      this.councilTypeArray = ["UPSMF", "UPNM", "UPDC","UPMC"]
    }
    else if(this.userDetails?.attributes.role[0] === 'ExternalCouncil'){
      this.councilTypeArray = ['OtherState']
    }
    else if(this.userDetails?.attributes.role[0] === 'Regulator'){
      this.councilTypeArray = ["UPSMF", "UPNM", "UPDC","UPMC"]
    }
    else {
      this.councilTypeArray =["UPSMF", "UPNM", "UPDC","UPMC"]
    }
    this.newUserformGroup.setValue({
      fName: firstName,
      lName: lastName,
      // username: this.userDetails?.username,
      phoneNo:this.userDetails?.attributes.phoneNumber,
      email: this.userDetails?.email,
      role:this.userDetails?.attributes.role[0],
      status: this.userDetails?.enabled === true? 'Active' : 'Inactive',
      council:this.userDetails?.attributes.council[0]
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
      case 'Regulator':
          this.councilTypeArray = ["UPSMFAC", "UPNM", "UPDC","UPMC"]
          this.endPointUrl = this.configService.urlConFig.URLS.USER.CREATE_EXAMINATION_USER
        break;

      default:
        return '';
    }
    return;
  }

  navigateToHome(){
    this.router.navigate(['super-admin/user-manage'])
  }

  onnewUserformSubmit(e: any) {

    if( this.isEditUser) {
      this.updateUser();
    } else {
      this.createUser(e);
    }
  }

  updateUser() {
    const {fName, lName, phoneNo, role, status, email, department,council} = this.newUserformGroup.value;
    const {id } = this.userDetails;
     const requestObj = {
      userName: this.userDetails.id,
      "request" : {
        // keycloakId: this.userDetails.keycloakId,
        firstName: fName,
        lastName: lName,
        email: email,
        username: email,
        enabled: status == 'Active'? true: false,
        emailVerified: true,
        credentials: [
          {
              "type": "password",
              "value": "ka09eF$299",
              "temporary": "false"
          }
      ],
      attributes: {
         module: "registration",
        // departmentName:  role === 'NODALOFFICER' ? department: role === 'GRIEVANCEADMIN' || role === 'ADMIN' ? -1 : null,
        phoneNumber: phoneNo,
        role: role,
        council:council

      }
      }
     }
   
    // this.isProcessing = true;
    this.superAdminService.updateUser(requestObj).subscribe({
      next: (res) => {
        this.userDetails = res.responseData;
        // this.toastrService.showToastr("User updated successfully!", 'Success', 'success', '');
        // this.isProcessing = false;
        this.navigateToHome();
     },
     error: (err) => {
      // success response
      if(err.status === 200) {
        // this.toastrService.showToastr("User updated successfully!", 'Success', 'success', '');
        // this.isProcessing = false;
        this.getUserDetails();
        this.navigateToHome();
      }
      else {
        // this.isProcessing = false;
        // this.toastrService.showToastr('Something went wrong. Please try again', 'Error', 'error', '');
      }
      
       // Handle the error here in case of login failure
     }}
    );
  }

  createUser(e:any){
    this.roleType =e.role
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
        if(res.result[this.roleType]){
          this.osId = res.result[this.roleType]?.osid
          console.log('osId',this.osId)
          this.osId1= this.osId.replace(/^1-/, '');
          console.log(this.osId1)
          this.getEmail(e)
        }


        // this.navigateToHome();
      }
    })
   this.submitted = true
  }

  getEmail(e:any){
    const reqObj = {
      "request":{
        "fieldName":"email",
        "fieldValue":e.email
    }
    }
  this.superAdminService.getEmails(reqObj).subscribe({
    next:(res)=>{
      console.log('getData',res)
      this.userIds =res[0]?.id
      this.UpdateCreatedUser(e,this.userIds)
    }
  })
  }

  UpdateCreatedUser(e:any,ids:string){
   console.log(e,'data')
   const requestObj = {
    userName: ids,
    "request" : {
      // keycloakId: this.userDetails.keycloakId,
      firstName: e.fName,
      lastName: e.lName,
      email: e.email,
      username: e.email,
      enabled: e.status == 'Active'? true: false,
      emailVerified: true,
      credentials: [
        {
            "type": "password",
            "value": "ka09eF$299",
            "temporary": "false"
        }
    ],
    attributes: {
      // module: "grievance",
      // departmentName:  role === 'NODALOFFICER' ? department: role === 'GRIEVANCEADMIN' || role === 'ADMIN' ? -1 : null,
      phoneNumber: e.phoneNo,
      role: e.role,
      council:e.council

    }
    }
   }
 
  // this.isProcessing = true;
  this.superAdminService.updateUser(requestObj).subscribe({
    next: (res) => {
      this.userDetails = res.responseData;
      // this.toastrService.showToastr("User updated successfully!", 'Success', 'success', '');
      // this.isProcessing = false;
      this.navigateToHome();
   },
   error: (err) => {
    // success response
    if(err.status === 200) {
      // this.toastrService.showToastr("User updated successfully!", 'Success', 'success', '');
      // this.isProcessing = false;
      this.getUserDetails();
      this.navigateToHome();
    }
    else {
      // this.isProcessing = false;
      // this.toastrService.showToastr('Something went wrong. Please try again', 'Error', 'error', '');
    }
    
     // Handle the error here in case of login failure
   }}
  );
  }
  

  onReset() {
    this.submitted = false;
    this.newUserformGroup.reset();
  }
}
