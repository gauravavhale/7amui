import axios from "axios";

axios.interceptors.request.use(function (request) {
    // Do something before request is sent
    request.headers.Authorization=sessionStorage.token
    return request;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export class ServerCall{
    static sendGetReq(url){
        return axios.get(url)
    }
    static sendPostReq(url,data){
        return axios.post(url,data)
    }
    static sendPutReq(url,data){
        return axios.put(url,data)
    }
    static sendDeleteReq(url){
        return axios.delete(url)
    }
}