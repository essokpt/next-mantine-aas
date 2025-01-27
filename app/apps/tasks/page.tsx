"use client";
import { PageContainer } from "@/componetes/PageContainer/PageContainer";
import TaskScheduleTable from "@/componetes/TaskScheduleTable/TaskScheduleTable";
import { Cron } from "react-js-cron-mantine";
import {
  Alert,
  Anchor,
  Button,
  CheckIcon,
  Group,
  Input,
  LoadingOverlay,
  Modal,
  Notification,
  Switch,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";

import { useState } from "react";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";

import {
  useCreateTask,
  useDeleteTask,
  useGetTasks,
  useUpdateTask,
} from "@/hooks/useTask";
import { repeat } from "lodash";

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
  const [onLoading, setOnLoading] = useState(false);
  const [timeschedule, setTimeschedule] = useState("* * * * * *");

  const {
    data: record,
    isError: error,
    isFetching,
    isLoading: loading,
  } = useGetTasks();
  const { mutateAsync: createTask, isSuccess: isCreateSuccess } =
    useCreateTask();
  const { mutateAsync: deleteTask, isSuccess: isDeleteSuccess } =
    useDeleteTask();
  const {
    mutateAsync: updateTask,
    isSuccess: isUpdateSuccess,
    error: updateError,
    isError: isUpdateError,
  } = useUpdateTask();

  const form = useForm({
    mode: "uncontrolled",
    name: "task-form",
    initialValues: {
      id: 0,
      name: "",
      description: "",
      time: "",
      fileName: "",
      enable: true,
      repeat: false,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    values.time = timeschedule;
    setOnLoading(true);
    console.log("submit task:", values);

    if (values.id > 0) {
      console.log("Update task:", values);
      await updateTask(values);
    } else {
      await createTask(values);
      console.log("Create task:", values);
    }
    // if (isUpdateSuccess) {
    // }

    // if (isCreateSuccess) {
    //   notifications.update({
    //     id: "create-task",
    //     color: "teal",
    //     title: "Create success.",
    //     message:
    //       "Notification will close in 2 seconds, you can close this notification now",
    //     icon: <IconCheck className="w-[2rem]" />,
    //     loading: false,
    //     autoClose: 2000,
    //   });
    // }

    setTimeout(() => {
      //  console.log("update error...", updateError);
      if (!isUpdateError) {
        setOnLoading(false);
        form.reset();
        setOpen(false);
      }
      setOnLoading(false);
    }, 2000);
  };

  const editTask = (item: any) => {
    setTimeschedule(item.time);
    form.setValues({
      id: item.id,
      name: item.name,
      description: item.description,
      time: timeschedule,
      fileName: item.fileName,
      enable: item.enable,
    });
    setOpen(true);
  };

  const openDeleteModal = (item: any) =>
    modals.openConfirmModal({
      title: "Delete Task",
      size: "sm",
      radius: "md",
      withCloseButton: false,
      centered: true,
      children: (
        <Text size="sm">Are your shur to delete task? : {item.name}</Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => confirmDelete(item.name),
    });

  const confirmDelete = async (name: any) => {
    await deleteTask(name);
    // if (isDeleteSuccess) {
    //   notifications.show({
    //     id: "delete-task",
    //     title: "Delete Task",
    //     message: "Task delete sucessfully.",
    //     withCloseButton: false,
    //     loading: false,
    //     autoClose: 3000,
    //   });
    // }
  };

  return (
    <PageContainer
      title="Tasks"
      subtitle="Taks Schedule"
      breadcrumbItems={items}
      onHandleCreate={() => {
        setOpen(true);
        form.reset();
        setTimeschedule("* * * * * *");
      }}
      createButton
    >
      <TaskScheduleTable
        data={record}
        error={false}
        loading={isFetching}
        onRowEdit={(data) => editTask(data)}
        onRowDelete={(data) => openDeleteModal(data)}
      />
      <Modal
        opened={opened}
        onClose={() => {
          setOnLoading(false);
          setOpen(false);
        }}
        title="Task Schedule"
        size="lg"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <LoadingOverlay
          visible={onLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "pink", type: "bars" }}
        />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Input disabled key={form.key("id")} {...form.getInputProps("id")} />

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
            readOnly
            value={timeschedule}
            label="Time Schedule"
            key={form.key("time")}
            {...form.getInputProps("time")}
          />

          <Cron value={timeschedule} setValue={setTimeschedule} />

          <br />
          <TextInput
            withAsterisk
            label="File Name"
            key={form.key("fileName")}
            {...form.getInputProps("fileName")}
          />

          <Switch
            mt="md"
            label="Enable Now."
            key={form.key("enable")}
            {...form.getInputProps("enable", { type: "checkbox" })}
          />

          <Group justify="flex-end" mt="md">
            <Alert
              hidden={!isUpdateError}
              icon={<IconAlertCircle size={16} />}
              title="Bummer!"
              color="red"
            >
              Something terrible happened! You made a mistake and there is no
              going back, your data was lost forever!
            </Alert>

            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
    </PageContainer>
  );
}
