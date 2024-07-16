// import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
// import ApiResponse from '../../../../../../common/entities/ApiResponse';
// import Failure from '../../../../../../common/entities/Failure';
// import { Question } from '../../../../../../common/entities/Question';
// import axiosService from '../../../../../../common/services/axiosService';
// import { HomeworkState } from '../redux/homeworkSlice';

// export const apiGetHomeworkQuestions = async (
//   homeworkId: number,
// ): ApiResponse<Question[]> => {
//   try {
//     const response = await axiosService.get(
//       `/TEACHER/api/homework/questions/${homeworkId}`,
//     );
//     return { data: response.data };
//   } catch (error) {
//     return {
//       error: new Failure(error.response.data.message, error.response.status),
//     };
//   }
// };

// export const getHomeworkQuestions = createAsyncThunk(
//   'homework/getHomeworkQuestions',
//   async (homeworkId: number) => {
//     return await apiGetHomeworkQuestions(homeworkId);
//   },
// );

// const handleGetHomeWorkQuestions = (
//   builder: ActionReducerMapBuilder<HomeworkState>,
// ) => {
//   builder
//     .addCase(getHomeworkQuestions.pending, (state) => {
//       state.homeworkQuestionsPage.status = 'loading';
//     })
//     .addCase(getHomeworkQuestions.fulfilled, (state, action) => {
//       if (action.payload.error) {
//         state.homeworkQuestionsPage.status = 'failed';
//         state.homeworkQuestionsPage.error = action.payload.error.message;
//       } else {
//         state.homeworkQuestionsPage.status = 'succeeded';
//         state.homeworkQuestionsPage.data = action.payload.data;
//       }
//     })
//     .addCase(getHomeworkQuestions.rejected, (state, action) => {
//       state.homeworkQuestionsPage.status = 'failed';
//       state.homeworkQuestionsPage.error = action.error.message;
//     });
// };

// export default handleGetHomeWorkQuestions;
