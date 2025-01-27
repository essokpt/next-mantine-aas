import { api } from "../axiosInstance";

const endpoint = "/tasks/cronjobs";

//export const getCustomer = (url: string) =>  axios.get(url).then((res) => res.data);

export async function getCronJobFn() {
  try {
    const response = await api.get(endpoint);
    const res = await response.data;
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function findCronJobFn(id: any) {
  try {
    const response = await api.get(`${endpoint}/${id}`);
    const res = await response.data;
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function createCronJobFn(data: any) {
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
    console.log('createCronJobFn:',response);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function updateCronJobFn(data: any) {
 // return { data } = await api.patch(endpoint, data);
  try {
    const response = await api.patch(endpoint, data);
    
    const res = await response.data;
    console.log("update cronjob", res);
     return res;
  } catch (error:any) {
    console.error('error',error.message);
    return error
  }
}

export async function deleteCronJobFn(name: any) {
  // console.error('login',data);
  try {
    const response = await api.delete(`${endpoint}/${name}`);
    console.log("delete Task", response.status);
    return response;
  } catch (error) {
    console.error(error);
  }
}
