import axios from "axios";

const api =axios.create({
    baseURL:"http:localhost:5000/api",}); //api url calling
    //register new user
    export const createUser =(fromData) => axios.post('${api}/createUser',FormData);
    // all user
    export const getUsers =(fromData)=> axios.get('${api}/getUser',FromData);

    export default api;