import { Injectable, signal } from '@angular/core';
import { ILoading } from '@pokemon/models';

@Injectable({
    providedIn: 'root',
})
export class UtilityService {
    loaderState = signal<ILoading>({} as ILoading);


}
