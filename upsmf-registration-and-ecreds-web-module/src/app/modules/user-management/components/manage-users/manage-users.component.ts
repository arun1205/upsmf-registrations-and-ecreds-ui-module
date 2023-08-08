import { Component } from '@angular/core';

import { TableColumn, UsersTableData } from '../../../../interfaces/interfaces';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})


export class ManageUsersComponent {

  isDataLoading: boolean = false;

  userTableColumns: TableColumn[] = [];
  userData: UsersTableData[] = [];

  ngOnInit(): void {
    this.initializeColumns();
    console.log(this.userTableColumns)
    this.getUsers();
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
      cell: (element: Record<string, any>) => `${element['email']}`
    },
    {
      columnDef: 'phoneNumber',
      header: 'Phone Number',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['phoneNumber']}`
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
      cell: (element: Record<string, any>) => `${element['status']}`
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

  getUsers() {
    this.isDataLoading = true;
    setTimeout(() => {
      this.isDataLoading = false;
    }, 1000);
    this.userData = [
      {
        id: "7fcd0a6d-a3fa-4358-a094-0d36c03fb91d",
        status: "Active",
        name: "Devpratap Nagar",
        email:"dev@nagar.up.ac.in",
        phoneNumber: "9876543210",
        role: "Nodal Officer",
      },]
    }

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
    onToggleData(e : any){
      console.log(e)
    }
    onDeleteData(e : any){
      console.log(e)
    }
}