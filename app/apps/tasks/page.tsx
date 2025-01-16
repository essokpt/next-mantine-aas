"use client";
import { PageContainer } from "@/componetes/PageContainer/PageContainer";
import TaskScheduleTable from "@/componetes/TaskScheduleTable/TaskScheduleTable";
import { TaskSchedule } from "@/types";
import { useFetch } from "@mantine/hooks";
import { DataTable } from "mantine-datatable";

const initTaskSchedule = {
  name: "",
  description: "",
  fileName: "",
  time: "",
  enable: false,
};
export default function Tasks() {
  const {
    data: record,
    loading,
    error,
    refetch,
    abort,
  } = useFetch<TaskSchedule[]>("http://127.0.0.1:3005/tasks");
  return (
    <PageContainer title="Tasks">
      <TaskScheduleTable data={record} error={false} loading={loading} />
    </PageContainer>
  );
}
