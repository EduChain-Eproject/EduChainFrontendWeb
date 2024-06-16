import { createAsyncThunk } from '@reduxjs/toolkit';
import BlogCateRepositoryImpl from '../../data/repositoryImpl/BlogCateRepositoryImpl';
import { 
    GetCate,
    GetCates,
    UpdateCate,
    CreateCate,
    DeleteCate
 } from '../../domain/usecases';
    
import { BlogCateRepository } from '../../domain/repositories/BlogCateRepository';
import { CreateCateReq } from '../../domain/usecases/CreateCate';
import { UpdateCateReq } from '../../domain/usecases/UpdateCate';

const cateRepository: BlogCateRepository = new BlogCateRepositoryImpl();

export const fetchCates = createAsyncThunk('blog_category/fetchCates', async () => {
    const getCateUseCase = new GetCates(cateRepository);
    return await getCateUseCase.execute();
});

export const fetchCate = createAsyncThunk('blog_category/fetchCate', async (cateId: number) => {
    const getCateUseCase = new GetCate(cateRepository);
    return await getCateUseCase.execute(cateId);
});

export const createCate = createAsyncThunk('blog_category/createCate', async (cateData: CreateCateReq) => {
    const getCateUseCase = new CreateCate(cateRepository);
    return await getCateUseCase.execute(cateData);
});

export const updateCate = createAsyncThunk('blog_category/updateCate', async ({ cateId, cateData }: { cateId: number, cateData: UpdateCateReq }) => {
    const getCateUseCase = new UpdateCate(cateRepository);
    return await getCateUseCase.execute(cateId, cateData);
});

export const deleteCate = createAsyncThunk('blog_category/deleteCate', async (cateId: number) => {
    const getCateUseCase = new DeleteCate(cateRepository);
    return await getCateUseCase.execute(cateId);
});