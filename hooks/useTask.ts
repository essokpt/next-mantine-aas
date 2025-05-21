import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TaskSchedule } from "@/types";
import {
  createTaskFn,
  deleteTaskFn,
  getTasksFn,
  updateTaskFn,
} from "@/services/api/taskApi";
import queryClient from "./queryClient";

//CREATE hook (post new user to api)
const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTask: TaskSchedule) => createTaskFn(newTask),
    onSuccess: (newTask: any) => {
      console.log("mutation onsucess:", newTask);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.log("mutation onError:", error.message);
    },
    //client side optimistic update
    onMutate: (newTask: TaskSchedule) => {
      console.log("mutation create...:");
    },
    //refetch after mutation, disabled for demo
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });
};

//UPDATE hook (put user in api)
const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (task: TaskSchedule) => updateTaskFn(task),
    //client side optimistic update
    onMutate: async (newTask) => {     
      //queryClient.setQueryData(["tasks"], (prev: any) => [...prev, newTask]);
      console.log("mutation update:", newTask);     
    },
    onSuccess: (newTask) => {
      console.log("update success:");     
    //  // queryClient.setQueryData(["tasks"], (prev: any) => [...prev, newTask]);
    //   queryClient.setQueryData(["tasks"], (prevTasks: any) => {
    //     console.log("prevTasks:", prevTasks)
    //     prevTasks?.map((task: any) => task.id == newTask.id ? prevTasks: newTask )
    // });
    },
    onError: (err, newTodo, context) => {
      console.log("mutation error:", err);
      const prevTasks = queryClient.getQueryData(["tasks"]);
      queryClient.setQueryData(['tasks'], prevTasks)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });
};

//DELETE hook (delete user in api)
const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskName) => deleteTaskFn(taskName),
    
    //client side optimistic update
    onSuccess: (jobName) => {
      queryClient.setQueryData(['tasks'], (prevJobs:any) =>
        prevJobs?.filter((task:any) => task.id !== jobName),
      );
    },
    onMutate: () => {
      console.log("mutation please wait....:");
    },
     onSettled: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }), //refetch users after mutation, disabled for demo
  });
};

const useGetTasks = () =>
  useQuery<TaskSchedule[]>({
    queryKey: ["tasks"],
    queryFn: () => getTasksFn(),
  });

export { useGetTasks, useCreateTask, useUpdateTask, useDeleteTask };
