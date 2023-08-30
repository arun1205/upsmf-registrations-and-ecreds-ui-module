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

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.form = this.formBuilder.group({
        reason: ''
      });
    }
    

   
      

      onSubmit() {
        const reason = this.form.get('reason')?.value;
      console.log('Reason:', reason);
      this.dialogRef.close(reason); 
          // this.dialogRef.close(this.);
          // console.log("value",this.reasonForm.controls['reason'].value)
        
      }

  // onNoClick(): void {
  //   this.dialogRef.close();
     
  // }
}
