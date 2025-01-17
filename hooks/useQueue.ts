import { useQuery } from "@tanstack/react-query";
//import ky from "ky";
import { log } from "node:console";
import { Queue } from "@/types";

export const getQueue = async () => {
  const res = await fetch('http://127.0.0.1:3005/tasks/queue');
   console.log('get queue', res)
  return res;
};

export const useQueue = () =>
  useQuery<Queue[]>({
    queryKey: ["queue"],
    queryFn: () => getQueue(),
  });
