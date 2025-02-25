import { NgClass } from '@angular/common';
import { Component, HostListener, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  imports: [MatIcon, NgClass],
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent {

  pageName = input<string | null>(null);
  router = inject(Router);
  showBackBtn = input<boolean>(true);
  isSticky = input<boolean>(false);
  showStickyToolbar = false;

  @HostListener('window:scroll', [])
  onWindowScroll(event: any) {
    if (this.isSticky() && window.scrollY > 120) {
      this.showStickyToolbar = true;
    } else {
      this.showStickyToolbar = false;
    }
  }

  backToPre() {
    if ((window as any).navigation.canGoBack) {
      window.history.back()
    } else {
      this.router.navigateByUrl('/admin');
    }
  }

}
