import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe, Location } from '@angular/common';
import { BaseServiceService } from 'src/app/services/base-service.service';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';

@Component({
  selector: 'app-new-regn-cert-details',
  templateUrl: './new-regn-cert-details.component.html',
  styleUrls: ['./new-regn-cert-details.component.scss']
})
export class NewRegnCertDetailsComponent {

  links = ['Candidate Details', 'Course Details', 'Payment Details']

  newRegCertformGroup: FormGroup;
  public newRegCertDetailsformGroup: FormGroup;
  newRegCourseDetailsformGroup: FormGroup;
  submitted = false;

  candidateDetails: boolean = true;
  paymentDetails: boolean = false;

  genderTypesArray = ['male', 'female', 'Others']

  listOfFiles: any[] = [];
  fileList: File[] = [];

  listOfCourseFiles: any[] = [];
  courseFileList: File[] = [];
  isStudent: boolean = true;
  candidateDetailList:any[]=[];
  docsUrl:any[]=[];
  urlData:any[]=[];
  urlList:any;
  updatedUrlList:any;


  osid: string;

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  stateData: any;
  selectedLink: string = 'Candidate Details';


  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe,
    private location: Location, private baseService: BaseServiceService,
    private router: Router
  ) {
    this.stateData = this.router?.getCurrentNavigation()?.extras.state;
    console.log("stateData:",this.stateData)
    

  }

  ngOnInit() {
    this.initForm();

  }

  initForm() {

    this.newRegCertDetailsformGroup = this.formBuilder.group({
      applicantName: new FormControl('', [
        Validators.required]),
      motherName: new FormControl('', [
        Validators.required]),
      fatherName: new FormControl('', [
        Validators.required]),
      dob: new FormControl('', [
        Validators.required]),
      al1: new FormControl('Saharanpur', [
        Validators.required]),
      al2: new FormControl('Saharanpur', [
        Validators.required]),
      district: new FormControl('Saharanpur', [
        Validators.required]),
      state: new FormControl('UP', [
        Validators.required]),
      pin: new FormControl('302001', [
        Validators.required, Validators.minLength(6),
        Validators.pattern("^[0-9]*$")]
      ),
      country: new FormControl('India', [
        Validators.required]),
      adhr: new FormControl('', [
        Validators.required]),
      gender: new FormControl('', [
        Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      mobNumber: new FormControl('', [
        Validators.required,
        Validators.pattern("^(0|91)?[6-9][0-9]{9}$")]),
    });

    this.newRegCourseDetailsformGroup = this.formBuilder.group({
      courseName: new FormControl('', [
        Validators.required]),
      collegeName: new FormControl('', [
        Validators.required]),
      examBody: new FormControl('', [
        Validators.required]),
      joinDate: new FormControl('', [
        Validators.required]),
      rollNum: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$")]),
      passDate: new FormControl('', [
        Validators.required])
    });

    this.getCandidatePersonalDetails();

  }

  getCandidatePersonalDetails() {
    console.log("getting getCandidatePersonalDetails")

    this.baseService.getCandidatePersonalDetails$()
      .subscribe(
        (response: any) => {
          if(response.responseData.length){
            this.candidateDetailList = response.responseData
            console.log(this.candidateDetailList[0])
            this.osid = this.candidateDetailList[0].osid;
            this.urlData = this.candidateDetailList[0].docproof;
            console.log('urlDaaaa',this.urlData)
            if(this.urlData.length){
              this.listOfFiles = this.urlData?.map(url => {
                const parts = url.split('=');
                const fileNameWithQueryParams = parts[1];
                const fileName = fileNameWithQueryParams.split('/').pop();
                const extractLastPart = fileName?.split('_').pop(); 
                const getuploadObject = {
                  name:extractLastPart,
                  url:url
                } 
                return getuploadObject;         
              });
            }
            
            console.log(this.listOfFiles)
            
            // this.listOfFiles = this.candidateDetailList[0].docproof;
            this.newRegCertDetailsformGroup.patchValue({
              email: this.candidateDetailList[0]?.email,
              mobNumber: this.candidateDetailList[0]?.phoneNumber,
              applicantName: this.candidateDetailList[0]?.name,
              adhr: this.candidateDetailList[0]?.aadhaarNo,
              motherName: this.candidateDetailList[0]?.mothersName,
              fatherName: this.candidateDetailList[0]?.fathersName, 
              dob: this.candidateDetailList[0]?.dateOfBirth,
              gender: this.candidateDetailList[0]?.gender,
              al1: this.candidateDetailList[0]?.address,
              state: this.candidateDetailList[0].state,
              pin: this.candidateDetailList[0]?.pincode,
              district: this.candidateDetailList[0]?.district,
              country: this.candidateDetailList[0]?.country
  
  
              
              // district : response[0]?.district
            });
            const month = (new Date(Date.parse(this.candidateDetailList[0]?.joiningMonth +" 1, 2012")).getMonth()+1 < 10)?
              "0"+( new Date(Date.parse(this.candidateDetailList[0]?.joiningMonth +" 1, 2012")).getMonth()+1):
             new Date(Date.parse(this.candidateDetailList[0]?.joiningMonth +" 1, 2012")).getMonth()+1
          
            this.newRegCourseDetailsformGroup.patchValue({
              courseName: this.candidateDetailList[0]?.courseName,
              collegeName: this.candidateDetailList[0]?.nursingCollage,
              examBody: this.candidateDetailList[0]?.examBody,
              joinDate: this.candidateDetailList[0]?.joiningYear+"-" +month+ "-01",
              rollNum: this.candidateDetailList[0]?.finalYearRollNo,
              passDate: this.candidateDetailList[0]?.passingYear+"-" +month+ "-01",
            });
            
            console.log(this.newRegCourseDetailsformGroup.value.joinDate)
          }
         

          /*     this.listOfFiles =  */
        }
      );
  }

  newRegCertDetailsformGroupSubmit(value: any) {
    console.log(value)
    this.submitted = true;
    if (this.newRegCertDetailsformGroup.valid) {
      this.candidateDetails = false;
    }

  }
  onNewRegCourseDetailsformSubmit(value: any) {
    this.submitted = true;
    if (this.newRegCourseDetailsformGroup.valid) {

      console.log(this.newRegCertDetailsformGroup.value)
      console.log(value)

      const joinDate = new Date(this.newRegCourseDetailsformGroup.get('joinDate')?.value);

      const passDate = new Date(this.newRegCourseDetailsformGroup.get('passDate')?.value);
      const jMonth = joinDate.getMonth();
      const pMonth = passDate.getMonth();
      const joinYear = joinDate.getFullYear();
      const passYear = joinDate.getFullYear();
  
      const joinMonth = this.months[jMonth];
      const passMonth = this.months[pMonth];
      console.log('hh',joinMonth, passMonth)
      this.urlList  = this.updatedUrlList ? this.updatedUrlList : [...this.docsUrl, ...this.urlData]
      const updateStudentBody =
      {
        "date": this.datePipe.transform(new Date(), "yyyy-MM-dd")?.toString(),
        "candidatePic": "arun.jpg",
        "joiningYear": joinYear.toString(),
        "fathersName": this.newRegCertDetailsformGroup.value.fatherName,
        "gender": this.newRegCertDetailsformGroup.value.gender,
        "finalYearRollNo": value.rollNum,
        "examBody": value.examBody,
        "joiningMonth": joinMonth,
        "passingMonth": passMonth,
        "email": this.newRegCertDetailsformGroup.value.email,
        "paymentStatus": "SUCCESS",
        "feeReciptNo": "12345678",
        "aadhaarNo": this.newRegCertDetailsformGroup.value.adhr,
        "dateOfBirth":this.datePipe.transform(this.newRegCertDetailsformGroup.value.dob, "yyyy-MM-dd")?.toString() ,
        "barCode": "123457",
        "nursingCollage": value.collegeName,
        "passingYear": passYear.toString(),
        "courseName": value.courseName,
        "phoneNumber": this.newRegCertDetailsformGroup.value.mobNumber,
        "registrationType": this.stateData.claimType,
        "council": this.stateData.councilName,
        "mothersName": this.newRegCertDetailsformGroup.value.motherName,
        "name": this.newRegCertDetailsformGroup.value.applicantName,
        "docproof": this.urlList
      }
     console.log('updateStudentBody',updateStudentBody)
      this.baseService.updateStudent$(this.osid, updateStudentBody)
       .pipe(
         mergeMap((resp: any) => {
          const makeClaimbody =
          {
            entityName: "StudentFromUP",
            entityId: this.osid,
            name: "studentVerification",
            propertiesOSID: {
                studentUPVerification: [
                  this.osid
                ]
            }
        }
           return this.baseService.makeClaim$(this.osid,makeClaimbody);
         }
         ))  
         .subscribe(
           (response) => {
             console.log(response);
   
           },
         )
    }
  }

  navigateToUrl(item:any){
    window.open(item, "_blank");
  }


  onFileChanged(event?: any) {
    for (let i = 0; i <= event.target.files.length - 1; i++) {
      let selectedFile = event.target.files[i];

      if (this.listOfFiles.indexOf(selectedFile.name) === -1) {
        this.fileList.push(selectedFile);
        // this.listOfFiles.push(selectedFile.name);
      
      }
    }
    this.uploadFiles();
    
  }

  uploadFiles(){
  
     const formData = new FormData();
    for (var i = 0; i < this.fileList.length; i++) { 
      console.log(this.fileList[i])
      formData.append("files", this.fileList[i]);
    }  
    this.baseService.uploadFiles$(this.osid, formData).subscribe((data)=>{
      console.log(data)
      this.docsUrl = data.result;
      console.log('docsUrl',this.docsUrl)
     const uploadObj = this.docsUrl.map(url => {
        const parts = url.split('=');
        const fileNameWithQueryParams = parts[1];
        const fileName = fileNameWithQueryParams.split('/').pop();
        const extractLastPart = fileName?.split('_').pop(); 
        const getuploadObject = {
          name:extractLastPart,
          url:url
        } 
        return getuploadObject;         
      });
     console.log('uO',uploadObj)
     this.listOfFiles.push(...uploadObj)
     console.log('this.listOfFiles',this.listOfFiles)
    })
    
  }

  onCourseFileChanged(event?: any) {
    console.log(event);
    for (let i = 0; i <= event.target.files.length - 1; i++) {
      let selectedFile = event.target.files[i];

      if (this.listOfCourseFiles.indexOf(selectedFile.name) === -1) {
        this.courseFileList.push(selectedFile);
        this.listOfCourseFiles.push(selectedFile.name.concat(this.formatBytes(selectedFile.size)));
      }
    }
  }

  removeSelectedFile(index: any) {
    // Delete the item from fileNames list
    this.listOfFiles.splice(index, 1);
    this.updatedUrlList = this.listOfFiles.map(item=> item.url)
    console.log(this.updatedUrlList)
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

  removeSelectedCourseFile(index: any) {
    // Delete the item from fileNames list
    this.listOfCourseFiles.splice(index, 1);
    // delete file from FileList
    this.courseFileList.splice(index, 1);
  }
  selectLink(link: string) {
    this.selectedLink = link;
  }

  showInfo(option: any) {
    this.selectLink(option);
    console.log(option)
    switch (option) {
      case 'Payment Details':
        this.paymentDetails = !this.paymentDetails
        break;
      case 'Candidate Details':
        this.candidateDetails = true;
        this.paymentDetails = false;
        break;
      case 'Course Details':
        this.candidateDetails = false;
        this.paymentDetails = false;
        break;
      default:

        return '';
    }
    return;
  }

  onReset() {
    console.log("onReset")
    this.submitted = false;
    this.newRegCertDetailsformGroup.reset();
    this.listOfFiles = [];
  }

  navToPreviousPage() {
    console.log("hhh")
    this.location.back()
  }
  getStatusColorClass(status: string): string {
    switch (status) {
      case 'OPEN':
        return 'open';
      case 'CLOSED':
        return 'closed';
      case 'REJECTED':
        return 'rejected';
      default:
        return '';
    }
  }
}
