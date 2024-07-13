import axiosService from "../../../../../../common/services/axiosService";
import Failure from "../../../../../../common/types/Failure";
import { CategoryDto } from "../models/CategoryDto";

export const apiFetchListCategories: () => Promise<CategoryDto[]> = async () => {
    try {
        const response = await axiosService.get('/COMMON/api/category/list');

        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
}