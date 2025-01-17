"use client";
import { PageContainer } from "@/componetes/PageContainer/PageContainer";
import TaskScheduleTable from "@/componetes/TaskScheduleTable/TaskScheduleTable";
import { TaskSchedule } from "@/types";
import {
  Anchor,
  Button,
  Group,
  Modal,
  Switch,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { DataTable } from "mantine-datatable";
import { useState } from "react";
import { useForm } from "@mantine/form";
import useFetchData from "@/hooks/useFetchData";

const items = [
  { title: "Dashboard", href: "/" },
  { title: "Apps", href: "#" },
  { title: "Tasks", href: "/apps/tasks" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

export default function Tasks() {
  const [opened, setOpen] = useState(false);

  const {
    data: record,
    loading,
    error,
    refetch,
    abort,
  } = useFetch<TaskSchedule[]>("http://127.0.0.1:3005/tasks");

  const form = useForm({
    mode: "uncontrolled",
    name: "task-form",
    initialValues: {
      name: "",
      description: "",
      time: "",
      fileName: "",
      enable: true,
    },
  });

  // const {
  //   data: ordersData,
  //   loading: ordersLoading,
  //   error: ordersError,
  // } = useFetchData('http://127.0.0.1:3005/tasks');

  const handleSubmit = (values: typeof form.values) => {
    console.log("submit task:", values);
  };

  const editTask = (item: any) => {
    form.setValues({
      name: item.name,
      description: item.description,
      time: item.time,
      fileName: item.fileName,
      enable: item.enable,
    });
    setOpen(true);
  };

  return (
    <PageContainer
      title="Tasks"
      subtitle="Taks Schedule"
      breadcrumbItems={items}
      onHandleCreate={() => setOpen(true)}
      createButton
    >
      <TaskScheduleTable data={record} error={false} loading={loading} onRowEdit={(data) => editTask(data)}
      />
      <Modal
        opened={opened}
        onClose={() => setOpen(false)}
        title="Task Schedule"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            withAsterisk
            label="Task Name"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />

          <Textarea
            label="Input label"
            description="Input description"
            key={form.key("description")}
            {...form.getInputProps("description")}
          />

          <TextInput
            withAsterisk
            label="Date Time"
            key={form.key("time")}
            {...form.getInputProps("time")}
          />

          <TextInput
            withAsterisk
            label="File Name"
            key={form.key("fileName")}
            {...form.getInputProps("fileName")}
          />

          {/* <FileInput
            label="Input label"
            description="Input description"

            key={form.key('fileName')}
            {...form.getInputProps('fileName')}
            onChange={(value) => value?.name}
          /> */}

          <Switch
            mt="md"
            label="Enable Now."
            key={form.key("enable")}
            {...form.getInputProps("enable", { type: "checkbox" })}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
    </PageContainer>
  );
}
