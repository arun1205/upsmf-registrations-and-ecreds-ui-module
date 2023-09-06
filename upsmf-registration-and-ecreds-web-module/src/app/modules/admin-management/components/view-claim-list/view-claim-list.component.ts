import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClaimsTableData, TableColumn } from 'src/app/interfaces';
import { BaseServiceService } from 'src/app/services/base-service.service';

@Component({
  selector: 'app-view-claim-list',
  templateUrl: './view-claim-list.component.html',
  styleUrls: ['./view-claim-list.component.scss']
})
export class ViewClaimListComponent {
  claims: ClaimsTableData[] = [];
  pendingClaims: ClaimsTableData[] = [];
  approvedClaims: ClaimsTableData[] = [];
  rejectedClaims: ClaimsTableData[] = [];

  claimsTableColumns: TableColumn[] = [];
  pendingClaimsTableColumns: TableColumn[] = [];
  approvedClaimsTableColumns: TableColumn[] = [];
  rejectedClaimsTableColumns: TableColumn[] = [];
  stateData: any;
  

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
    this.getclaimsAdmin();
    console.log(this.claims)
    // if(this.stateData?.type === "regnCertfromUP"){
    //   this.getclaimsAdmin;
    // }
    
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
        cell: (element: Record<string, any>) => `${element['createdAt']}`
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
        cell: (element: Record<string, any>) => `${element['createdAt']}`
      },
      {
        columnDef: 'updatedAt',
        header: 'Approved Date',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['updatedAt']}`
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
        cell: (element: Record<string, any>) => `${element['createdAt']}`
      },
      {
        columnDef: 'updatedAt',
        header: 'Rejected Date',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['updatedAt']}`
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
  getclaimsAdmin(){
      
    this.isDataLoading = true;
   this.baseService.getRegistrationClaimsAdmin$().subscribe(
      (res) =>{
        this.claims = res.responseData.content
        console.log('this.claims', this.claims);
        
        if(this.stateData?.type==="regnCertfromUP"){
          this.pendingClaims = this.claims.filter(claim => (claim['status'] === 'OPEN')&&(claim['entity']==='StudentFromUP'));
          this.approvedClaims = this.claims.filter(claim => (claim['status'] === 'APPROVED')&&(claim['entity']==='StudentFromUP'));
          // this.rejectedClaims = this.claims.filter(claim => claim?.notes);
          this.rejectedClaims = this.claims.filter(claim => (claim['status'] === 'REJECTED')&&(claim['entity']==='StudentFromUP'));

          console.log('pendingClaims', this.pendingClaims)
          this.isDataLoading = false;
        }
        else if(this.stateData?.type==="regnCertoutsideUP"){
          this.pendingClaims = this.claims.filter(claim => (claim['status'] === 'OPEN')&&(claim['entity']==='StudentOutsideUP'));
          this.approvedClaims = this.claims.filter(claim => (claim['status'] === 'APPROVED')&&(claim['entity']==='StudentOutsideUP'));
          // this.rejectedClaims = this.claims.filter(claim => claim?.notes);
          this.rejectedClaims = this.claims.filter(claim => (claim['status'] === 'REJECTED')&&(claim['entity']==='StudentOutsideUP'));

          console.log('pendingClaims', this.pendingClaims)
          this.isDataLoading = false;

        }
        else if(this.stateData?.type==="ForeignVerifyReq"){
          // this.baseService.get
          this.pendingClaims = this.claims.filter(claim => (claim['status'] === 'OPEN')&&(claim['entity']==='studentForeignVerification'));
          this.approvedClaims = this.claims.filter(claim => (claim['status'] === 'APPROVED')&&(claim['entity']==='studentForeignVerification'));
          this.rejectedClaims = this.claims.filter(claim => (claim['status'] === 'REJECTED')&&(claim['entity']==='studentForeignVerification'))
          console.log('pendingClaims', this.pendingClaims)
          this.isDataLoading = false;
        }
        else if(this.stateData?.type==="goodStandingCert"){
          // this.baseService.get
          this.pendingClaims = this.claims.filter(claim => (claim['status'] === 'OPEN')&&(claim['entity']==='StudentGoodstanding'));
          this.approvedClaims = this.claims.filter(claim => (claim['status'] === 'APPROVED')&&(claim['entity']==='StudentGoodstanding'));
          this.rejectedClaims = this.claims.filter(claim => (claim['status'] === 'REJECTED')&&(claim['entity']==='StudentGoodstanding'));
          console.log('pendingClaims', this.pendingClaims)
          this.isDataLoading = false;
        }

      }, 
    ) 

  }

  

  onClickItem(value: any) {
    console.log("body",value)
    let id = parseInt(value?.id)
    //this.router.navigate(['/:'+id], {state: {data: e}});
    if(this.stateData?.type==="regnCertfromUP" ){
      this.router.navigate(['/claims', value.id], { state: { body: value } });
      // this.router.navigate(['/claims/gdfrgn', e.id], { state: { data: e } });


      }
      else if(this.stateData?.type==="regnCertoutsideUP"){
        this.router.navigate(['/claims', value.id], { state: { body: value } });
      }
    else if(this.stateData?.type==="ForeignVerifyReq"){
      this.router.navigate(['/claims/foreign-goodstanding', value.id], { state: { body:value } });
    }
    else{
      this.router.navigate(['/claims/foreign-goodstanding', value.id], { state: { body:value } });

    }
    // this.router.navigate(['/claims', e.id], { state: { data: e } });
    // this.router.navigate(['/grievance', e.id]);
  }
}
