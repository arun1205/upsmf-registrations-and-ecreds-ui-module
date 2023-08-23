import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { BaseServiceService } from '../../../../services/base-service.service';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-good-standing-foreign-verification',
  templateUrl: './good-standing-foreign-verification.component.html',
  styleUrls: ['./good-standing-foreign-verification.component.scss']
})
export class GoodStandingForeignVerificationComponent {
  candidateDetails: boolean = true;
  links = ['Candidate Details', 'Payment Details']

  goodStandingForeignVerificationformGroup: FormGroup;
  submitted = false;

  listOfFiles: any[] = [];
  fileList: File[] = [];
  candidateDetailList:any[]=[];


  osid: string;
  stateData: any;
  customData: any;
  type: string;

  profQualificationArray = ['ANM', 'Midwife', 'HW', 'Nurse', 'Bsc Nursing'];

  activity: Observable<any>;

  constructor(private formBuilder: FormBuilder, private baseService: BaseServiceService,
    private router: Router,private datePipe: DatePipe,
  ) { 
    this.stateData = this.router?.getCurrentNavigation()?.extras.state;
    console.log("stateData:",this.stateData?.customData?.type)
  }

  ngOnInit() {
    this.initForm();
  }

  getCandidatePersonalDetails() {
    console.log("getting getCandidatePersonalDetails")

    this.baseService.getCandidatePersonalDetailsGoodstanding$()
      .subscribe(
        (response: any) => {
          this.candidateDetailList = response.responseData
          console.log("det",this.candidateDetailList[0])
          this.osid = this.candidateDetailList[0].osid;
          
          this.goodStandingForeignVerificationformGroup.patchValue({
            maidenName:this.candidateDetailList[0]?.name,
            mrdName:this.candidateDetailList[0]?.marriedName,
            email: this.candidateDetailList[0]?.email,
            mobNumber: this.candidateDetailList[0]?.phoneNumber,
            applicantName: this.candidateDetailList[0]?.name,
            adhr: this.candidateDetailList[0]?.aadhaarNo,
            motherName: this.candidateDetailList[0]?.mothersName,
            fatherName: this.candidateDetailList[0]?.fathersName, 
            dob: this.candidateDetailList[0]?.dob,
            gender: this.candidateDetailList[0]?.gender,
            al1: this.candidateDetailList[0]?.presentAddress,
            state: this.candidateDetailList[0].state,
            pin: this.candidateDetailList[0]?.pincode,
            district: this.candidateDetailList[0]?.district,
            country: this.candidateDetailList[0]?.country,
            regnNum:this.candidateDetailList[0]?.registrationNumber,
            placeOfWork:this.candidateDetailList[0]?.workPlace,
            tcName:this.candidateDetailList[0]?.trainingCenter

            
          });
         

        }
      );
  }
  getCandidatePersonalDetailsForeign() {
    console.log("getting getCandidatePersonalDetails")

    this.baseService.getCandidatePersonalDetailsForeignVerification$()
      .subscribe(
        (response: any) => {
          this.candidateDetailList = response.responseData
          console.log("deta",this.candidateDetailList[0])
          this.osid = this.candidateDetailList[0].osid;
          this.goodStandingForeignVerificationformGroup.patchValue({
            maidenName:this.candidateDetailList[0]?.name,
            email: this.candidateDetailList[0]?.email,
            mobNumber: this.candidateDetailList[0]?.phoneNumber,
            applicantName: this.candidateDetailList[0]?.name,
            adhr: this.candidateDetailList[0]?.aadhaarNo,
            motherName: this.candidateDetailList[0]?.mothersName,
            fatherName: this.candidateDetailList[0]?.fathersName, 
            dob: this.candidateDetailList[0]?.dob,
            gender: this.candidateDetailList[0]?.gender,
            al1: this.candidateDetailList[0]?.address,
            state: this.candidateDetailList[0].state,
            pin: this.candidateDetailList[0]?.pincode,
            district: this.candidateDetailList[0]?.district,
            country: this.candidateDetailList[0]?.country,
            placeOfWork:this.candidateDetailList[0]?.workPlace,
            tcName:this.candidateDetailList[0]?.trainingCenter,
            regnNum:this.candidateDetailList[0]?.registrationNumber,


            
          });
         

        }
      );
  }

  initForm() {
    this.goodStandingForeignVerificationformGroup = this.formBuilder.group({
      maidenName: new FormControl('', [
        Validators.required]),
      mrdName: new FormControl('', [
        Validators.required]),
      fatherName: new FormControl('', [
        Validators.required]),
      dob: new FormControl('', [
        Validators.required]),
      al1: new FormControl('', [
        Validators.required]),
      al2: new FormControl('', [
        Validators.required]),
      district: new FormControl('', [
        Validators.required]),
      state: new FormControl('', [
        Validators.required]),
      pin: new FormControl('', [
        Validators.required]),
      country: new FormControl('', [
        Validators.required]),
      adhr: new FormControl('', [
        Validators.required]),
      proQual: new FormControl('', [
        Validators.required]),
      regnNum: new FormControl('', [
        Validators.required]),
      tcName: new FormControl('', [
        Validators.required]),
      placeOfWork: new FormControl('', [
        Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      mobNumber: new FormControl('', [
        Validators.required,
        Validators.pattern("^(0|91)?[6-9][0-9]{9}$")]),
    });
    if(this.stateData.customData.type === 'goodStandingCert'){
      this.getCandidatePersonalDetails();

    }
    else{
      this.getCandidatePersonalDetailsForeign();
    }
  }

  showInfo(option: any) {
    console.log(option)
    option === "Candidate Details" ? this.candidateDetails = true : this.candidateDetails = false;
  }

  onFileChanged(event?: any) {
    console.log(event);
    for (let i = 0; i <= event.target.files.length - 1; i++) {
      let selectedFile = event.target.files[i];

      if (this.listOfFiles.indexOf(selectedFile.name) === -1) {
        this.fileList.push(selectedFile);
        this.listOfFiles.push(selectedFile.name.concat(this.formatBytes(selectedFile.size)));
      }
    }
  }

  removeSelectedFile(index: any) {
    // Delete the item from fileNames list
    this.listOfFiles.splice(index, 1);
    // delete file from FileList
    this.fileList.splice(index, 1);
  }

  formatBytes(bytes: any, decimals = 2) {
    if (!+bytes) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  onGoodStandingForeignVerificationformSubmit(value: any) {
    console.log(value)
    if ((this.stateData.customData.type === 'goodStandingCert')) {
      // this.candidateDetails = false;
      const updateStudentGoodstandingBody={
        "name":this.goodStandingForeignVerificationformGroup.value.maidenName,
        "fathersName": this.goodStandingForeignVerificationformGroup.value.fatherName,
        "presentAddress":`${this.goodStandingForeignVerificationformGroup.value.al1} ${this.goodStandingForeignVerificationformGroup.value.al2}`,
        "phoneNumber": this.goodStandingForeignVerificationformGroup.value.mobNumber,
        "email": this.goodStandingForeignVerificationformGroup.value.email,
        "trainingCenter": this.goodStandingForeignVerificationformGroup.value.tcName,
        "council": "upsmf",
        "workPlace":this.goodStandingForeignVerificationformGroup.value.placeOfWork,
        "date": this.datePipe.transform(new Date(), "yyyy-MM-dd")?.toString(),
        "refNo": "REF789012",
        "validityOfRegistration": "2023-12-31",
        "dob": "1990-05-15",
        "docproof": "qwer.doc",
        "candidatePic": "pic1.jpg",
        "paymentStatus": "SUCCESS",
        "marriedName":this.goodStandingForeignVerificationformGroup.value.mrdName,
        "maidenName":this.goodStandingForeignVerificationformGroup.value.maidenName,
        "professionalQualification":this.goodStandingForeignVerificationformGroup.value.proQual,
        "registrationNumber":this.goodStandingForeignVerificationformGroup.value.regnNum
      
      }
      console.log("goodBody",updateStudentGoodstandingBody)
      this.baseService.updateStudentGoodStanding$(this.osid, updateStudentGoodstandingBody)
       .pipe(
         mergeMap((resp: any) => {
          const makeClaimbody =
          {
            entityName: "StudentGoodstanding",
            entityId: this.osid,
            name: "studentGoodstandingVerification",
            propertiesOSID: {
              studentGoodstandingVerification: [
                  this.osid
                ]
            }
        }
           return this.baseService.makeClaim$(this.osid,makeClaimbody);
         }
         ))  
         .subscribe(
           (response) => {
             console.log("good resp",response);
   
           },
         )
    }
    else{
      const updateStudentForeignVerificationBody={
        "name":this.goodStandingForeignVerificationformGroup.value.maidenName,
        "fathersName": this.goodStandingForeignVerificationformGroup.value.fatherName,
        "address":`${this.goodStandingForeignVerificationformGroup.value.al1} ${this.goodStandingForeignVerificationformGroup.value.al2}`,
        "phoneNumber": this.goodStandingForeignVerificationformGroup.value.mobNumber,
        "email": this.goodStandingForeignVerificationformGroup.value.email,
        "trainingCenter": this.goodStandingForeignVerificationformGroup.value.tcName,
        "council": "upsmf",
        "registrationNumber":this.goodStandingForeignVerificationformGroup.value.regnNum,
        "workPlace":this.goodStandingForeignVerificationformGroup.value.placeOfWork,
        "date": this.datePipe.transform(new Date(), "yyyy-MM-dd")?.toString(),
        "refNo": "REF789012",
        "validityOfRegistration": "2023-12-31",
        "dob": "1990-05-15",
        "docproof": "qwer.doc",
        "candidatePic": "pic1.jpg",
        "paymentStatus": "SUCCESS"
      }
      this.baseService.updateStudentForeignVerification$(this.osid, updateStudentForeignVerificationBody)
      .pipe(
        mergeMap((resp: any) => {
         const makeClaimbody =
         {
           entityName: "StudentForeignVerification",
           entityId: this.osid,
           name: "StudentForeignVerify",
           propertiesOSID: {
            StudentForeignVerify: [
                 this.osid
               ]
           }
       }
          return this.baseService.makeClaim$(this.osid,makeClaimbody);
        }
        ))  
        .subscribe(
          (response) => {
            console.log("good resp",response);
  
          },
        )

    }
    
  }

  onReset() {
    console.log("onReset")
    this.submitted = false;
    this.goodStandingForeignVerificationformGroup.reset();
    this.listOfFiles = [];
  }
}
