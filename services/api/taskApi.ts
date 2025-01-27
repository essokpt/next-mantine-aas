import { api } from "../axiosInstance";

const endpoint = "/tasks";

//export const getCustomer = (url: string) =>  axios.get(url).then((res) => res.data);

export async function getTasksFn() {
  try {
    const response = await api.get(endpoint);
    const res = await response.data;
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function findTaskFn(id: any) {
  try {
    const response = await api.get(`${endpoint}/${id}`);
    const res = await response.data;
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function createTaskFn(data: any) {
  try {
    const newTask = {
      //id : 100,
      name : data.name,
      description : data.description,
      time : data.time,
      fileName : data.fileName,
      enable : data.enable,
      repeat : false
    }
    const response = await api.post(endpoint, newTask);
    const res = await response.data;
    console.log('createTaskFn:',response);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function updateTaskFn(data: any) {
 // return { data } = await api.patch(endpoint, data);
  try {
    const response = await api.patch(endpoint, data);
    
    const res = await response.data;
    console.log("update Task", res);
     return res;
  } catch (error:any) {
    console.error('error',error.message);
    return error
  }
}

export async function deleteTaskFn(name: any) {
  // console.error('login',data);
  try {
    const response = await api.delete(`${endpoint}/${name}`);
    console.log("delete Task", response.status);
    return response;
  } catch (error) {
    console.error(error);
  }
}
