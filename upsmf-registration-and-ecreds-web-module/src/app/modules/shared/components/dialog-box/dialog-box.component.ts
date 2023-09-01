import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {
  public form : FormGroup;
  message: string;
  message1: string;
  file:string;
  base64Data:string;
  selectedFile: File | null = null;
  shouldShowFileUpload: boolean;




  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.message = data.message;
      this.message1 = data.message1;
      this.shouldShowFileUpload = data.shouldShowFileUpload;
      this.form = this.formBuilder.group({
        reason: ''
      });
    }
    onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        const reader = new FileReader();
    
        reader.onload = (e: any) => {
          // The result will be a base64 encoded string
          this.file = e.target.result;
          // console.log("64",this.file)
          this.base64Data = this.file.split(',')[1]; 
          // console.log("............",this.base64Data)
          
          
        };
    
        reader.readAsDataURL(this.selectedFile);
      }
    }

   
      

      onSubmit() {
        const reason = this.form.get('reason')?.value;
      console.log('Reason:', reason);
      const submissionData = {
        reason: reason,
        file: this.base64Data
      };
      this.dialogRef.close(submissionData); 
          // this.dialogRef.close(this.);
          // console.log("value",this.reasonForm.controls['reason'].value)
        
      }

  onNoClick(): void {
    this.dialogRef.close();
     
  }
}
export class DialogModel {
  constructor( public message: string,public message1: string) {
  }
}
