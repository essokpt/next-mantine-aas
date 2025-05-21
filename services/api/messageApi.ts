import { api } from "../axiosInstance";

const endpoint = "/message";

//export const getCustomer = (url: string) =>  axios.get(url).then((res) => res.data);
export async function getStreamMessageFn(filename: string) {
  try {
    const response = await api.get(`${endpoint}/fileStream/${filename}`, {
      responseType: "blob",
    });
    const res = await response.data;
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function getMessageFn() {
  try {
    const response = await api.get(endpoint);
    const res = await response.data;

    console.log('get message array', res);
    
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function findMessageFn(id: any) {
  try {
    const response = await api.get(`${endpoint}/${id}`);
    const res = await response.data;
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function uploadMessageFn(files: any) {
  try {
   
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    const response = await api.post(endpoint, files,
      {
        headers: headers 
    });
    
    const res = await response.data;
    console.log('createMessageFn:',response);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function updateMessageFn(data: any) {
 // return { data } = await api.patch(endpoint, data);
  try {
    const response = await api.patch(endpoint, data);
    
    const res = await response.data;
    console.log("update Message", res);
     return res;
  } catch (error:any) {
    console.error('error',error.message);
    return error
  }
}

export async function deleteMessageFn(name: any) {
  // console.error('login',data);
  try {
    const response = await api.delete(`${endpoint}/${name}`);
    console.log("delete message", response.status);
    return response;
  } catch (error) {
    console.error(error);
  }
}
