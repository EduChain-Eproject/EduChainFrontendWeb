import React, { useEffect } from 'react';
import {
  useAppSelector,
  useAppDispatch,
} from '../../../../common/context/store';

import CarouselBackground from '../components/CarouselBackground';
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
import { fetchBlogs } from '../../data/redux/actions/fetchBlogs';
import ImageCard from '../components/ImageCard';

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
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div className="home-page">
<CarouselBackground>
  {signatureCourses.data && signatureCourses.data.length !== 0 ? (
    <div className="flex flex-col items-center justify-center space-y-6 w-full text-center">
<div className="flex flex-col items-center space-y-4">
  <h1 className="text-6xl font-bold text-white bg-opacity-50 p-4 rounded-lg shadow-lg">
    WELCOME TO EDUCHAIN
  </h1>
  <p className="text-2xl text-white md:text-gray-300  italic text-center">
    _ Explore our signature courses and enhance your skills <br />
    with the best educational resources _
  </p>
</div>

      <FloatingPopularCourse course={signatureCourses.data[0]} />
    </div>
  ) : (
    <div className="text-center text-white text-lg">Loading popular course...</div>
  )}
</CarouselBackground>


      
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
      <ImageCard imageUrl={'https://img.freepik.com/free-photo/close-up-woman-class_23-2148888812.jpg?t=st=1725048075~exp=1725051675~hmac=a7657ab363e532032ab8f1ba84cc8e794a78f6e5f0718fa3a913658338e4dca5&w=1800'}></ImageCard>

      {statistics.data?.numberOfEnrollments ? (
        <Statistics stats={statistics.data} />
      ) : (
        <div>Loading statistics...</div>
      )}
      {/* {statistics?.data?.bestFeedbacks ? (
        <BestFeedbacks feedbacks={statistics.data.bestFeedbacks} />
      ) : (
        <div>Loading best feedbacks...</div>
      )} */}
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
