import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import axios from 'axios'

export const api = axios.create({
  baseURL: "http://127.0.0.1:3005",
  headers: {
    "Access-Control-Allow-Origin": "*",
    'content-type': 'application/json',
    'Accept': 'application/json',
  }

  
  
});
api.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
   notifications.show({
          id: "update-task",
          title: "Update Task",
          message: error.message,
          withCloseButton: false,
          loading: false,
          autoClose: 3000,
        });
  return Promise.reject(error);
});
// Add a response interceptor
api.interceptors.response.use(function (response:any) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // notifications.show({
  //   id: "create-task",
  //   color: "teal",
  //   title: response.message,
  //   message: `Process completed, ${response.message? response.message : ''}`,
   
  //   //icon: < className="w-[2rem]" />,
  //   loading: false,
  //   autoClose: 2000,
  // });
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  //console.log(error);  
  notifications.show({
    id: "update-task",
    title: "Request Error!",
    color: "red",
    message: error.message,
    withCloseButton: true,
    loading: false,
    autoClose: false,
    
  });
  return Promise.reject(error);
});
//export const axios = axios.create();

//axios.defaults.baseURL = `${process.env.VUE_APP_BASE_API}`
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//HTTP.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

