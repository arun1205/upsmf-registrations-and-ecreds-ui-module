import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { BaseServiceService } from '../../../../services/base-service.service';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';

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

  profQualificationArray = ['ANM', 'Midwife', 'HW', 'Nurse', 'Bsc Nursing'];

  activity: Observable<any>;

  constructor(private formBuilder: FormBuilder, private baseService: BaseServiceService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  loadActivity() {
    this.activity = this.baseService.loadActivity$().pipe(
      tap((user) => {
        this.goodStandingForeignVerificationformGroup.patchValue({
          maidenName: user.activity,
          mrdName: user.type
        });
      }
      ));
     // this.goodStandingForeignVerificationformGroup.disable();
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
    this.loadActivity();
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
    this.submitted = true;
    if (this.goodStandingForeignVerificationformGroup.valid) {
      this.candidateDetails = false;
    }
    
  }

  onReset() {
    console.log("onReset")
    this.submitted = false;
    this.goodStandingForeignVerificationformGroup.reset();
    this.listOfFiles = [];
  }
}
