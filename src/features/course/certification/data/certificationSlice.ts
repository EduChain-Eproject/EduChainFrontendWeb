import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonState, initCommonState } from '../../../../common/state';
import { Certification } from '../../../../common/entities/Certification';
import handleGetCertificationDetail from './handleGetCertificationDetail';

export interface CertificationState {
    certificationDetailPage: CommonState<Certification>;
}

const initialState: CertificationState = {
    certificationDetailPage: initCommonState,
};

const certificationSlice = createSlice({
    name: 'certification',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleGetCertificationDetail(builder);
    }
});


export default certificationSlice.reducer;