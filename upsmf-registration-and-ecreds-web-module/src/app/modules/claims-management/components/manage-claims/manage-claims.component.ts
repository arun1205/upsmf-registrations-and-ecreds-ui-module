import { Component } from '@angular/core';
import { Router  } from '@angular/router';
import { TableColumn, ClaimsTableData } from '../../../../interfaces/interfaces';


@Component({
  selector: 'app-manage-claims',
  templateUrl: './manage-claims.component.html',
  styleUrls: ['./manage-claims.component.scss']
})
export class ManageClaimsComponent {
  claims: ClaimsTableData[] = [];
  pendingClaims:  ClaimsTableData[] = [];
  approvedClaims:  ClaimsTableData[] = [];
  rejectedClaims:  ClaimsTableData[] = [];

  claimsTableColumns: TableColumn[] = [];
  pendingClaimsTableColumns:  TableColumn[] = [];
  approvedClaimsTableColumns:  TableColumn[] = [];
  rejectedClaimsTableColumns : TableColumn[] = [];

  isDataLoading : boolean = false;
  constructor( 
    private router: Router ){}

  ngOnInit(): void {
    this.initializeColumns();
    console.log(this.claimsTableColumns)
    this.getclaims();
    console.log(this.claims)
  }

  initializeColumns(): void {
    this.pendingClaimsTableColumns = [
      {
        columnDef: 'claimId',
        header: 'Claim ID',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['claimId']}`
      },
      {
        columnDef: 'claimType',
        header: 'Claim Type',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['claimType']}`
      },
      {
        columnDef: 'isLink',
        header: '',
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
        columnDef: 'claimId',
        header: 'Claim ID',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['claimId']}`
      },
      {
        columnDef: 'claimType',
        header: 'Claim Type',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['claimType']}`
      },
      {
        columnDef: 'claimDate',
        header: 'Claim Date',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['claimDate']}`
      },
      {
        columnDef: 'approvedDate',
        header: 'Approved Date',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['approvedDate']}`
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
        columnDef: 'claimId',
        header: 'Claim ID',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['claimId']}`
      },
      {
        columnDef: 'claimType',
        header: 'Claim Type',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['claimType']}`
      },
      {
        columnDef: 'claimDate',
        header: 'Claim Date',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['claimDate']}`
      },
      {
        columnDef: 'rejectedDate',
        header: 'Rejected Date',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['rejectedDate']}`
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
    setTimeout(() => {
      this.isDataLoading = false;
    }, 2000);
    this.claims = [
      {
        claimId: "340",
        grievanceRaiser: 'Kalpana Shrivastav',
        claimType:'Institue',
        status:"Pending",
        claimDate: "23-06-2023",
        description: "This is a lorem ipsum description which is pretty much large enough to test a description.This is a lorem ipsum description which is pretty much large enough to test a description",
        attachedDocs:["Doc 1","Doc2"]
      },
      {
        claimId: "327",
        grievanceRaiser: 'Devpratap Nagendra',
        claimType:'Registration',
        status:"Approved",
        claimDate: "23-06-2023",
        approvedDate: "23-12-2023",
        description: "This is a lorem ipsum description which is pretty much large enough to test a description",
        attachedDocs:["Doc 1","Doc2"]
      },
      {
        claimId: "336",
        grievanceRaiser: 'Mani Charri',
        claimType:'Registration',
        status:"Approved",
        claimDate: "23-06-2023",
        approvedDate: "23-12-2023",
        description: "This is a lorem ipsum description which is pretty much large enough to test a description"
     
      },
      {
        claimId: "335",
        grievanceRaiser: 'Geethesh Misra',
        claimType:'Registration',
        status:"Rejected",
        claimDate: "23-06-2023",
        rejectedDate: "23-12-2023",
        description: "This is a lorem ipsum description which is pretty much large enough to test a description"
     
      },
      {
        claimId: "334",
        grievanceRaiser: 'Vinodini Vaishnav',
        claimType:'goodStanding',
        status:"Rejected",
        claimDate: "23-06-2023",
        rejectedDate: "23-12-2023",
        description: "This is a lorem ipsum description which is pretty much large enough to test a description"
     
      },
      {
        claimId: "333",
        grievanceRaiser: 'Apporva Nautiyal',
        claimType:'Candiadate',
        status:"Pending",
        claimDate: "23-06-2023",
        approvedDate: "23-12-2023",
        description: "This is a lorem ipsum description which is pretty much large enough to test a description"
     
      },
      {
        claimId: "332",
        grievanceRaiser: 'Nancy Jain',
        claimType:'goodstanding',
        status:"Pending",
        claimDate: "23-06-2023",
        approvedDate: "23-12-2023",
        description: "This is a lorem ipsum description which is pretty much large enough to test a description"
     
      },
      {
        claimId: "331",
        grievanceRaiser: 'Deepak Sharma',
        claimType:'Registration',
        status:"Pending",
        claimDate: "23-06-2023",
        approvedDate: "23-12-2023",
        description: "This is a lorem ipsum description which is pretty much large enough to test a description"
     
      },
      {
        claimId: "330",
        grievanceRaiser: 'Usha Singh',
        claimType:'Registration',
        status:"Pending",
        claimDate: "23-06-2023",
        approvedDate: "23-12-2023",
        description: "This is a lorem ipsum description which is pretty much large enough to test a description"
     
      },
      {
        claimId: "27",
        grievanceRaiser: 'Kamlesh Pandey',
        claimType:'Candiadate',
        status:"Pending",
        claimDate: "23-06-2023",
        approvedDate: "23-12-2023",
        description: "This is a lorem ipsum description which is pretty much large enough to test a description"
     
      },
      {
        claimId: "317",
        grievanceRaiser: 'Pappiya Mukherjee',
        claimType:'Candiadate',
        status:"Pending",
        claimDate: "23-06-2023",
        approvedDate: "23-12-2023",
        description: "This is a lorem ipsum description which is pretty much large enough to test a description"
      }
     
    ];
    this.pendingClaims = this.claims.filter(claim => claim['status'] === 'Pending');
    this.approvedClaims = this.claims.filter(claim => claim['status'] === 'Approved');
    this.rejectedClaims = this.claims.filter(claim => claim['status'] === 'Rejected');
  }

  onClickItem(e: any) {
    console.log(e?.id)
    let id = parseInt(e?.id)
    //this.router.navigate(['/:'+id], {state: {data: e}});
    this.router.navigate(['/grievance',  e.id ], {state : {data: e}} );
   // this.router.navigate(['/grievance', e.id]);
  }

  raiseNewGrievance(){
    
  }
}
