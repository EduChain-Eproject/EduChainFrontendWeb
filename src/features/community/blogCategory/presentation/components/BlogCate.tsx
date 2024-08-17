import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { fetchCate } from '../redux/cateAction';
const BlogCate: React.FC = () => {
    const { cateId } = useParams<{ cateId: string }>();
    const cId = Number(cateId)
    const dispatch = useAppDispatch();
    const { data, status } = useAppSelector((state) => state.cates.fetchCateState);

    useEffect(() => {
        if (cId) {
            dispatch(fetchCate(cId));
        }
    }, [dispatch, cId]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-8">
            {data && (
                <>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">ID: {data.id}</h1>
                    <p className="text-lg text-gray-600 mb-1">Category: {data.categoryName}</p>
                    <p className="text-sm text-gray-500">
                        Created at: {new Date(data.createdAt).toLocaleDateString()}
                    </p>
                </>
            )}
        </div>
    );

};

export default BlogCate;
