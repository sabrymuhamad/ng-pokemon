import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from '@safeDriver/services';

@Component({
    selector: 'app-main-menu',
    imports: [TranslateModule, RouterModule],
    templateUrl: './main-menu.component.html',
    styleUrl: './main-menu.component.scss'
})
export class MainMenuComponent {
  userService = inject(UserService);
}
