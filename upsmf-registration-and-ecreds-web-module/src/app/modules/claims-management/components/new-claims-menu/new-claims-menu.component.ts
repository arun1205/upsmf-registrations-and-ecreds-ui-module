import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-new-claims-menu',
  templateUrl: './new-claims-menu.component.html',
  styleUrls: ['./new-claims-menu.component.scss']
})
export class NewClaimsMenuComponent {

  isStudent: boolean = true;
  cardList:any[]=[
    
    {
      title:'Other Certificate',
      description: 'Maecenas consectetur ligula sit amet magna ornare lobortis. Fusce lobortis bibendum neque. ' ,
      type:'goodStandingCert'
    },

    {
      title:'Foreign Verification Request ',
      description: 'Maecenas consectetur ligula sit amet magna ornare lobortis. Fusce lobortis bibendum neque. ',
      type:'ForeignVerifyReq'
    },

    // {
    //   title:'Renewal Certificate Claim ',
    //   description: 'Maecenas consectetur ligula sit amet magna ornare lobortis. Fusce lobortis bibendum neque.  ',
    //   type:'renewCertClaim'
    // },

  ]
  studentCards =  {
    title:'Registration Certificate',
    description: 'Maecenas consectetur ligula sit amet magna ornare lobortis. Fusce lobortis bibendum neque. ' ,
    type:'regnCert'
  };
  adminCards = [
    {
      title:'Registration Certificate ( From UP)',
      description: 'Maecenas consectetur ligula sit amet magna ornare lobortis. Fusce lobortis bibendum neque. ' ,
      type:'regnCertfromUP'
    },
    {
      title:'Registration Certificate (Outside UP)',
      description: 'Maecenas consectetur ligula sit amet magna ornare lobortis. Fusce lobortis bibendum neque. ' ,
      type:'regnCertoutsideUP'
    }
];

  constructor(private router:Router){

  }

  navigateto(item: any) {
    let navigationExtras: NavigationExtras = {};

    
    switch (item.type) {

      case 'ForeignVerifyReq':
        case 'goodStandingCert':
          navigationExtras = {
            state: {
              customData: { type: item.type }
            }
          };
          this.router.navigate(['claims/good-stand-frgn-cert'], navigationExtras);
        break;
        case 'regnCertfromUP':
        this.router.navigate(['claims/new-regn-cert-details'])
        break;
        case 'regnCertoutsideUP':
        this.router.navigate(['claims/new-regn-cert-details'])
        break;
        case 'regnCert':
        this.router.navigate(['claims/new-regn-cert-details'])
        break;


      // case 'renewCertClaim':
      //   this.router.navigate(['claims/renew-cert-claim'])
      //   break;
      default:
        return '';
    }
    

    return;


  }
}
