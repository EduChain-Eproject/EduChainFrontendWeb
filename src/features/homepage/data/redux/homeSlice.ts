import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBestCategories,
  fetchBestCategoriesExtraReducers,
} from './actions/fetchBestCategories';
import {
  fetchMostPopularTeacher,
  fetchMostPopularTeacherExtraReducers,
} from './actions/fetchMostPopularTeacher';
import {
  fetchStatistics,
  fetchStatisticsExtraReducers,
} from './actions/fetchStatistics';
import {
  fetchSignatureCourses,
  fetchSignatureCoursesExtraReducers,
} from './actions/fetchSignatureCourses';
import { fetchBlogs, fetchBlogsExtraReducers } from './actions/fetchBlogs';
import { CommonState } from '../../../../common/state';
import Category from '../../../../common/entities/Category';
import User from '../../../../common/entities/User';
import CourseFeedback from '../../../../common/entities/CourseFeedback';
import Course from '../../../../common/entities/Course';
import { Blog } from '../../../../common/entities/Blog';

export interface Statistics {
  numberOfEnrollments: number;
  certificationsMade: number;
  satisfactionRate: number;
  bestFeedbacks?: CourseFeedback[];
}

export interface HomeState {
  bestCategories: CommonState<Category[]>;
  bestTeacher: CommonState<User>;
  statistics: CommonState<Statistics>;
  signatureCourses: CommonState<Course[]>;
  blogs: CommonState<Blog[]>;
}

const initialState: HomeState = {
  bestCategories: { data: [], status: null, error: undefined },
  bestTeacher: { data: undefined, status: null, error: undefined },
  statistics: {
    data: {
      numberOfEnrollments: 0,
      certificationsMade: 0,
      satisfactionRate: 0,
      bestFeedbacks: [],
    },
    status: null,
    error: undefined,
  },
  signatureCourses: { data: [], status: null, error: undefined },
  blogs: { data: [], status: null, error: undefined },
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    fetchBestCategoriesExtraReducers(builder);
    fetchMostPopularTeacherExtraReducers(builder);
    fetchStatisticsExtraReducers(builder);
    fetchSignatureCoursesExtraReducers(builder);
    fetchBlogsExtraReducers(builder);
  },
});

export default homeSlice.reducer;
