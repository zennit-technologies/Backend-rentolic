import * as types from '../Constants/index';
import axios from 'axios';

const getBlogs = (blogs) => ({
    type : types.GET_BLOGS,
    payload : blogs,
});

const blogAdded = () => ({ 
    type : types.ADD_BLOG,
});

const blogDeleted = () => ({
    type : types.DELETE_BLOG,
})

const getBlog = (blog) => ({
    type : types.GET_SINGLE_BLOG,
    payload: blog,
})

const blogUpdated = () => ({
    type : types.UPDATE_BLOG,
});

// get all categoryes
export const loadBlogs = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/blogs`)
        .then((res) => {
            console.log("reponse categoryes:", res);
            dispatch(getBlogs(res.data))
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// delete admin by id
export const deleteBlog = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_IPURL}/api/admin/blogs/${id}`)
        .then((res) => {
            console.log("delete response :", res);
            dispatch(blogDeleted(res.data));
            dispatch(loadBlogs());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// add admin
export const addBlog = (blog) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/api/admin/blogs`, blog)
        .then((res) => {
            console.log("added amenities response :", res);
            dispatch(blogAdded(res.data));
            dispatch(loadBlogs());
        }) 
        .catch((error) => {
            console.log(error);
        })
    };
};

// find admin by id
export const getSingleBlog = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/blogs/${id}`)
        .then((res) => {
            console.log("single admin response :", res);
            dispatch(getBlog(res.data));
        })
        .catch((error) => {
            console.log(error);
        })
    };
}; 
 
// update by admin 
export const updateBlog = (blog, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/blogs/${id}`, blog)
        .then((res) => {
            console.log("updated admin response :", res);
            dispatch(blogUpdated());
            dispatch(loadBlogs());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};