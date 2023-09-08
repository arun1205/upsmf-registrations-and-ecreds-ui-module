import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TableColumn, ClaimsTableData } from '../../../../interfaces/interfaces';

import { BaseServiceService } from 'src/app/services/base-service.service';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';

@Component({
  selector: 'app-manage-claims',
  templateUrl: './manage-claims.component.html',
  styleUrls: ['./manage-claims.component.scss']
})
export class ManageClaimsComponent {
  claims: ClaimsTableData[] = [];
  pendingClaims: ClaimsTableData[] = [];
  approvedClaims: ClaimsTableData[] = [];
  rejectedClaims: ClaimsTableData[] = [];
  stateData: any;

  claimsTableColumns: TableColumn[] = [];
  pendingClaimsTableColumns: TableColumn[] = [];
  approvedClaimsTableColumns: TableColumn[] = [];
  rejectedClaimsTableColumns: TableColumn[] = [];
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  isDataLoading: boolean = false;
  constructor(
    private router: Router,
    private baseService: BaseServiceService  ) { 
      this.stateData = this.router?.getCurrentNavigation()?.extras.state;
      console.log("stateData:",this.stateData)

    }

  ngOnInit(): void {
    this.initializeColumns();
    console.log(this.claimsTableColumns)
    this.getclaims();
    console.log(this.claims)
  }

  initializeColumns(): void {
    this.pendingClaimsTableColumns = [
      {
        columnDef: 'id',
        header: 'Claim ID',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['id']}`
      },
      {
        columnDef: 'claimType',
        header: 'Claim Type',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['entity']}`
      },
      {
        columnDef: 'createdAt',
        header: 'Claim Date',
        isSortable: true,
        cell: (element: Record<string, any>) => {
          const timestamp = element['createdAt'];
          const date = new Date(timestamp);
          const month = this.monthNames[date.getMonth()];
          const day = date.getDate();
          const year = date.getFullYear();
          return `${month} ${day}, ${year}`;
        }
      },
      {
        columnDef: 'isLink',
        header: 'Status',
        isSortable: false,
        isLink: true,
        cell: (element: Record<string, any>) => `Submitted`
      },
      {
        columnDef: 'viewClaim',
        header: '',
        isSortable: false,
        isLink: true,
        cell: (element: Record<string, any>) => `View Claim`
      }

    ];
    this.approvedClaimsTableColumns = [
      {
        columnDef: 'id',
        header: 'Claim ID',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['id']}`
      },
      {
        columnDef: 'claimType',
        header: 'Claim Type',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['entity']}`
      },
      {
        columnDef: 'createdAt',
        header: 'Claim Date',
        isSortable: true,
        cell: (element: Record<string, any>) => {
          const timestamp = element['createdAt'];
          const date = new Date(timestamp);
          const month = this.monthNames[date.getMonth()];
          const day = date.getDate();
          const year = date.getFullYear();
          return `${month} ${day}, ${year}`;
        }
      },
      {
        columnDef: 'updatedAt',
        header: 'Approved Date',
        isSortable: true,
        cell: (element: Record<string, any>) => {
          const timestamp = element['createdAt'];
          const date = new Date(timestamp);
          const month = this.monthNames[date.getMonth()];
          const day = date.getDate();
          const year = date.getFullYear();
          return `${month} ${day}, ${year}`;
        }
      },
      {
        columnDef: 'viewClaims',
        header: '',
        isSortable: false,
        isLink: true,
        cell: (element: Record<string, any>) => `View Claim`
      }

    ];

    this.rejectedClaimsTableColumns = [
      {
        columnDef: 'id',
        header: 'Claim ID',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['id']}`
      },
      {
        columnDef: 'claimType',
        header: 'Claim Type',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['entity']}`
      },
      {
        columnDef: 'createdAt',
        header: 'Claim Date',
        isSortable: true,
        cell: (element: Record<string, any>) => {
          const timestamp = element['createdAt'];
          const date = new Date(timestamp);
          const month = this.monthNames[date.getMonth()];
          const day = date.getDate();
          const year = date.getFullYear();
          return `${month} ${day}, ${year}`;
        }
      },
      {
        columnDef: 'updatedAt',
        header: 'Rejected Date',
        isSortable: true,
        cell: (element: Record<string, any>) => {
          const timestamp = element['createdAt'];
          const date = new Date(timestamp);
          const month = this.monthNames[date.getMonth()];
          const day = date.getDate();
          const year = date.getFullYear();
          return `${month} ${day}, ${year}`;
        }
      },
      {
        columnDef: 'notes',
        header: 'Reason for Rejection',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['notes']}`
      },
      {
        columnDef: 'isLink',
        header: '',
        isSortable: false,
        isLink: true,
        cell: (element: Record<string, any>) => `View Claim`
      }

    ];
  }

  getclaims() {
    this.isDataLoading = true;
   this.baseService.getClaims$().subscribe(
      (res) =>{
        this.claims = res.responseData
        console.log('this.claims', res);
        this.pendingClaims = this.claims.filter(claim => claim['status'] === 'OPEN');
        this.approvedClaims = this.claims.filter(claim => claim['status'] === 'APPROVED');
        this.rejectedClaims = this.claims.filter(claim => claim['status']==='REJECTED');
        console.log('pendingClaims', this.pendingClaims)
        this.isDataLoading = false;

      }, 
    ) 
  }

  
  onClickItem(value: any) {
    console.log("body",value)
    let id = parseInt(value?.id)
    //this.router.navigate(['/:'+id], {state: {data: e}});
    if(value.entity==="StudentFromUP" ){
      this.router.navigate(['/claims', value.id], { state: { body: value } });
      // this.router.navigate(['/claims/gdfrgn', e.id], { state: { data: e } });


      }
      else if(value.entity==="StudentOutsideUP"){
        this.router.navigate(['/claims', value.id], { state: { body: value } });
      }
    else if(value.entity==="StudentForeignVerification"){
      this.router.navigate(['/claims/foreign-goodstanding', value.id], { state: { body:value } });
    }
    else{
      this.router.navigate(['/claims/foreign-goodstanding', value.id], { state: { body:value } });

    }
  
  }
}


