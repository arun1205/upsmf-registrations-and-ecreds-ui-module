import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClaimDashBoardData, ClaimsTableData, DashBoardData, TableColumn } from 'src/app/interfaces';
import { BaseServiceService } from 'src/app/services/base-service.service';
import { BreadcrumbItem } from '../../shared';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent {
  isDataLoading: boolean = false;
  
  claims: ClaimsTableData[]=[];
  claimsTableColumns: TableColumn[] = [];

  adminTableColumns: TableColumn[] = [];
  adminData:DashBoardData []=[];
  adminClaimData:ClaimDashBoardData[]=[];
  adminClaimTableColumns: TableColumn[]=[];
  isFilter:boolean = false;
  startDate:string= '';
  endDate :string = '';
  entityTypeData:string = '';
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Workspace', url: '/super-admin' },
    { label: 'Dashboard', url: '/super-admin/dashboard' },
  ];
  constructor(
    private router: Router,
    private baseService: BaseServiceService,
    private datePipe: DatePipe  ) { 
      

    }


  ngOnInit(): void {
    this.initializeColumns();
    // console.log(this.adminTableColumns)
    this.getClaims();
    console.log("adata",this.adminData)
  }

  initializeColumns(): void {
    this.adminClaimTableColumns = [
      {
        columnDef: 'no',
        header: '#',
        isSortable: false,
        cell: (element: Record<string, any>) => `${element['no']}`
      },
      {
        columnDef: 'name',
        header: 'Applicant name',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['name']}`
      },
      {
        columnDef: 'type',
        header: 'Claim type',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['type']}`
      },
      {
        columnDef: 'id',
        header: 'Claim Id',
        isSortable: false,
        cell: (element: Record<string, any>) => `${element['id']}`
      },
      {
        columnDef: 'claimdate',
        header: 'Claim date',
        isSortable: false,
        cell: (element: Record<string, any>) => `${element['claimdate']}`
      },
      {
        columnDef: 'prdate',
        header: 'Approval/Rejection date',
        isSortable: false,
        cell: (element: Record<string, any>) => `${element['prdate']}`
      },
      {
        columnDef: 'issuedate',
        header: 'Credential issuance date',
        isSortable: false,
        cell: (element: Record<string, any>) => `${element['issuedate']}`
      },
      {
        columnDef: 'status',
        header: 'Claim Status',
        isSortable: false,
        cell: (element: Record<string, any>) => `${element['status']}`
      },


    ];
   
    this.adminTableColumns = [
      {
        columnDef: `no`,
        header: `#`,
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['no']}`
      },
    {
      columnDef: 'type',
      header: 'Credential Type',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['type']}`

      
    },
    {
      columnDef: 'totalclaim',
      header: 'Total Claim',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['totalclaim']}`
    },
    {
      columnDef: 'pending',
      header: 'Pending',
      isSortable: false,
      cell: (element: Record<string, any>) => `${element['pending']}`
    },
    {
      columnDef: 'rejected',
      header: 'Rejected',
      isSortable: false,
      cell: (element: Record<string, any>) => `${element['rejected']}`
    },
    
    {
      columnDef: 'issue',
      header: 'Credential Issued',
      isSortable: false,
      cell: (element: Record<string, any>) => `${element['issue']}`
    },
    // {
    //   columnDef: 'claimpending',
    //   header: 'Claim Pending >15 days',
    //   isSortable: false,
    //   // isMenuOption: true,
    //   cell: (element: Record<string, any>) => `${element['claimpending']}`
    // }

  ];
  
  }

  getClaims() {
    this.isDataLoading = true;
    let requestBody = {
      "startDate": this.startDate,
      "endDate": this.endDate,
      "entity": this.entityTypeData
    }
    this.baseService.getAllClaims$(requestBody).subscribe(
      (response)=>{
      this.claims=response.claimList
      
      console.log("res",this.claims.filter(claim => claim['credType']?.toLowerCase() === 'degree'))
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      
      console.log(formattedDate);
      const fifteenDaysAgo = new Date();
      fifteenDaysAgo.setDate(currentDate.getDate() - 15);
      const day=this.claims.filter(claim=> claim['createdAt'])
      const formattedDate2 = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      
      console.log("ad",fifteenDaysAgo.toString())
      console.log(day)
      this.adminData = [
        {
          no : "1",
          type: "All Claim",
          totalclaim:this.claims.length.toString(),
          pending: this.claims.filter(claim => claim['status'] === 'OPEN').length.toString(),
          rejected:this.claims.filter(claim => claim['status'] === 'REJECTED').length.toString(),
          issue:this.claims.filter(claim => claim['status'] === 'APPROVED').length.toString(),
          // approval: "2",
          claimpending: "12",
        },
        // {
        //   no : "2",
        //   type: "UP - Registration Diploma",
        //   totalclaim:this.claims.filter(claim => claim['credType']?.toLowerCase() === 'diploma').length.toString(),
        //   pending: this.claims.filter(claim => claim['credType'] === 'DIPLOMA' &&  claim['status'] === 'OPEN').length.toString(),
        //   rejected:this.claims.filter(claim =>claim['credType'] === 'DIPLOMA' && claim['status'] === 'REJECTED').length.toString(),
        //   issue:this.claims.filter(claim =>claim['credType'] === 'DIPLOMA' && claim['status'] === 'APPROVED').length.toString(),
        //   // approval: "2",
        //   claimpending: "34",
        // },
        // {
        //   no : "3",
        //   type: "UP - Registration Degree",
        //   totalclaim:this.claims.filter(claim => claim['credType']?.toLowerCase() === 'degree').length.toString(),
        //   pending: this.claims.filter(claim => claim['credType']?.toLowerCase() === 'degree'  && claim['status']==='OPEN').length.toString(),
        //   rejected:this.claims.filter(claim =>claim['credType']?.toLowerCase() === 'degree' && claim['status'] === 'REJECTED').length.toString(),
        //   issue:this.claims.filter(claim =>claim['credType']?.toLowerCase() === 'degree' && claim['status'] === 'APPROVED').length.toString(),
        //   // approval: "2",
        //   claimpending: "34",
        // },
        {
          no : "2",
          type: " From UP - Registration ",
          totalclaim:this.claims.filter(claim => claim['entity']?.toLowerCase() === 'studentfromup').length.toString(),
          pending: this.claims.filter(claim => claim['entity']?.toLowerCase() === 'studentfromup'  && claim['status']==='OPEN').length.toString(),
          rejected:this.claims.filter(claim =>claim['entity']?.toLowerCase() === 'studentfromup' && claim['status'] === 'REJECTED').length.toString(),
          issue:this.claims.filter(claim =>claim['entity']?.toLowerCase() === 'studentfromup' && claim['status'] === 'APPROVED').length.toString(),
          // approval: "2",
          claimpending: "34",
        },
        {
          no : "3",
          type: "Non UP - Registration",
          totalclaim:this.claims.filter(claim => claim['entity'].toLowerCase() === 'studentoutsideup' ).length.toString(),
          pending: this.claims.filter(claim => claim['entity'].toLowerCase() === 'studentoutsideup'  && claim['status']==='OPEN').length.toString(),
          rejected:this.claims.filter(claim =>claim['entity'].toLowerCase() === 'studentoutsideup' && claim['status'] === 'REJECTED').length.toString(),
          issue:this.claims.filter(claim =>claim['entity'].toLowerCase() === 'studentoutsideup' && claim['status'] === 'APPROVED').length.toString(),
          // approval: "2",
          claimpending: "34",
        },
        {
          no : "4",
          type: "Foreign Verification Request",
          totalclaim:this.claims.filter(claim => claim['entity'].toLowerCase() === 'studentforeignverification' ).length.toString(),
          pending: this.claims.filter(claim => claim['entity'].toLowerCase() === 'studentforeignverification' && claim['status']==='OPEN').length.toString(),
          rejected:this.claims.filter(claim =>claim['entity'].toLowerCase() === 'studentforeignverification' && claim['status'] === 'REJECTED').length.toString(),
          issue:this.claims.filter(claim =>claim['entity'].toLowerCase() === 'studentforeignverification' && claim['status'] === 'APPROVED').length.toString(),
          // approval: "2",
          claimpending: "34",
        },
        {
          no : "5",
          type: "Other Certificate",
          totalclaim:this.claims.filter(claim => claim['entity'] === 'StudentGoodstanding' ).length.toString(),
          pending: this.claims.filter(claim => claim['entity'] === 'StudentGoodstanding' && claim['status']==='OPEN').length.toString(),
          rejected:this.claims.filter(claim =>claim['entity'] === 'StudentGoodstanding'&& claim['status'] === 'REJECTED').length.toString(),
          issue:this.claims.filter(claim =>claim['entity'] === 'StudentGoodstanding' && claim['status'] === 'APPROVED').length.toString(),
          // approval: "2",
          claimpending: "34",
        },
      ]

      },
    
      )
    setTimeout(() => {
      this.isDataLoading = false;
    }, 1000);
    this.adminClaimData=[
      {
        no:"1",
        name:"Devaprathap Nagendra",
        type:"Paramedical",
        id:"IVFT4567987",
        claimdate:"24-09-2001",
        prdate:"26-04-2001",
        status:"Pending payment"
      },
      {
        no:"1",
        name:"Devaprathap Nagendra",
        type:"Paramedical",
        id:"IVFT4567987",
        claimdate:"24-09-2001",
        prdate:"26-04-2001",
        status:"Pending payment"
      },
      {
        no:"1",
        name:"Devaprathap Nagendra",
        type:"Paramedical",
        id:"IVFT4567987",
        claimdate:"24-09-2001",
        prdate:"26-04-2001",
        status:"Pending payment"
      },
      {
        no:"1",
        name:"Devaprathap Nagendra",
        type:"Paramedical",
        id:"IVFT4567987",
        claimdate:"24-09-2001",
        prdate:"26-04-2001",
        status:"Pending payment"
      },
      {
        no:"1",
        name:"Devaprathap Nagendra",
        type:"Paramedical",
        id:"IVFT4567987",
        claimdate:"24-09-2001",
        prdate:"26-04-2001",
        status:"Pending payment"
      }
    ]
    
    }

    onClickItem(e: any) {
      console.log(e)
      //let id = parseInt(e?.id)
      //this.router.navigate(['/:'+id], {state: {data: e}});
      //this.router.navigate(['/claims', e.id], { state: { data: e } });
      // this.router.navigate(['/grievance', e.id]);
    }

    onClickApplyFilter(event:any){
     console.log(event)
     this.entityTypeData =event.entityType
     if(event.startDate && event.endDate){
      this.startDate =  moment(event.startDate).format('YYYY-MM-DD')
      this.endDate = moment(event.endDate).format('YYYY-MM-DD')
    }
    this.getClaims()
    }

    resetFilterValueData(e:any){
     this.startDate = '';
     this.endDate = '';
     this.entityTypeData = '';
     this.getClaims();
    }

    onEditData(e : any){
      console.log(e)
    }
    onToggleData(e : any){
      console.log(e)
    }
    onDeleteData(e : any){
      console.log(e)
    }


    

}
