import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { BaseServiceService } from '../../../../services/base-service.service';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { mergeMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/modules/shared/components/dialog-box/dialog-box.component';
import { ConfigService } from 'src/app/modules/shared';
import { HttpService } from 'src/app/core/services/http-service/http.service';

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
  listOfCourseFiles: any[] = [];
  courseFileList: File[] = [];

  docsUrl:any[]=[];
  urlData:any[]=[];
  convertUrlList:string;
  urlList:any;
  updatedUrlList:any;
  userRole:any;
  userEmail:any;
  urlDataResponse:string;
  entity:string;
  osid: string;
  stateData: any;
  customData: any;
  type: string;
  endPointUrl:any;
  docsResponseUrl:string;
  paymentDetails: boolean = false;
  selectedLink: string = 'Candidate Details';

  profQualificationArray = ['ANM', 'Midwife', 'HW', 'Nurse', 'Bsc Nursing'];

  activity: Observable<any>;

  constructor(private formBuilder: FormBuilder, private baseService: BaseServiceService,
    private router: Router,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private configService: ConfigService,
    private http: HttpService,
  ) { 
    this.userEmail = this.baseService.getUserRole()[0]
   console.log(this.userEmail)
    this.stateData = this.router?.getCurrentNavigation()?.extras.state;
    console.log("stateData:",this.stateData)
  }

  ngOnInit() {
    this.initForm();
  }

  getCandidatePersonalDetails() {
    console.log("getting getCandidatePersonalDetails")
    this.osid=this.stateData?.body?.id
    this.entity= this.stateData?.body?.entity
    console.log("entity",this.entity)
    if(this.entity==="StudentGoodstanding"){
      this.baseService.getCandidatePersonalDetailsRegulator$(this.osid)
      .subscribe(
        (response: any) => {
          console.log("data",response)
          const candidateDetailList=JSON.parse(response.responseData.claim.propertyData)
          console.log("...",candidateDetailList)
          this.urlDataResponse = candidateDetailList.docproof;
          if(!!this.urlDataResponse){
            this.urlData =  this.urlDataResponse?.split(",").filter(url => url.trim() !== "");
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
          }
          this.goodStandingForeignVerificationformGroup.patchValue({
            maidenName:candidateDetailList.name,
            email: candidateDetailList.email,
            mobNumber: candidateDetailList.phoneNumber,
            applicantName: candidateDetailList.name,
            adhr: candidateDetailList.aadhaarNo,
            motherName: candidateDetailList.mothersName,
            fatherName: candidateDetailList.fathersName, 
            dob: candidateDetailList.dob,
            gender: candidateDetailList.gender,
            al1: candidateDetailList.address,
            al2: candidateDetailList.address,
            state: candidateDetailList.state,
            pin: candidateDetailList.pincode,
            district: candidateDetailList.district,
            country: candidateDetailList.country,
            placeOfWork:candidateDetailList.workPlace,
            tcName:candidateDetailList.trainingCenter,
            regnNum:candidateDetailList.registrationNumber,
          });
        });
    }
    
    this.baseService.getCandidatePersonalDetailsGoodstanding$()
      .subscribe(
        (response: any) => {
          this.candidateDetailList = response.responseData
          console.log("det",this.candidateDetailList[0])
          this.osid = this.candidateDetailList[0].osid;
          this.urlDataResponse = this.candidateDetailList[0].docproof;
          if(!!this.urlDataResponse){
            this.urlData =  this.urlDataResponse?.split(",").filter(url => url.trim() !== "");
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
          }
          
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
            tcName:this.candidateDetailList[0]?.trainingCenter,
            proQual:this.candidateDetailList[0]?.professionalQualification
            // docproof:this.candidateDetailList[0]?.docproof

            
          });
         

        }
      );
  }
  getCandidatePersonalDetailsForeign() {
    console.log("getting getCandidatePersonalDetails")
    console.log("getting getCandidatePersonalDetails")
    this.osid=this.stateData?.body?.id
    this.entity= this.stateData?.body?.entity
    console.log("entity",this.entity)
    if(this.entity==="studentForeignVerification"){
      this.baseService.getCandidatePersonalDetailsRegulator$(this.osid)
      .subscribe(
        (response: any) => {
          console.log("data",response)
          const candidateDetailList=JSON.parse(response.responseData.claim.propertyData)
          console.log("...",candidateDetailList)
          this.urlDataResponse = candidateDetailList.docproof;
          if(!!this.urlDataResponse){
            this.urlData =  this.urlDataResponse?.split(",").filter(url => url.trim() !== "");
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
          }
          this.goodStandingForeignVerificationformGroup.patchValue({
            maidenName:candidateDetailList.name,
            email: candidateDetailList.email,
            mobNumber: candidateDetailList.phoneNumber,
            applicantName: candidateDetailList.name,
            adhr: candidateDetailList.aadhaarNo,
            motherName: candidateDetailList.mothersName,
            fatherName: candidateDetailList.fathersName, 
            dob: candidateDetailList.dob,
            gender: candidateDetailList.gender,
            al1: candidateDetailList.address,
            al2: candidateDetailList.address,
            state: candidateDetailList.state,
            pin: candidateDetailList.pincode,
            district: candidateDetailList.district,
            country: candidateDetailList.country,
            placeOfWork:candidateDetailList.workPlace,
            tcName:candidateDetailList.trainingCenter,
            regnNum:candidateDetailList.registrationNumber,
          });
        });
    }
    

   else{

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
    if(this.userRole==="Regulator"){
      {{(this.stateData.body.entity==="studentForeignVerification"?  this.getCandidatePersonalDetailsForeign() : this.getCandidatePersonalDetails()     )}} 
    }
    else{
      {{ (this.stateData?.customData?.type === 'ForeignVerifyReq') ?  this.getCandidatePersonalDetailsForeign() : this.getCandidatePersonalDetails()     }}

    }
    // if(this.stateData.customData.type === 'goodStandingCert'){
    //   this.getCandidatePersonalDetails();

    // }
    // else{
    //   this.getCandidatePersonalDetailsForeign();
    // }
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
    this.endPointUrl = this.configService.urlConFig.URLS.STUDENT.GET_STUDENT_DETAILS

    this.baseService.uploadFiles$(this.osid, formData, this.endPointUrl).subscribe((data)=>{
      console.log(data)
      this.docsResponseUrl = data.result;
      this.docsUrl = this.docsResponseUrl.split(',').filter(url=>url.trim() !== "")
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

  // showInfo(option: any) {
  //   console.log(option)
  //   option === "Candidate Details" ? this.candidateDetails = true : this.candidateDetails = false;
  // }

  // onFileChanged(event?: any) {
  //   console.log(event);
  //   for (let i = 0; i <= event.target.files.length - 1; i++) {
  //     let selectedFile = event.target.files[i];

  //     if (this.listOfFiles.indexOf(selectedFile.name) === -1) {
  //       this.fileList.push(selectedFile);
  //       this.listOfFiles.push(selectedFile.name.concat(this.formatBytes(selectedFile.size)));
  //     }
  //   }
  // }

  // removeSelectedFile(index: any) {
  //   // Delete the item from fileNames list
  //   this.listOfFiles.splice(index, 1);
  //   // delete file from FileList
  //   this.fileList.splice(index, 1);
  // }

  // formatBytes(bytes: any, decimals = 2) {
  //   if (!+bytes) return '0 Bytes'
  //   const k = 1024
  //   const dm = decimals < 0 ? 0 : decimals
  //   const sizes = ['Bytes', 'KB', 'MB']
  //   const i = Math.floor(Math.log(bytes) / Math.log(k))
  //   return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  // }

  onGoodStandingForeignVerificationformSubmit(value: any) {
    const osid=this.stateData?.body?.id
    console.log("id....",osid)
    
    if(this.entity==="studentForeignVerification"){
      const approveBody={
        action:"GRANT_CLAIM",
        note:"Registration Certificate"
      }
      this.baseService.approveClaim$(osid,approveBody)
      .subscribe((response)=>{
        console.log(response)
      })

    }
    else if(this.entity==="StudentGoodstanding"){
      const approveBody={
        action:"GRANT_CLAIM",
        note:"Registration Certificate"
      }
      this.baseService.approveClaim$(osid,approveBody)
      .subscribe((response)=>{
        console.log(response)
      })

    }

    else if ((this.stateData.customData.type === 'goodStandingCert')) {
      this.urlList  = this.updatedUrlList ? this.updatedUrlList : [...this.docsUrl, ...this.urlData]
        //convert to string with commaa separated
        this.convertUrlList = this.urlList.join(',')
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
        "docproof": this.convertUrlList,
        "candidatePic": "pic1.jpg",
        "marriedName":this.goodStandingForeignVerificationformGroup.value.mrdName,
        "maidenName":this.goodStandingForeignVerificationformGroup.value.maidenName,
        "professionalQualification":this.goodStandingForeignVerificationformGroup.value.proQual,
        "registrationNumber":this.goodStandingForeignVerificationformGroup.value.regnNum,
        "paymentStatus": "SUCCESS",
        

      
      }
      
      console.log("goodBody",updateStudentGoodstandingBody)
      if(this.osid){
        const paymentData={
          osId : this.osid,
          origin: this.stateData?.origin,
          endPointUrl:this.endPointUrl

        }
        localStorage.setItem('payData', JSON.stringify(paymentData))
        this.baseService.updateStudentGoodStanding$(this.osid, updateStudentGoodstandingBody)
       .subscribe(
         (response) => {
           console.log(response);
          this.paymentDetails= true;
          
 
         },
       )
      }
      else{
        this.baseService.postStudentGoodStanding$( updateStudentGoodstandingBody)
      //  .pipe(
      //    mergeMap((resp: any) => {
      //     const makeClaimbody =
      //     {
      //       entityName: "StudentGoodstanding",
      //       entityId: this.osid,
      //       name: "studentGoodstandingVerification",
      //       propertiesOSID: {
      //         studentGoodstandingVerification: [
      //             this.osid
      //           ]
      //       }
      //   }
      //      return this.baseService.makeClaim$(this.osid,makeClaimbody);
      //    }
      //    ))  
         .subscribe(
           (response) => {
             console.log("good resp",response);
            //  if(response.result['StudentGoodstanding']){
            //   this.paymentDetails=true;
            //   this.osid=response?.result?.StudentGoodstanding
            //  }
             
   
           },
         )

      }
      
    }
    else {
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
        "docproof": this.convertUrlList,
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
    if(this.entity==="studentForeignVerification"){
      let dialogRef = this.dialog.open(DialogBoxComponent, {
         disableClose: true ,
        width: '40rem',
        height:'25rem'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        const reason = result;

        console.log("res",reason);
        const approveBody={
          action:"REJECT_CLAIM",
          note:reason
        }
        const osid=this.stateData?.id
        this.baseService.approveClaim$(osid,approveBody)
        .subscribe((response)=>{
          console.log(response)
        })
  
      });
      
     
    }
    if(this.entity==="StudentGoodstanding"){
      let dialogRef = this.dialog.open(DialogBoxComponent, {
         disableClose: true ,
        width: '40rem',
        height:'25rem'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        const reason = result;

        console.log("res",reason);
        const approveBody={
          action:"REJECT_CLAIM",
          note:reason
        }
        const osid=this.stateData?.id
        this.baseService.approveClaim$(osid,approveBody)
        .subscribe((response)=>{
          console.log(response)
        })
  
      });
      
     
    }
    console.log("onReset")
    this.submitted = false;
    this.goodStandingForeignVerificationformGroup.reset();
    this.listOfFiles = [];
  }
  showInfo(option: any) {
    this.selectLink(option);
    console.log(option)
    switch (option) {
      case 'Payment Details':
        this.paymentDetails = !this.paymentDetails;
        this.candidateDetails = false;

        break;
      case 'Candidate Details':
        this.candidateDetails = true;
        this.paymentDetails = false;
        break;
      default:

        return '';
    }
    return;
  }
  handlePayment(){
    const postData = {
      endpoint: "https://eazypayuat.icicibank.com/EazyPG",
      returnUrl: "https://payment.uphrh.in/api/v1/user/payment",
      paymode: "9",
      secret: "",
      merchantId: "600547",
      mandatoryFields: {
        referenceNo: this.baseService.generate_uuidv4(),
        submerchantId: "45",
        transactionAmount: "1000",
        invoiceId: "x1",
        invoiceDate: "x",
        invoiceTime: "x",
        merchantId: "x",
        payerType: "registration",
        payerId: 'instituteId',
        transactionId: "x",
        transactionDate: "x",
        transactionTime: "x",
        transactionStatus: "x",
        refundId: "x",
        refundDate: "x",
        refundTime: "x",
        refundStatus: "x",
      },

      optionalFields: "registration",

    };
    this.http.getPaymentUrl(postData).subscribe((data)=>{
      console.log(data)
      if(data){
        window.open(data?.redirectUrl, '_blank')

      }
    }
    )
  }
}
