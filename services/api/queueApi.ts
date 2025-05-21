import { api } from "../axiosInstance";

const endpoint = "/tasks/queue";

//export const getCustomer = (url: string) =>  axios.get(url).then((res) => res.data);

export async function getQueueFn() {
  try {
    const response = await api.get(endpoint);
    const res = await response.data;
    return res;
  } catch (error) {
    console.error(error);
  }
}



export async function deleteQueueFn(name: any) {
  // console.error('login',data);
  try {
    const response = await api.delete(`${endpoint}/${name}`);
    console.log("delete Task", response.status);
    return response;
  } catch (error) {
    console.error(error);
  }
}
