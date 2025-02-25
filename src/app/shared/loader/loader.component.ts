import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-loader',
    imports: [CommonModule, MatProgressSpinnerModule],
    templateUrl: './loader.component.html'
})
export class LoaderComponent {

}
