import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { fetchCate } from '../redux/cateAction';
const BlogCate: React.FC = () => {
    const { cateId } = useParams<{ cateId: string }>();
    const cId = Number(cateId)
    const dispatch = useAppDispatch();
    const { cate, status } = useAppSelector((state) => state.cates);

    useEffect(() => {
        if (cId) {
            dispatch(fetchCate(cId));
        }
    }, [dispatch, cId]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }


    return (
        <div>
            {cate && (
                <>
                    <h1>{cate.id}</h1>
                    <p>{cate.categoryName}</p>
                    <p>Created at : {new Date(cate.createdAt).toLocaleDateString()}</p>
                </>
            )}
        </div>
    );
};

export default BlogCate;
