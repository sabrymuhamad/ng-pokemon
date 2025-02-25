import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UtilityService } from './services';
import { LoaderComponent } from './shared/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  loaderIntr = inject(UtilityService);
  title = 'Pokemon App';
}
