import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-claims-menu',
  templateUrl: './new-claims-menu.component.html',
  styleUrls: ['./new-claims-menu.component.scss']
})
export class NewClaimsMenuComponent {
  cardList:any[]=[
    {
      title:'Registration Certificate',
      description: 'Maecenas consectetur ligula sit amet magna ornare lobortis. Fusce lobortis bibendum neque. ' ,
      type:'regnCert'
    },
    {
      title:'Good Standing Certificate ',
      description: 'Maecenas consectetur ligula sit amet magna ornare lobortis. Fusce lobortis bibendum neque. ' ,
      type:'goodStandingCert'
    },

    {
      title:'Foreign Verification Request ',
      description: 'Maecenas consectetur ligula sit amet magna ornare lobortis. Fusce lobortis bibendum neque. ',
      type:'ForeignVerifyReq'
    },

    {
      title:'Renewal Certificate Claim ',
      description: 'Maecenas consectetur ligula sit amet magna ornare lobortis. Fusce lobortis bibendum neque.  ',
      type:'renewCertClaim'
    },

  ]

  constructor(private router:Router){

  }

  navigateto(item: any) {
    switch (item.type) {

      case 'regnCert':
        this.router.navigate(['claims/new-regn-cert'])
        break;
      case 'goodStandingCert':
        this.router.navigate(['claims/good-stand-cert'])
        break;
      case 'ForeignVerifyReq':
        this.router.navigate(['claims/frgn-verify-req'])
        break;
      case 'renewCertClaim':
        this.router.navigate(['claims/renew-cert-claim'])
        break;
      default:

        return '';
    }
    return;
  }
}
