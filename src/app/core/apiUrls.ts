import { environment } from '../../environments/environment';
import { IApiEndPoint } from '../shared/models/constants/constant.type';

// Login API
export const postSendLoginOtpEndPoint = `${environment.baseUrl}/user/admin/auth/login/otp`;
export const postVerifyLoginOtpEndPoint = `${environment.baseUrl}/user/admin/auth/login/verify`;


// API for Refresh Token
export const postRefreshTokenEndPoint = `${environment.baseUrl}/user/token/refresh`;

// One-View API
export const getOneViewOfOrderEndPoint = (id: string, apiEndPoint: IApiEndPoint) => {
    return `${environment.baseUrl}/${apiEndPoint.service}/admin/order/${id}/oneview`;
}

// APIs for client logs
export const postClientLog = `${environment.baseUrl}/core/client_log`;