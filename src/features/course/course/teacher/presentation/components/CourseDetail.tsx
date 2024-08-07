import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import { fetchCourseDetail } from '../../data/services/handleFetchCourseDetail';

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector(
    (state) => state.courses.teacher.courseDetailPage,
  );

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseDetail(Number(courseId)));
    }
  }, [dispatch, courseId]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data && (
        <>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <p>Instructor: {data.teacherDto?.email}</p>
          <img src={data.avatarPath} alt="" />
        </>
      )}
    </div>
  );
};

export default CourseDetail;
