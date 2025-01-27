import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
//import ky from "ky";
import { CronJob, Queue } from "@/types";
import { deleteCronJobFn, getCronJobFn, updateCronJobFn } from "@/services/api/cronjobApi";
import queryClient from "./queryClient";

//UPDATE hook (put user in api)
export const useUpdateCronJob = () => {
  // const queryClient = useQueryClient();
   return useMutation({
     mutationFn: async (job: CronJob) => updateCronJobFn(job),
     //client side optimistic update
     onMutate: async (newjob) => {     
       queryClient.setQueryData(["jobs"], (prev: any) => [...prev, newjob]);
       console.log("mutation update:", newjob);     
     },
     onSuccess: (newjob) => {
      // queryClient.setQueryData(["jobs"], (prev: any) => [...prev, newjob]);
      //  queryClient.setQueryData(["cronjob"], (prevcronjob: any) =>
      //    prevcronjob?.map((job: any) => job.name == newjob.name ? newjob : prevcronjob )
      //  );
       console.log("mutation sucess:", newjob);
     },
     onError: (err, newTodo, context) => {
       console.log("mutation error:", err);
       const prevcronjob = queryClient.getQueryData(["cronjob"]);
       queryClient.setQueryData(['cronjob'], prevcronjob)
     },
     onSettled: () => queryClient.invalidateQueries({ queryKey: ['cronjob'] }),
   });
 };
 
 //DELETE hook (delete user in api)
 export const useDeleteCronjob = () => {
   const queryClient = useQueryClient();
   return useMutation({
     mutationFn: async (taskName) => deleteCronJobFn(taskName),
     
     //client side optimistic update
     onSuccess: (jobName) => {
       queryClient.setQueryData(['cronjob'], (prevJobs:any) =>
         prevJobs?.filter((task:any) => task.id !== jobName),
       );
     },
     onMutate: () => {
       console.log("mutation please wait....:");
     },
      onSettled: () => queryClient.invalidateQueries({ queryKey: ['cronjob'] }), //refetch users after mutation, disabled for demo
   });
 };
 

export const useCronjob = () =>
  useQuery<CronJob[]>({
    queryKey: ["cronjob"],
    queryFn: () => getCronJobFn()
  });
