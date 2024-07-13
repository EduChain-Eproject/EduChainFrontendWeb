import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CourseState } from '../courseSlice';
import { deactivateCourse } from '../courseActions';

const handleDeactivateCourse = (builder: ActionReducerMapBuilder<CourseState>) => {
    builder
        .addCase(deactivateCourse.pending, (state) => {
            state.deactivateCoursePage.status = 'loading';
        })
        .addCase(deactivateCourse.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.deactivateCoursePage.status = 'failed';
                state.deactivateCoursePage.error = action.payload.error;
            } else {
                state.deactivateCoursePage.status = 'succeeded';
                state.listCoursesPage.data?.filter(course => course.id !== action.meta.arg);

                // data setted here
                const { data } = state.courseDetailPage;
                if (data) {
                    state.courseDetailPage.data = {
                        ...data,
                        status: data.status === 'DEACTIVATED' ? 'APPROVED' : 'DEACTIVATED'
                    };
                }

            }
        })
        .addCase(deactivateCourse.rejected, (state, action) => {
            state.deactivateCoursePage.status = 'failed';
            state.deactivateCoursePage.error = action.error.message;
        });
};

export default handleDeactivateCourse;
