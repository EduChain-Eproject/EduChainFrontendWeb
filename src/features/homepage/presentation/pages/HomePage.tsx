import React, { useEffect } from 'react';
import {
  useAppSelector,
  useAppDispatch,
} from '../../../../common/context/store';

import BackgroundImage from '../components/BackgroundImage';
import FloatingPopularCourse from '../components/FloatingPopularCourse';
import BestCategories from '../components/BestCategories';
import BestTeacher from '../components/BestTeacher';
import Statistics from '../components/Statistics';
import BestFeedbacks from '../components/BestFeedbacks';
import SignatureCourses from '../components/SignatureCourses';
import Blogs from '../components/Blogs';
import { fetchBestCategories } from '../../data/redux/actions/fetchBestCategories';
import { fetchMostPopularTeacher } from '../../data/redux/actions/fetchMostPopularTeacher';
import { fetchStatistics } from '../../data/redux/actions/fetchStatistics';
import { fetchSignatureCourses } from '../../data/redux/actions/fetchSignatureCourses';
import { RouteObject } from 'react-router-dom';

export const route: () => RouteObject = () => {
  return {
    path: '',
    element: <HomePage />,
  };
};

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { bestCategories, bestTeacher, statistics, signatureCourses, blogs } =
    useAppSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchSignatureCourses());
    dispatch(fetchBestCategories());
    dispatch(fetchMostPopularTeacher());
    dispatch(fetchStatistics());
    // dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div className="home-page">
      <BackgroundImage>
        {signatureCourses.data && signatureCourses.data.length !== 0 ? (
          <div className="intro-content text-center py-20 flex md:flex-row md:items-start justify-center flex-col items-center w-full">
            <div className="flex-1 mb-10 flex items-center justify-center ">
              <h1 className="text-4xl font-bold bg-white bg-opacity-75 w-fit">
                Welcome to Our Learning Platform
              </h1>
            </div>
            <FloatingPopularCourse course={signatureCourses.data[0]} />
          </div>
        ) : (
          <div>Loading popular course...</div>
        )}
      </BackgroundImage>
      <h2 className="text-center my-16 text-4xl font-bold">
        Education for Everyone
      </h2>
      {bestCategories.data ? (
        <BestCategories categories={bestCategories.data} />
      ) : (
        <div>Loading best categories...</div>
      )}
      {bestTeacher.data ? (
        <BestTeacher teacher={bestTeacher.data} />
      ) : (
        <div>Loading best teacher...</div>
      )}
      {statistics.data ? (
        <Statistics stats={statistics.data} />
      ) : (
        <div>Loading statistics...</div>
      )}
      {statistics?.data?.bestFeedbacks ? (
        <BestFeedbacks feedbacks={statistics.data.bestFeedbacks} />
      ) : (
        <div>Loading best feedbacks...</div>
      )}
      {signatureCourses.data ? (
        <SignatureCourses courses={signatureCourses.data} />
      ) : (
        <div>Loading signature courses...</div>
      )}
      {blogs.data ? <Blogs blogs={blogs.data} /> : <div>Loading blogs...</div>}
    </div>
  );
};

export default HomePage;
