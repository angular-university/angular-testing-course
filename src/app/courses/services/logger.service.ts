import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  log(message:string) {
    const a = 3;
    const b = -2;
     if (a) {
        console.log('a is true');
     }
    console.log(message);
  }

}
