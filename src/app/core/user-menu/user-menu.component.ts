import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { USER_ROLE } from '@safeDriver/enums';
import { AuthLoginService, UserService } from '@safeDriver/services';

@Component({
    selector: 'app-user-menu',
    imports: [MatMenuModule, MatIcon, TranslateModule, MatDivider, NgIf, RouterLink, MatButtonModule, CommonModule],
    templateUrl: './user-menu.component.html',
    styleUrl: './user-menu.component.scss'
})
export class UserMenuComponent {
  private userService = inject(UserService);
  userRoles = USER_ROLE;
  authService = inject(AuthLoginService);
  userProfile = this.userService.loggedInUser!;
}
