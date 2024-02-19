import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as apiUrls from '../../core/apiUrls';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  /**
   * Method that sends Login details to the API
   * @param data 
   * @returns response
   */
  sendLoginOtp(data: any): Observable<any> {   
    return this.http.post(apiUrls.postSendLoginOtpEndPoint,data).pipe(
      map((response) => {

        return response;
      })
    );
  }

  /**
   * Method that sends Login details to the API
   * @param data 
   * @returns response
   */

  verifyLoginOtp(data: any): Observable<any> {
    return this.http.post(apiUrls.postVerifyLoginOtpEndPoint, data).pipe(
      map((response) => {
        return response;
      })
    );
    }

  /**
   * Method that sets Authorization token in local storage 
   * @returns response
   */

  refreshAuthToken(): Observable<any> {
    const headers = new HttpHeaders({
      refresh_token: 'true'
    })
    return this.http.post(apiUrls.postRefreshTokenEndPoint, {}, { headers }).pipe(
      map((response) => {
        localStorage.setItem('token', response['result']['token']);
        localStorage.setItem('refreshToken', response['result']['refresh_token']);
      })
    )
  }
}
