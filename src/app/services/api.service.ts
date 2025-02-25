import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable()

export class APIService {
    http = inject(HttpClient);


    apiUrl(): string {
        return environment.server + '/api';
    }

    makeHeaders(showSuccessToastr: string = '', showSpinner: string = 'true', msg: string = ''): { headers: any } {
        const options: any = {
            showSuccessToastr: showSuccessToastr,
            showSpinner: showSpinner,
            message: msg
        };

        return { headers: options };
    }
}