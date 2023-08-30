import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-claim',
  templateUrl: './manage-claim.component.html',
  styleUrls: ['./manage-claim.component.scss']
})
export class ManageClaimComponent {
  cardList:any[]=[
    {
      title:'Registration Certificate ( From UP)',
      description: 'Maecenas consectetur ligula sit amet magna ornare lobortis. Fusce lobortis bibendum neque. ' ,
      type:'regnCertfromUP'
    },
    {
      title:'Registration Certificate (Outside UP)',
      description: 'Maecenas consectetur ligula sit amet magna ornare lobortis. Fusce lobortis bibendum neque. ' ,
      type:'regnCertoutsideUP'
    },
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



  constructor(private router:Router){

  }

  navigateto(item: any) {
    switch (item.type) {

        case 'ForeignVerifyReq':
        this.router.navigate(['admin/view-claim'], { state: { type: item.type } })
        break;
        case 'goodStandingCert':
        this.router.navigate(['admin/view-claim'], { state: { type: item.type } })
        break;
        case 'regnCertfromUP':
        this.router.navigate(['admin/view-claim'], { state: { type: item.type } })
        break;
        case 'regnCertoutsideUP':
        this.router.navigate(['admin/view-claim'], { state: { type: item.type } })
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
