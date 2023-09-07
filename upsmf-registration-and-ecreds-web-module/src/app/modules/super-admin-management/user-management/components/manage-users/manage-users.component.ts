import { Component } from '@angular/core';

import { TableColumn, UsersTableData, userTableData } from '../../../../../interfaces/interfaces';
import { Router } from '@angular/router';
import { SuperAdminService } from '../../../service/super-admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationPopupComponent } from 'src/app/modules/shared/components/confirmation-popup/confirmation-popup.component';
import { BreadcrumbItem } from 'src/app/modules/shared';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})


export class ManageUsersComponent {

  isDataLoading: boolean = false;

  userTableColumns: TableColumn[] = [];
  userData: UsersTableData[] = [];
  users: userTableData[] = [];
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Workspace', url: '/super-admin' },
    { label: 'User List', url: 'super-admin/user-manage' },
  ];

  constructor(private router: Router,
    private superAdminService: SuperAdminService,
    private dialog: MatDialog,){

  }

  ngOnInit(): void {
   this.getAllUsers();
  // this.getUsers();
    this.initializeColumns();
    console.log(this.userTableColumns)
    console.log(this.userData)
  }

  initializeColumns(): void {
  this.userTableColumns = [
    {
      columnDef: 'name',
      header: 'Full Name',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['name']}`
    },
    {
      columnDef: 'email',
      header: 'Email',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['username']}`
    },
    {
      columnDef: 'phoneNumber',
      header: 'Phone Number',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['phone']}`
    },
    {
      columnDef: 'role',
      header: 'Role',
      isSortable: false,
      cell: (element: Record<string, any>) => `${element['role']}`
    },
    {
      columnDef: 'status',
      header: 'Account Status',
      isSortable: false,
      cell: (element: Record<string, any>) => {
        return  element['isActive'] ? 'Active' : "Inactive";
      }
    },
    {
      columnDef: 'more',
      header: '',
      isSortable: false,
      isMenuOption: true,
      cell: (element: Record<string, any>) => ``
    }

  ];
  }

  getAllUsers() {
    this.isDataLoading = true;
    this.superAdminService.getAllUsers().subscribe({
      next: (res) => {
        console.log(res)
        this.isDataLoading = false;
        res.shift()
        this.users = res.map((user:any) => {
          const { username, firstName, lastName, enabled, email, attributes, id } = user;
          let name = '';
          let isActive = '';
          let role = '';
          let phone = '';
          if(firstName && lastName !== undefined) {
          name = firstName + ' ' + lastName;
          }
          if(enabled) {
          isActive = enabled == true? 'Active': 'Inactive';
          }
          if(attributes !== undefined) {
          if(attributes.hasOwnProperty('role') && attributes.role[0]) {
          role = attributes.role[0];
          }
          if(attributes.hasOwnProperty('phoneNumber') && attributes.phoneNumber[0]) {
          phone = attributes.phoneNumber[0]
          }
        }
          return {
            id,
            name,
            username,
            phone,
            isActive,
            role
          }
        })
        // this.length = this.users.length;
      },
      error: (err) => {
        this.isDataLoading = false;
        // this.toastrService.showToastr(err, 'Error', 'error', '');
        // Handle the error here in case of login failure
      }
    });
  }

  // getUsers() {
  //   this.isDataLoading = true;
  //   setTimeout(() => {
  //     this.isDataLoading = false;
  //   }, 1000);
  //   this.userData = [
  //     {
  //       id: "7fcd0a6d-a3fa-4358-a094-0d36c03fb91d",
  //       status: "Active",
  //       name: "Devpratap Nagar",
  //       email:"dev@nagar.up.ac.in",
  //       phoneNumber: "9876543210",
  //       role: "Nodal Officer",
  //     },]
  //   }

    onClickItem(e: any) {
      console.log(e)
      //let id = parseInt(e?.id)
      //this.router.navigate(['/:'+id], {state: {data: e}});
      //this.router.navigate(['/claims', e.id], { state: { data: e } });
      // this.router.navigate(['/grievance', e.id]);
    }

    onEditData(e : any){
      console.log(e)
    }
    goToUserDetail(userDetail?:any){
      if(userDetail){
        const id = userDetail?.id;
        this.router.navigate(['/super-admin/new-user'],{ queryParams: {id: id}})
      }
      else {
        this.router.navigate(['/super-admin/new-user'])
      }
    }
    onToggleData(e : any){
      console.log(e)
    }

    toggleUserStatus(event:any) {
      console.log('eee',event)
      const status = event.isActive ? 'deactivate' : 'activate';
     const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      data: { title: `Are you sure you want to ${status} ?`},
      maxWidth:'400vw',
      maxHeight:'100vh',
      height:'30%',
      width:'30%',
      disableClose: true
     });
     let updatedUserData = {...event};
     const userIndex = this.users.findIndex(user => user.id === updatedUserData.id);
     dialogRef.afterClosed().subscribe(isConfirmed=>{
       if(isConfirmed) {
        updatedUserData.isActive = !event.isActive;
        const request = {
          request: {
            userName: event.id
        }
        }
        this.superAdminService.deactivateUser(request).subscribe({
          next: (res) => {
            this.users.splice(userIndex,1,updatedUserData);
         },
         error: (err) => {  
            this.users.splice(userIndex,1,event);
           // Handle the error here in case of login failure
         }});
       }
       this.users.splice(userIndex,1,event);
       this.initializeColumns();
       this.getAllUsers();
     })
    }
    onDeleteData(e : any){
      console.log(e)
    }

}