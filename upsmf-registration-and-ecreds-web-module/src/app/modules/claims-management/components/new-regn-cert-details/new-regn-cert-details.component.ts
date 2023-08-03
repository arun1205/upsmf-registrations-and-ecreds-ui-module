import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-regn-cert-details',
  templateUrl: './new-regn-cert-details.component.html',
  styleUrls: ['./new-regn-cert-details.component.scss']
})
export class NewRegnCertDetailsComponent {
  @ViewChild('attachments') attachment: any;
  
  links=['Candidate Details','Course Details','Payment Details']


  public newRegCertDetailsformGroup: FormGroup;
  submitted = false;

  candidateDetails:boolean = true;
  paymentDetails:boolean = false;

  genderTypesArray =['Male' , 'Female', 'Others']

  listOfFiles: any[] = [];
  fileList: File[] = [];

  listOfCourseFiles: any[] = [];
  courseFileList: File[] = [];

  constructor(private formBuilder: FormBuilder,
     ) { }

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
      gender: new FormControl('', [
        Validators.required]),
      email: new FormControl('arun@awe.com', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      mobNumber: new FormControl('8989786756', [
        Validators.required,
        Validators.pattern("^(0|91)?[6-9][0-9]{9}$")]),
      });
    }


    onFileChanged(event?: any){
      console.log(event);
      for (let i = 0; i <= event.target.files.length - 1; i++) {
        let selectedFile = event.target.files[i];
     
        if (this.listOfFiles.indexOf(selectedFile.name) === -1) {
          this.fileList.push(selectedFile);
          this.listOfFiles.push(selectedFile.name.concat(this.formatBytes(selectedFile.size)));
        }
      }
    }

    onCourseFileChanged(event?: any){
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

  showInfo(option : any){
    console.log(option)
    option == "Candidate Details" ? this.candidateDetails = true : this.candidateDetails = false


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
}
