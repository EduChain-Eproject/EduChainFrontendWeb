import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import Lesson from '../../../../../../common/entities/Lesson';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import axiosService from '../../../../../../common/services/axiosService';
import Failure from '../../../../../../common/entities/Failure';
import { LessonState } from '../redux/lessonSlice';

export type UpdateLessonReq = {
  lessonTitle: string;
  description: string;
  videoTitle: string;
  file: FileList;
};

export const apiUpdateLesson = async (
  lessonId: number,
  lessonData: UpdateLessonReq,
): ApiResponse<Lesson> => {
  try {
    const formData = new FormData();
    formData.append('file', lessonData.file[0]);
    formData.append('lessonTitle', lessonData.lessonTitle);
    formData.append('description', lessonData.description);
    formData.append('videoTitle', lessonData.videoTitle);

    const response = await axiosService.put(
      `/TEACHER/api/lesson/update/${lessonId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
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

export const updateLesson = createAsyncThunk(
  'lessons/updateLesson',
  async ({
    lessonId,
    lessonData,
  }: {
    lessonId: number;
    lessonData: UpdateLessonReq;
  }) => {
    return await apiUpdateLesson(lessonId, lessonData);
  },
);

const handleUpdateLesson = (builder: ActionReducerMapBuilder<LessonState>) => {
  builder
    .addCase(updateLesson.pending, (state) => {
      state.updateLessonPage.status = 'loading';
    })
    .addCase(updateLesson.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.updateLessonPage.status = 'failed';
        state.updateLessonPage.error = action.payload.error.message;
      } else {
        state.updateLessonPage.status = 'succeeded';
        state.updateLessonPage.data = action.payload.data;
      }
    })
    .addCase(updateLesson.rejected, (state, action) => {
      state.updateLessonPage.status = 'failed';
      state.updateLessonPage.error = action.error.message;
    });
};
export default handleUpdateLesson;
