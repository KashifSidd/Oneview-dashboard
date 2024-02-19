import { BehaviorSubject } from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  service: BehaviorSubject<string> = new BehaviorSubject(null);
  constructor() {
    this.service.next(localStorage.getItem('service'));
  }
}
