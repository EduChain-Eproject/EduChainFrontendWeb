import React, { useEffect } from "react";
import { RouteObject, useNavigate } from "react-router-dom";
import { CreateFormComp } from "../../components/CreateFormComp";
import { useAppDispatch, useAppSelector } from "../../../../../../common/context/store";
import { CreateBlogReq } from "../../../domain/usecases/CreateBlog";
import { createBlog } from "../../redux/blogActions";

export const route: () => RouteObject = () => {
    return {
        path: "create-blog",
        element: <CreateFormPage />
    }
}

const CreateFormPage: React.FC = () => {
    const { status, error } = useAppSelector(state => state.blogUiSlice.blogDetail);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const createBlogData = useAppSelector(
        (state) => state.blogUiSlice.blogCreateState,
      );
    const handleSubmit =  (data: CreateBlogReq) => {
        const submitData = {
            ...data,
        };
         dispatch(createBlog(submitData));
    };

  useEffect(() => {
    if(createBlogData.status === 'succeeded'){
      navigate('/community/blog_ui');
    }
  },[createBlogData.status ,navigate]);
    return (
        <div>
            < CreateFormComp onSubmit={handleSubmit}/>
        </div>
    );
};

export default CreateFormPage;