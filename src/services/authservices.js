import axiosinrtance from '../apis/axiosInstance';
const signup=async (data) => {
    return await axiosinrtance.post(API_ENDPOINTS.SIGNUP, data);
},
const signin=async (data) => {
    return await axiosinrtance.post(API_ENDPOINTS.SIGNIN, data);
}
