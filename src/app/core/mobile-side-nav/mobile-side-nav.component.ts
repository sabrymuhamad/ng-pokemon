import { Component } from '@angular/core';
import { MainMenuComponent } from '../main-menu/main-menu.component';
import { HeaderContactInfoComponent } from '../header/header-contact-info/header-contact-info.component';
import { MatDivider } from '@angular/material/divider';

@Component({
    selector: 'app-mobile-side-nav',
    imports: [MainMenuComponent, HeaderContactInfoComponent, MatDivider],
    templateUrl: './mobile-side-nav.component.html',
    styleUrl: './mobile-side-nav.component.scss'
})
export class MobileSideNavComponent {

}
