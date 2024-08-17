// import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
// import { BlogState } from '../BlogCommentSlice';
// import { fetchBlog } from '../blogActions';

// const handleFetchBlog = (builder: ActionReducerMapBuilder<BlogState>) => {
//     builder
//         .addCase(fetchBlog.pending, (state) => {
//             state.status = 'loading';
//         })
//         .addCase(fetchBlog.fulfilled, (state, action) => {
//             if (action.payload.error) {
//                 state.status = 'failed';
//                 state.error = action.payload.error;
//             } else {
//                 state.status = 'succeeded';
//                 state.blogDetail = action.payload.data;
//             }
//         })
//         .addCase(fetchBlog.rejected, (state, action) => {
//             state.status = 'failed';
//             state.error = action.error.message;
//         });
// };

// export default handleFetchBlog;
