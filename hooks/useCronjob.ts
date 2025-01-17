import { useQuery } from "@tanstack/react-query";
//import ky from "ky";
import { log } from "node:console";
import { CronJob, Queue } from "@/types";

export const getCreonJob = async () => {
  const res = await fetch('http://127.0.0.1:3005/tasks/cronjobs');
   console.log('get queue', res)
  return res;
};

export const useCronjob = () =>
  useQuery<CronJob[]>({
    queryKey: ["cronjob"],
    queryFn: () => getCreonJob(),
  });
