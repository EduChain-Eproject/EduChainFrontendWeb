import { BlogCategory } from "../entities/BlogCategory";
import { CreateCateReq } from "../usecases/CreateCate";
import { UpdateCateReq } from "../usecases/UpdateCate";

export interface BlogCateRepository {
    getCates: () => Promise<{ data?: BlogCategory[]; error?: string }>;
    getCate: (cateId: number) => Promise<{ data?: BlogCategory; error?: string }>;
    createCate: (cateData: CreateCateReq) => Promise<{ data?: BlogCategory; error?: string }>;
    updateCate: (cateId: number, cateData: UpdateCateReq) => Promise<{ data?: BlogCategory; error?: string }>;
    deleCate: (cateId: number) => Promise<{ data?: void; error?: string }>;
}  