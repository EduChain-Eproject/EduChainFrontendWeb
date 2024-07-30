import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';
import Lesson from '../../../../../../common/entities/Lesson';
import axiosService from '../../../../../../common/services/axiosService';
import { LessonState } from '../redux/lessonSlice';

export type CreateLessonReq = {
  chapterId: string;
  lessonTitle: string;
  description: string;
  videoTitle: string;
  file: FileList;
};

export const apiCreateLesson = async (
  lessonData: CreateLessonReq,
): ApiResponse<Lesson> => {
  try {
    const formData = new FormData();
    formData.append('file', lessonData.file[0]);
    formData.append('chapterId', lessonData.chapterId);
    formData.append('lessonTitle', lessonData.lessonTitle);
    formData.append('description', lessonData.chapterId);
    formData.append('videoTitle', lessonData.videoTitle);

    const response = await axiosService.post(
      `/TEACHER/api/lesson/create`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure Content-Type is set correctly
        },
      },
    );

    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const createLesson = createAsyncThunk(
  'lessons/createLesson',
  async ({ lessonData }: { lessonData: CreateLessonReq }) => {
    return await apiCreateLesson(lessonData);
  },
);

const handleCreateLesson = (builder: ActionReducerMapBuilder<LessonState>) => {
  builder
    .addCase(createLesson.pending, (state) => {
      state.createLessonPage.status = 'loading';
    })
    .addCase(createLesson.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.createLessonPage.status = 'failed';
        state.createLessonPage.error = action.payload.error.message;
      } else {
        state.createLessonPage.status = 'succeeded';
        state.createLessonPage.data = action.payload.data;
      }
    })
    .addCase(createLesson.rejected, (state, action) => {
      state.createLessonPage.status = 'failed';
      state.createLessonPage.error = action.error.message;
    });
};
export default handleCreateLesson;
