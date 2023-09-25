import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { ConfigService } from '../../services/config/config.service';
import { BaseServiceService } from 'src/app/services/base-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  userEmail:string = ''
  userDetails:any;
  userRole:any;
  initials:string;
  endPointUrl:string = ''
  constructor(private authService: AuthService,
    private configService : ConfigService,
    private baseService:BaseServiceService,
    private router: Router){

  }
  ngOnInit(): void {
    this.userRole = this.baseService.getUserRole()[0];
      this.getUserProfile();
  }
  
  getUserProfile(){
    switch (this.userRole) {
      case 'StudentFromUP':
        this.endPointUrl = this.configService.urlConFig.URLS.STUDENT.GET_STUDENT_DETAILS
        this.getUserDetails()
        break;
      case 'Regulator':
        this.endPointUrl = this.configService.urlConFig.URLS.ADMIN.GET_ADMIN_DETAILS
        this.getUserDetails()
        break;
      case 'SuperAdmin':
        this.endPointUrl = this.configService.urlConFig.URLS.SUPERADMIN.GET_SUPERADMIN_DETAILS
        this.getUserDetails()
        break;
      default:
        return '';
    }
    return

  }
  getUserDetails() {
    this.baseService.getCandidatePersonalDetails$(this.endPointUrl).subscribe({
      next: (res) => {
        this.userDetails = res.responseData[0]
        console.log('res', this.userDetails)
        if (this.userDetails.name) {
          this.initials = this.userDetails?.name.split(' ').map((word: string) => word.charAt(0).toUpperCase()).join('');
        }
      }
    })
  }

  navigateToProfilePage(){
    this.router.navigate(['/user-profile'])
  }

  logout(){
  this.authService.logout()
  this.router.navigate(['/'])
  }

}
