import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getOneViewOfOrderEndPoint } from '../../core/apiUrls';
import { apiEndPoints } from '../models/constants/constant.type';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  service$: BehaviorSubject<string> = new BehaviorSubject(null);
  service: string;
  constructor(private http: HttpClient) {
    this.service$.next(localStorage.getItem('service'));
    this.service$.subscribe(data => this.service = data);
  }

  /**
   * Method that gets one view details of order id
   * @param id 
   * @returns 
   */
  getOneViewOfOrder(id: string): Observable<any> {
    return this.http.get(getOneViewOfOrderEndPoint(id, apiEndPoints[this.service])).pipe(
      map((response) => {
        return response;
      })
    )
  }
}
