import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { enrollACourse } from '../courseActions';
import { CourseState } from '../courseSlice';

const handleEnrollACourse = (builder: ActionReducerMapBuilder<CourseState>) => {
    builder
        .addCase(enrollACourse.pending, (state) => {
            state.courseDetailPage.status = 'loading';
        })
        .addCase(enrollACourse.fulfilled, (state, action) => {
            state.courseDetailPage.status = 'succeeded';

            if (state.courseDetailPage.data) {
                state.courseDetailPage.data = {
                    ...state.courseDetailPage.data,
                    enrolled: true
                };
            }
        })
        .addCase(enrollACourse.rejected, (state, action) => {
            state.courseDetailPage.status = 'failed';
            state.courseDetailPage.error = action.payload as string;
        });
};

export default handleEnrollACourse;
