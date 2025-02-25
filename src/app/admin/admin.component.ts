import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@pokemon/core/footer/footer.component';
import { HeaderComponent } from '@pokemon/core/header/header.component';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './admin.component.html'
})
export class AdminComponent {

}
