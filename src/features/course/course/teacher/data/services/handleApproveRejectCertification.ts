import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';
import axiosService from '../../../../../../common/services/axiosService';
import { CourseState } from '../redux/courseSlice';
import { Certification } from '../../../../../../common/entities/Certification';

export enum CertificationAction {
    APPROVE = 'APPROVE',
    REJECT = 'REJECT',
}

export const apiApproveRejectCertification: (
    certificationId: number,
    action: CertificationAction,
    comments?: string
) => ApiResponse<Certification> = async (certificationId, action, comments) => {
    try {
        const response = await axiosService.post(
            `/TEACHER/api/certification/approve_or_reject/${certificationId}`,
            {
                updatingCertificationStatus: action,
                comments
            }
        );
        return { data: response.data };
    } catch (error) {
        return {
            error: new Failure(error.response.data.message, error.response.status),
        };
    }
};

export const approveRejectCertification = createAsyncThunk(
    'courses/approveRejectCertification',
    async ({ certificationId, action, comments }: { certificationId: number; action: CertificationAction, comments?: string }) => {
        return await apiApproveRejectCertification(certificationId, action, comments);
    },
);

const handleApproveRejectCertification = (
    builder: ActionReducerMapBuilder<CourseState>,
) => {
    builder
        .addCase(approveRejectCertification.pending, (state) => {
            state.courseDetailPage.status = 'approving or rejecting';
        })
        .addCase(approveRejectCertification.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.courseDetailPage.status = 'approve or reject failed';
                state.courseDetailPage.error = action.payload.error.message;
            } else {
                state.courseDetailPage.status = 'succeeded';
                const updatedCertification = action.payload.data;
                console.log(updatedCertification);

                if (updatedCertification) {
                    const index = state.courseDetailPage.data?.certifiedParticipantDtos?.findIndex(
                        (cert) => cert.id === updatedCertification.id
                    );
                    if (index !== undefined && index !== -1 && state.courseDetailPage.data?.certifiedParticipantDtos) {
                        state.courseDetailPage.data.certifiedParticipantDtos[index] = updatedCertification;
                    }
                }
                console.log(state.courseDetailPage.data);

            }
        })
        .addCase(approveRejectCertification.rejected, (state, action) => {
            state.courseDetailPage.status = 'failed';
            state.courseDetailPage.error = action.error.message;
        });
};

export default handleApproveRejectCertification;