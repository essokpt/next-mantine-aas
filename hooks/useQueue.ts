import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
//import ky from "ky";
import { log } from "node:console";
import { Queue } from "@/types";
import { deleteQueueFn, getQueueFn } from "@/services/api/queueApi";

 //DELETE hook (delete user in api)
 export const useDeleteQueue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => deleteQueueFn(id),
    
    //client side optimistic update
    onSuccess: (queueId) => {
      queryClient.setQueryData(['queue'], (prevJobs:any) =>
        prevJobs?.filter((task:any) => task.id !== queueId),
      );
    },
    onMutate: () => {
      console.log("mutation please wait....:");
    },
     onSettled: () => queryClient.invalidateQueries({ queryKey: ['queue'] }), //refetch users after mutation, disabled for demo
  });
};


export const useQueue = () =>
  useQuery<Queue[]>({
    queryKey: ["queue"],
    queryFn: () => getQueueFn(),
    refetchInterval: 2200
  });
