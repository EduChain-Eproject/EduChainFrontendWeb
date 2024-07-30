import Failure from '../../../../common/entities/Failure';
import axiosService from '../../../../common/services/axiosService';

const baseUrl = 'http://localhost:8080/';

export const getUserWithToken = async () => {
  try {
    const response = await axiosService.get(`${baseUrl}COMMON/getUser`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};
