import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent {


  constructor(private router: Router){

  }
  cardList: any[] = [
    {
      title: 'Dashboard',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      type: 'dashboard',
    },

    {
      title: 'User Management',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      type: 'users',
    },
  ];

  navigateto(item: any) {
    console.log(item);
    switch (item.type) {
      case 'dashboard':
        this.router.navigate(['/super-admin/dashboard']);
        break;
      case 'users':
        this.router.navigate(['/super-admin/user-manage']);
        break;

      default:
        return '';
    }
    return;

    // this.router.navigate(['/user-manage'])
  }

}
