import { createSlice } from '@reduxjs/toolkit';
import { fetchPopularCourse, fetchPopularCourseExtraReducers } from './actions/fetchPopularCourse';
import { fetchBestCategories, fetchBestCategoriesExtraReducers } from './actions/fetchBestCategories';
import { fetchBestTeacher, fetchBestTeacherExtraReducers } from './actions/fetchBestTeacher';
import { fetchStatistics, fetchStatisticsExtraReducers } from './actions/fetchStatistics';
import { fetchSignatureCourses, fetchSignatureCoursesExtraReducers } from './actions/fetchSignatureCourses';
import { fetchBlogs, fetchBlogsExtraReducers } from './actions/fetchBlogs';
import { CommonState } from '../../../../common/state';
import { Course } from '../models/Course';
import { Category } from '../models/Category';
import { Feedback } from '../models/Feedback';
import { User } from '../models/User';
import { Blog } from '../models/Blog';

interface HomeState {
    popularCourse: CommonState<Course>;
    bestCategories: CommonState<Category[]>;
    bestTeacher: CommonState<User>;
    statistics: CommonState<{
        numberOfEnrollments: number;
        certificationsMade: number;
        satisfactionRate: number;
        bestFeedbacks: Feedback[];
    }>;
    signatureCourses: CommonState<Course[]>;
    blogs: CommonState<Blog[]>;
}

const initialState: HomeState = {
    popularCourse: { data: undefined, status: null, error: undefined },
    bestCategories: { data: [], status: null, error: undefined },
    bestTeacher: { data: undefined, status: null, error: undefined },
    statistics: { data: { numberOfEnrollments: 0, certificationsMade: 0, satisfactionRate: 0, bestFeedbacks: [] }, status: null, error: undefined },
    signatureCourses: { data: [], status: null, error: undefined },
    blogs: { data: [], status: null, error: undefined }
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        fetchPopularCourseExtraReducers(builder);
        fetchBestCategoriesExtraReducers(builder);
        fetchBestTeacherExtraReducers(builder);
        fetchStatisticsExtraReducers(builder);
        fetchSignatureCoursesExtraReducers(builder);
        fetchBlogsExtraReducers(builder);
    },
});

export default homeSlice.reducer;
