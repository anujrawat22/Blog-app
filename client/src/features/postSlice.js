import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectToken } from './authSlice';



const apiurl = process.env.REACT_APP_API_URL

const initialState = {
    posts: [],
    selectedPost: null,
    status: 'idle',
    error: null
}




export const fetchAllPosts = createAsyncThunk("/posts/getPosts", async ({ page, order }) => {
    const response = await axios.get(`${apiurl}/posts/getPosts?page=${page}&order=${order}`)
    return response.data.data
})

export const fetchUserPosts = createAsyncThunk('posts/userPost', async (token) => {
    try {
        const response = await axios.get(`${apiurl}/posts/userPost`, {
            headers: { Authorization: `bearer ${token}` }
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data.err
    }
});

export const createNewPost = createAsyncThunk(`posts/create`, async (post, { getState }) => {
    const token = selectToken(getState());
    console.log(post)
    try {
        const response = await axios.post(`${apiurl}/posts/create`, post, { headers: { Authorization: `bearer ${token}` } });
        return response.data.data;
    } catch (error) {
        throw error.response.data.err
    }
});

export const deletePost = createAsyncThunk("posts/delete", async (id, { getState }) => {
    const token = selectToken(getState());
    console.log(token)
    try {
        await axios.delete(`${apiurl}/posts/delete/${id}`, {
            headers: { Authorization: `bearer ${token}` }
        })
        return id
    } catch (error) {
        throw error.response.data.msg;
    }
})

export const fetchPostDetails = createAsyncThunk('posts/fetchPostDetails', async (id) => {
    const response = await axios.get(`${apiurl}/posts/post/${id}`);
    return response.data.data;
});

export const searchPosts = createAsyncThunk('/posts/search', async ({ title, author, page, order }) => {
    let response
    if (title) {
        response = await axios.get(`${apiurl}/posts/search?title=${title}&page=${page}&order=${order}`);
    } else if (author) {
        response = await axios.get(`${apiurl}/posts/search?author=${author}&page=${page}&order=${order}`);
    }
    return response.data.data;
});


export const updatePosts = createAsyncThunk("posts/update",
async()=>{

})


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        selectPost: (state, action) => {
            state.selectedPost = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAllPosts.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchAllPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchUserPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchUserPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createNewPost.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(createNewPost.fulfilled, (state, action) => {
                console.log(action.payload)
                state.status = 'idle'
                state.posts.push(action.payload);
            })
            .addCase(createNewPost.rejected, (state, action) => {
                state.status = 'failed'
                state.status = action.error.message;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter((post) => post._id !== action.payload);
            })
            .addCase(fetchPostDetails.fulfilled, (state, action) => {
                state.selectedPost = action.payload;
            })
            .addCase(searchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(searchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });

    },
})

export const { selectPost } = postSlice.actions

export default postSlice.reducer;