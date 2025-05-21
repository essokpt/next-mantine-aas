import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
//import ky from "ky";
import { MessageType } from "@/types";
import { uploadMessageFn, deleteMessageFn, getMessageFn, updateMessageFn, getStreamMessageFn } from "@/services/api/messageApi";

//CREATE hook (post new user to api)
export const useUploadMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (job: any) => uploadMessageFn(job),
    onSuccess: (job: any) => {
      console.log("mutation onsucess:", job);
      queryClient.invalidateQueries({ queryKey: ["message"] });
    },
    onError: (error) => {
      console.log("mutation onError:", error.message);
    },
    //client side optimistic update
    onMutate: (newTask: any) => {
      console.log("mutation create...:");
    },
    //refetch after mutation, disabled for demo
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['message'] }),
  });
};

//UPDATE hook (put user in api)
export const useUpdateMessage = () => {
   const queryClient = useQueryClient();
   return useMutation({
     mutationFn: async (job: MessageType) => updateMessageFn(job),
     //client side optimistic update
     onMutate: async (newjob) => {     
     //  queryClient.setQueryData(["jobs"], (prev: any) => [...prev, newjob]);
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
       const prevcronjob = queryClient.getQueryData(["message"]);
       queryClient.setQueryData(['message'], prevcronjob)
     },
     onSettled: () => queryClient.invalidateQueries({ queryKey: ['message'] }),
   });
 };
 
 export const useStreamMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (message: string) => getStreamMessageFn(message),
    //client side optimistic update
    onMutate: async (newjob) => {     
    //  queryClient.setQueryData(["jobs"], (prev: any) => [...prev, newjob]);
      console.log("mutation stream:", newjob);     
    },
    onSuccess: (file) => {
      const pdfBlob = new Blob([file], { type: "text/plain;charset=utf-8" });
      console.log("mutation sucess:", pdfBlob);
      return file
    },
    // onError: (err, newTodo, context) => {
    //   console.log("mutation error:", err);
    //   const prevcronjob = queryClient.getQueryData(["message"]);
    //   queryClient.setQueryData(['message'], prevcronjob)
    // },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['message'] }),
  });
};

 //DELETE hook (delete user in api)
 export const useDeleteMessage = () => {
   const queryClient = useQueryClient();
   return useMutation({
     mutationFn: async (id) => deleteMessageFn(id),
     
     //client side optimistic update
     onSuccess: (jobName) => {
       queryClient.setQueryData(['message'], (prevJobs:any) =>
         prevJobs?.filter((task:any) => task.id !== jobName),
       );
     },
     onMutate: () => {
       console.log("mutation please wait....:");
     },
      onSettled: () => queryClient.invalidateQueries({ queryKey: ['message'] }), //refetch users after mutation, disabled for demo
   });
 };
 

export const useFetchMessage = () =>
  useQuery<MessageType[]>({
    queryKey: ["message"],
    queryFn: () => getMessageFn()
  });
