import { Injectable } from '@angular/core';

@Injectable()
export class UserDataService {

  constructor() { }

  public static getStatusTypes(): Array<any> {
    return [
        {
            label: 'Active',
            value: 10
        },
        {
            label: 'Disabled',
            value: 0
        }
    ];
}

}
