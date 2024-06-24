import { ApiResponse, JwtResponse, LoginReq } from "../usecases/Login";
import { RegisterReq, RegisterResponseMessage } from "../usecases/Register";

export interface AuthRepository {
    //login
    onLogin:(loginRequest:LoginReq) => Promise<{data?:ApiResponse<JwtResponse> ; error?:string}>;
    //registers
    onRegister:(registerRequest:RegisterReq) => Promise<{message: RegisterResponseMessage; error?:string}>
    //
    onLogout:(email:string) => Promise<{message: RegisterResponseMessage; error?:string}>;
    //lấy trang reset password
    //api reset password => lấy token từ url
    sendMailResetPassword:(email:string) =>Promise<{message: RegisterResponseMessage; error?:string}>;

}