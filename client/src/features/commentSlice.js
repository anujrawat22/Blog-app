import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const selectToken = (state) => state.auth.token

const initialState = {
    comments: [],
    loading: false,
    error: null
}
const apiurl = process.env.REACT_APP_API_URL

export const fetchCommentForPost = createAsyncThunk("/comments/all",
    async (postId) => {
        const response = await axios.get(`${apiurl}/comments/all/${postId}`)
        return response.data.data
    }
)

export const addComment = createAsyncThunk(
    '/comments/addComment',
    async (data, { getState }) => {
        const token = selectToken(getState())
        console.log(token)
        const response = await axios.post(`${apiurl}/comments/create`, data, {
            headers: { Authorization: `bearer ${token}` }
        });
        return response.data.data;
    }
);

export const deleteComment = createAsyncThunk(
    '/comments/deleteComment',
    async (commentId) => {
        await axios.delete(`${apiurl}/comments/delete/${commentId}`);
        return commentId;
    }
);

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentForPost.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchCommentForPost.fulfilled, (state, action) => {
                state.comments = action.payload;
            })
            .addCase(fetchCommentForPost.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(addComment.pending, (state, action) => {
                state.loading = true
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.comments.push(action.payload);
            })
            .addCase(addComment.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(deleteComment.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter((comment) => comment._id !== action.payload);
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.error = action.error.message
            })
    }
})


export default commentSlice.reducer