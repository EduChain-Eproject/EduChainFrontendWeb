import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { Certification } from '../../../../common/entities/Certification';
import ApiResponse from '../../../../common/entities/ApiResponse';
import axiosService from '../../../../common/services/axiosService';
import Failure from '../../../../common/entities/Failure';
import { CertificationState } from './certificationSlice';

export const apiGetCertificationDetail: (
    certificationId: number,
) => ApiResponse<Certification> = async (certificationId: number) => {
    try {
        const response = await axiosService.get(
            `/SHARED/api/certification/detail/${certificationId}`,
        );
        return { data: response.data };
    } catch (error) {
        return {
            error: new Failure(error.response.data.message, error.response.status),
        };
    }
};

export const getCertificationDetail = createAsyncThunk(
    'certifications/getCertificationDetail',
    async (certificationId: number) => {
        console.log('calling api');

        return await apiGetCertificationDetail(certificationId);
    },
);

const handleGetCertificationDetail = (
    builder: ActionReducerMapBuilder<CertificationState>,
) => {
    builder
        .addCase(getCertificationDetail.pending, (state) => {
            state.certificationDetailPage.status = 'loading';
        })
        .addCase(getCertificationDetail.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.certificationDetailPage.status = 'failed';
                state.certificationDetailPage.error = action.payload.error.message;
            } else {
                state.certificationDetailPage.status = 'succeeded';
                state.certificationDetailPage.data = action.payload.data;
            }
        })
        .addCase(getCertificationDetail.rejected, (state, action) => {
            state.certificationDetailPage.status = 'failed';
            state.certificationDetailPage.error = action.error.message;
        });
};

export default handleGetCertificationDetail;
