import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-common-filter',
  templateUrl: './common-filter.component.html',
  styleUrls: ['./common-filter.component.scss']
})
export class CommonFilterComponent implements OnInit {
  isFilter:boolean = false;
  filterForm:FormGroup;
  entityType:any[]=[
    {
      name:'UP - registration Degree',
      type:'StudentFromUP'
    },
    {
      name:'Non UP - Registration',
      type:'StudentOutsideUP'
    },
    {
      name:'Foreign Certificate',
      type:'StudentForeignVerification'
    },
    {
      name:'Other Certificate',
      type:'StudentGoodstanding'
    }
    // 'StudentFromUP','StudentOutsideUP','StudentGoodstanding','StudentForeignVerification'
  ]

  @Output() filteredvalue: EventEmitter<any> = new EventEmitter<any>();
  @Output() resetFilterValue: EventEmitter<any> = new EventEmitter<any>();

  constructor(){
    this.filterForm = new FormGroup({
      entityType: new FormControl('', Validators.required),
      startDate: new FormControl(''),
      endDate:new FormControl('')
    })

  }

  ngOnInit(): void {
    
  }

  toggleFilter(){
    this.isFilter= !this.isFilter
  }
  ApplyFilter(value:any){
    this.filteredvalue.emit(value)
    this.isFilter = !this.isFilter;
   console.log('clickValie',value)
  }

  resetFilter(){
    this.filterForm.reset();
    this.resetFilterValue.emit()
  }
  entitySelected(e:any){


  }
  

}

