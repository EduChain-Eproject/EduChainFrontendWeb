import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CourseState } from '../courseSlice';
import { changeStatusOfCourse } from '../courseActions';
import { CourseStatusForCensor } from '../../../domain/usecases/GetCoursesByStatus';

const handleChangeCourseStatus = (builder: ActionReducerMapBuilder<CourseState>) => {
    builder
        .addCase(changeStatusOfCourse.pending, (state) => {
            state.changeStatusOfCoursePage.status = 'loading';
        })
        .addCase(changeStatusOfCourse.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.changeStatusOfCoursePage.status = 'failed';
                state.changeStatusOfCoursePage.error = action.payload.error;
            } else {
                state.changeStatusOfCoursePage.status = 'succeeded';

                // data setted here
                const { data } = state.courseDetailPage;
                if (data && action.payload.data) {
                    state.courseDetailPage.data = {
                        ...data,
                        status: action.payload.data?.status
                    };
                }

            }
        })
        .addCase(changeStatusOfCourse.rejected, (state, action) => {
            state.changeStatusOfCoursePage.status = 'failed';
            state.changeStatusOfCoursePage.error = action.error.message;
        });
};

export default handleChangeCourseStatus;
