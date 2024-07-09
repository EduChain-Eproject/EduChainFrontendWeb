import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../common/context/store';


import BackgroundImage from '../components/BackgroundImage';
import FloatingPopularCourse from '../components/FloatingPopularCourse';
import BestCategories from '../components/BestCategories';
import BestTeacher from '../components/BestTeacher';
import Statistics from '../components/Statistics';
import BestFeedbacks from '../components/BestFeedbacks';
import SignatureCourses from '../components/SignatureCourses';
import Blogs from '../components/Blogs';
import { fetchPopularCourse } from '../../data/redux/actions/fetchPopularCourse';
import { fetchBestCategories } from '../../data/redux/actions/fetchBestCategories';
import { fetchBestTeacher } from '../../data/redux/actions/fetchBestTeacher';
import { fetchStatistics } from '../../data/redux/actions/fetchStatistics';
import { fetchSignatureCourses } from '../../data/redux/actions/fetchSignatureCourses';
import { fetchBlogs } from '../../data/redux/actions/fetchBlogs';

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { popularCourse, bestCategories, bestTeacher, statistics, signatureCourses, blogs } = useAppSelector(state => state.home);

    useEffect(() => {
        dispatch(fetchPopularCourse());
        dispatch(fetchBestCategories());
        dispatch(fetchBestTeacher());
        dispatch(fetchStatistics());
        dispatch(fetchSignatureCourses());
        dispatch(fetchBlogs());
    }, [dispatch]);

    return (
        <div className="home-page">
            <BackgroundImage />
            <div className="intro-section text-center py-20 bg-white bg-opacity-75">
                {popularCourse.data ? (
                    <>
                        <h1 className="text-4xl font-bold mb-8">Welcome to Our Learning Platform</h1>
                        <FloatingPopularCourse course={popularCourse.data} />
                    </>
                ) : (
                    <div>Loading popular course...</div>
                )}
            </div>
            <h2 className="text-center my-16 text-4xl font-bold">Education for Everyone</h2>
            {bestCategories.data ? <BestCategories categories={bestCategories.data} /> : <div>Loading best categories...</div>}
            {bestTeacher.data ? <BestTeacher teacher={bestTeacher} /> : <div>Loading best teacher...</div>}
            {statistics.data ? <Statistics stats={statistics.data} /> : <div>Loading statistics...</div>}
            {statistics?.data ? <BestFeedbacks feedbacks={statistics.data.bestFeedbacks} /> : <div>Loading best feedbacks...</div>}
            {signatureCourses.data ? <SignatureCourses courses={signatureCourses.data} /> : <div>Loading signature courses...</div>}
            {blogs.data ? <Blogs blogs={blogs.data} /> : <div>Loading blogs...</div>}
        </div>
    );
};

export default HomePage;
