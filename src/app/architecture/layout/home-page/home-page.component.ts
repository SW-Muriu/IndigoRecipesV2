import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    SharedModule, 
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {


  selectCuisine(cuisine: string) {
    
  }

}
