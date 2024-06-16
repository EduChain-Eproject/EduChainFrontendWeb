import axiosService from '../../../../common/services/axiosService';
import Failure from '../../../../common/types/Failure';
import { LoginReq } from '../../domain/usecases/Login';
import { RegisterReq } from '../../domain/usecases/Register';

const baseUrl:String = "http://localhost:8080/Auth/";
export const logIn = async(loginRequest:LoginReq) => {
    try{        
        const response = await axiosService.post(`${baseUrl}login`,loginRequest);
        return response.data;
    }
    catch(error){
        throw new Failure(error.response.data.message, error.response.status);
    }
};


export const registerUser = async (registerRequest:RegisterReq) => {
   try{
    const response = await axiosService.post(`${baseUrl}register`,registerRequest);
    console.log( response.data)
    return response.data;
   }
   catch(error){
    console.log(error.response.data);
    throw new Failure(error.response.data.message, error.response.status);
   } 
}