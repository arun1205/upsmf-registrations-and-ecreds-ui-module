import { Component, Input } from '@angular/core';
import { BreadcrumbItem } from '../../interfaces';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  @Input() breadcrumbItems: BreadcrumbItem[];
  constructor(private router: Router){
    console.log(this.breadcrumbItems)
  }
  navigateToUrl(url:string){
    this.router.navigate([url])
  }
 
}
