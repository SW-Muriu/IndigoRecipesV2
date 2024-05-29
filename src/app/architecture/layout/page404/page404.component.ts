import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-page404',
  standalone: true,
  imports: [],
  templateUrl: './page404.component.html',
  styleUrl: './page404.component.scss'
})
export class Page404Component {



  constructor(
    private location: Location
  ) {

  }

  goBack() {
    this.location.back();
  }
  

}
