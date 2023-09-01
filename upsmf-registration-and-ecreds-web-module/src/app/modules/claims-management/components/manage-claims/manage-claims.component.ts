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

  claimsTableColumns: TableColumn[] = [];
  pendingClaimsTableColumns: TableColumn[] = [];
  approvedClaimsTableColumns: TableColumn[] = [];
  rejectedClaimsTableColumns: TableColumn[] = [];

  isDataLoading: boolean = false;
  constructor(
    private router: Router,
    private baseService: BaseServiceService  ) { }

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
        cell: (element: Record<string, any>) => `${element['claimType']}`
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
        cell: (element: Record<string, any>) => `${element['claimType']}`
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
        cell: (element: Record<string, any>) => `${element['claimType']}`
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

  getclaims() {
    this.isDataLoading = true;
   this.baseService.getClaims$().subscribe(
      (res) =>{
        this.claims = res.responseData
        console.log('this.claims', this.claims);
        this.pendingClaims = this.claims.filter(claim => claim['status'] === 'OPEN');
        this.approvedClaims = this.claims.filter(claim => claim['status'] === 'APPROVED');
        this.rejectedClaims = this.claims.filter(claim => claim['status']==='REJECTED');
        console.log('pendingClaims', this.pendingClaims)
        this.isDataLoading = false;

      }, 
    ) 

 /*    const body = {
      "aadhaarNo": "some_aadhaar_no",
      "council": "upsmfac",
      "courseName": "Nursing Course",
      "dateOfBirth": "1990-01-01",
      "email": "45@example12366.com",
      "examBody": "Some Exam Body",
      "fathersName": "Jack Doe",
      "finalYearRollNo": "1234",
      "gender": "male",
      "date":"1990-01-01",
      "joiningMonth": "January",
      "joiningYear": "2018",
      "mothersName": "Jane Doe",
      "name": "John Doe",
      "nursingCollage": "Some Nursing College",
      "passingMonth": "December",
      "passingYear": "2021",
      "phoneNumber": "09876735",
      "registrationType": "SomeRegistrationType",
      "barCode": "123457",
      "doc-proof":"qwer.doc",
      "paymentStatus":"SUCCESS",
      "candidatePic":"arun.jpg",
      "feeReciptNo":"12345678"
  } */
 
   /*   this.baseService.inviteStudent$(body)
    .pipe(
      mergeMap((resp: any) => {
        console.log(resp.result.StudentFromUP.osid)
       // return resp;
        return this.baseService.makeClaim$(resp.result.StudentFromUP.osid);
      }
      ))  
      .subscribe(
        (response) => {
          console.log(response.result.StudentFromUP.osid);

        },
      )*/



   
    // setTimeout(() => {
    //   this.isDataLoading = false;
    // }, 2000);
    // this.claims = [
    //   {
    //     id: "7fcd0a6d-a3fa-4358-a094-0d36c03fb91d",
    //     entity: "Student",
    //     entityId: "1-62b526e4-c62c-4b7c-9bc0-5f126414d57d",
    //     createdAt: "2023-08-02T05:50:52.535+00:00",
    //     updatedAt: "2023-08-02T06:47:31.718+00:00",
    //     attestedOn: new Date("2023-08-02T06:47:12.601+00:00").toLocaleDateString("en-us"),
    //     status: "OPEN",
    //     attestorEntity: "Teacher",
    //     requestorName: "kumarpawans67@gmail.com",
    //     attestationId: "1-6d4e2ffd-361e-4e13-b4a4-9beade1decb0",
    //     attestationName: "studentVerification",
    //     attestorUserId: "c49ac210-6a1b-47b2-b429-2f88deb8d8a4",
    //     claimType: "Registration",
    //     closed: false
    //   },
    //   {
    //     id: "7fcd0a6d-a3fa-4358-a094-0d36c03fb91d",
    //     entity: "Student",
    //     entityId: "1-62b526e4-c62c-4b7c-9bc0-5f126414d57d",
    //     createdAt: "2023-08-02T05:50:52.535+00:00",
    //     updatedAt: "2023-08-02T06:47:31.718+00:00",
    //     attestedOn: "2023-08-02T06:47:12.601+00:00",
    //     status: "OPEN",
    //     attestorEntity: "Teacher",
    //     requestorName: "kumarpawans67@gmail.com",
    //     attestationId: "1-6d4e2ffd-361e-4e13-b4a4-9beade1decb0",
    //     attestationName: "studentVerification",
    //     attestorUserId: "c49ac210-6a1b-47b2-b429-2f88deb8d8a4",
    //     claimType: "Registration",
    //     closed: true
    //   },
    //   {
    //     id: "7fcd0a6d-a3fa-4358-a094-0d36c03fb91d",
    //     entity: "Student",
    //     entityId: "1-62b526e4-c62c-4b7c-9bc0-5f126414d57d",
    //     createdAt: "2023-08-02T05:50:52.535+00:00",
    //     updatedAt: "2023-08-02T06:47:31.718+00:00",
    //     attestedOn: "2023-08-02T06:47:12.601+00:00",
    //     status: "REJECTED",
    //     attestorEntity: "Teacher",
    //     requestorName: "kumarpawans67@gmail.com",
    //     attestationId: "1-6d4e2ffd-361e-4e13-b4a4-9beade1decb0",
    //     attestationName: "studentVerification",
    //     attestorUserId: "c49ac210-6a1b-47b2-b429-2f88deb8d8a4",
    //     claimType: "Registration",
    //     notes: "Rejected because of document mismatch ",
    //     closed: true
    //   },
    //   {
    //     id: "7fcd0a6d-a3fa-4358-a094-0d36c03fb91d",
    //     entity: "Student",
    //     entityId: "1-62b526e4-c62c-4b7c-9bc0-5f126414d57d",
    //     createdAt: "2023-08-02T05:50:52.535+00:00",
    //     updatedAt: "2023-08-02T06:47:31.718+00:00",
    //     attestedOn: "2023-08-02T06:47:12.601+00:00",
    //     status: "REJECTED",
    //     attestorEntity: "Teacher",
    //     requestorName: "kumarpawans67@gmail.com",
    //     attestationId: "1-6d4e2ffd-361e-4e13-b4a4-9beade1decb0",
    //     attestationName: "studentVerification",
    //     attestorUserId: "c49ac210-6a1b-47b2-b429-2f88deb8d8a4",
    //     claimType: "Registration",
    //     notes: "Rejected because of incorrect DOB",
    //     closed: true
    //   },
    //   {
    //     id: "7fcd0a6d-a3fa-4358-a094-0d36c03fb91d",
    //     entity: "Student",
    //     entityId: "1-62b526e4-c62c-4b7c-9bc0-5f126414d57d",
    //     createdAt: "2023-08-02T05:50:52.535+00:00",
    //     updatedAt: "2023-08-02T06:47:31.718+00:00",
    //     attestedOn: "2023-08-02T06:47:12.601+00:00",
    //     status: "CLOSED",
    //     attestorEntity: "Teacher",
    //     requestorName: "kumarpawans67@gmail.com",
    //     attestationId: "1-6d4e2ffd-361e-4e13-b4a4-9beade1decb0",
    //     attestationName: "studentVerification",
    //     attestorUserId: "c49ac210-6a1b-47b2-b429-2f88deb8d8a4",
    //     claimType: "Registration",
    //     notes: "Rejected because of insufficient docs",
    //     closed: true
    //   },
    //   {
    //     id: "7fcd0a6d-a3fa-4358-a094-0d36c03fb91d",
    //     entity: "Student",
    //     entityId: "1-62b526e4-c62c-4b7c-9bc0-5f126414d57d",
    //     createdAt: "2023-08-02T05:50:52.535+00:00",
    //     updatedAt: "2023-08-02T06:47:31.718+00:00",
    //     attestedOn: "2023-08-02T06:47:12.601+00:00",
    //     status: "OPEN",
    //     attestorEntity: "Teacher",
    //     requestorName: "kumarpawans67@gmail.com",
    //     attestationId: "1-6d4e2ffd-361e-4e13-b4a4-9beade1decb0",
    //     attestationName: "studentVerification",
    //     attestorUserId: "c49ac210-6a1b-47b2-b429-2f88deb8d8a4",
    //     claimType: "Registration",
    //     closed: false
    //   },
    //   {
    //     id: "7fcd0a6d-a3fa-4358-a094-0d36c03fb91d",
    //     entity: "Student",
    //     entityId: "1-62b526e4-c62c-4b7c-9bc0-5f126414d57d",
    //     createdAt: "2023-08-02T05:50:52.535+00:00",
    //     updatedAt: "2023-08-02T06:47:31.718+00:00",
    //     attestedOn: "2023-08-02T06:47:12.601+00:00",
    //     status: "CLOSED",
    //     attestorEntity: "Teacher",
    //     requestorName: "kumarpawans67@gmail.com",
    //     attestationId: "1-6d4e2ffd-361e-4e13-b4a4-9beade1decb0",
    //     attestationName: "studentVerification",
    //     attestorUserId: "c49ac210-6a1b-47b2-b429-2f88deb8d8a4",
    //     claimType: "Registration",
    //     closed: true
    //   },
    //   {
    //     id: "7fcd0a6d-a3fa-4358-a094-0d36c03fb91d",
    //     entity: "Student",
    //     entityId: "1-62b526e4-c62c-4b7c-9bc0-5f126414d57d",
    //     createdAt: "2023-08-02T05:50:52.535+00:00",
    //     updatedAt: "2023-08-02T06:47:31.718+00:00",
    //     attestedOn: "2023-08-02T06:47:12.601+00:00",
    //     status: "OPEN",
    //     attestorEntity: "Teacher",
    //     requestorName: "kumarpawans67@gmail.com",
    //     attestationId: "1-6d4e2ffd-361e-4e13-b4a4-9beade1decb0",
    //     attestationName: "studentVerification",
    //     attestorUserId: "c49ac210-6a1b-47b2-b429-2f88deb8d8a4",
    //     claimType: "Registration",
    //     closed: false
    //   },
    //   {
    //     id: "7fcd0a6d-a3fa-4358-a094-0d36c03fb91d",
    //     entity: "Student",
    //     entityId: "1-62b526e4-c62c-4b7c-9bc0-5f126414d57d",
    //     createdAt: "2023-08-02T05:50:52.535+00:00",
    //     updatedAt: "2023-08-02T06:47:31.718+00:00",
    //     attestedOn: "2023-08-02T06:47:12.601+00:00",
    //     status: "CLOSED",
    //     attestorEntity: "Teacher",
    //     requestorName: "kumarpawans67@gmail.com",
    //     attestationId: "1-6d4e2ffd-361e-4e13-b4a4-9beade1decb0",
    //     attestationName: "studentVerification",
    //     attestorUserId: "c49ac210-6a1b-47b2-b429-2f88deb8d8a4",
    //     claimType: "Registration",
    //     closed: true
    //   },
    //   {
    //     id: "7fcd0a6d-a3fa-4358-a094-0d36c03fb91d",
    //     entity: "Student",
    //     entityId: "1-62b526e4-c62c-4b7c-9bc0-5f126414d57d",
    //     createdAt: "2023-08-02T05:50:52.535+00:00",
    //     updatedAt: "2023-08-02T06:47:31.718+00:00",
    //     attestedOn: "2023-08-02T06:47:12.601+00:00",
    //     status: "CLOSED",
    //     attestorEntity: "Teacher",
    //     requestorName: "kumarpawans67@gmail.com",
    //     attestationId: "1-6d4e2ffd-361e-4e13-b4a4-9beade1decb0",
    //     attestationName: "studentVerification",
    //     attestorUserId: "c49ac210-6a1b-47b2-b429-2f88deb8d8a4",
    //     claimType: "Registration",
    //     closed: true
    //   },
    //   {
    //     id: "7fcd0a6d-a3fa-4358-a094-0d36c03fb91d",
    //     entity: "Student",
    //     entityId: "1-62b526e4-c62c-4b7c-9bc0-5f126414d57d",
    //     createdAt: "2023-08-02T05:50:52.535+00:00",
    //     updatedAt: "2023-08-02T06:47:31.718+00:00",
    //     attestedOn: "2023-08-02T06:47:12.601+00:00",
    //     status: "OPEN",
    //     attestorEntity: "Teacher",
    //     requestorName: "kumarpawans67@gmail.com",
    //     attestationId: "1-6d4e2ffd-361e-4e13-b4a4-9beade1decb0",
    //     attestationName: "studentVerification",
    //     attestorUserId: "c49ac210-6a1b-47b2-b429-2f88deb8d8a4",
    //     claimType: "Registration",
    //     closed: false
    //   }

    // ];
  
  }

  onClickItem(e: any) {
    console.log(e?.id)
    let id = parseInt(e?.id)
    //this.router.navigate(['/:'+id], {state: {data: e}});
    this.router.navigate(['/claims', e.id], { state: { data: e } });
    // this.router.navigate(['/grievance', e.id]);
  }

}
