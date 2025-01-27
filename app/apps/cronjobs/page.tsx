"use client";
import DataTables from "@/componetes/DataTable/DataTable";
import { PageContainer } from "@/componetes/PageContainer/PageContainer";
import { useCronjob, useDeleteCronjob, useUpdateCronJob } from "@/hooks/useCronjob";
import useFetchData from "@/hooks/useFetchData";
import { CronJob } from "@/types";
import {
  ActionIcon,
  Anchor,
  Group,
  Switch,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { DataTable, DataTableProps } from "mantine-datatable";

const items = [
  { title: "Dashboard", href: "/" },
  { title: "Apps", href: "#" },
  { title: "Cron Job", href: "/apps/cronjob" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

export default function Cronjob() {
  const {
    data: record,
    isError: error,
    isFetching,
    isLoading: loading,
  } = useCronjob();
  const { mutateAsync: deleteTask, isSuccess: isDeleteSuccess } =
    useDeleteCronjob();
  const { mutateAsync: updateCronJob, isSuccess: isUpdateSuccess } =
    useUpdateCronJob();

  const openDeleteModal = (item: any) =>
    modals.openConfirmModal({
      title: "Delete Cron-Job",
      size: "sm",
      radius: "md",
      withCloseButton: false,
      centered: true,
      children: (
        <Text size="sm">Are your sure to delete cron-job? : {item.name}</Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => confirmDelete(item.name),
    });

  const onChangeEnable = (item: any) =>
    modals.openConfirmModal({
      title: "Update Cron-Job",
      size: "sm",
      radius: "md",
      withCloseButton: false,
      centered: true,
      children: (
        <Title order={5}>
          Are your sure to{" "}
          <Text span c="red" inherit>{`${
            item.enable ? "disable" : "enable"
          } `}</Text>{" "}
          cron-job?
        </Title>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => confirmUpdateJob(item),
    });

  const confirmUpdateJob = async (item: any) => {
    await updateCronJob(item)
  };

  const confirmDelete = async (name: any) => {
    await deleteTask(name);
    if (isDeleteSuccess) {
      notifications.show({
        id: "delete-job",
        title: "Delete Cron-Job",
        message: "Task delete sucessfully.",
        withCloseButton: false,
        loading: false,
        autoClose: 3000,
      });
    }
  };

  const columns = [
    {
      accessor: "name",
      render: (item: any) => <Text>#{item.name}</Text>,
    },
    {
      accessor: "time",
      sortable: true,
      render: (item: any) => <Text>{item.time}</Text>,
    },
    {
      accessor: "last",
      sortable: true,
      render: (item: any) => <Text>{item.last}</Text>,
    },
    {
      accessor: "next",
      sortable: true,
      render: (item: any) => <Text>{item.next}</Text>,
    },
    // {
    //   accessor: 'status',
    //   sortable: true,
    //   render: (item: TaskSchedule) => (
    //     <StatusBadge status={item.enable ? 'active' : 'inactive'} />
    //   ),

    //   render: (item: any) => <Text>{item.enable ? 'Active' : 'Inactive'}</Text>,
    // },
    // {
    //   accessor: 'issue_date',
    // },
    {
      accessor: "",
      title: "Actions",
      render: (item: any) => (
        <Group gap="sm">
          <Tooltip label="Update task">
            <Switch
              size="xs"
              checked={item.enable}
              onLabel="ON"
              onChange={() => onChangeEnable(item)}
            />
          </Tooltip>

          <Tooltip label="Delete task">
            <ActionIcon>
              <IconTrash size={18} onClick={() => openDeleteModal(item)} />
            </ActionIcon>
          </Tooltip>
        </Group>
      ),
    },
  ];

  return (
    <PageContainer
      title="Cron Job"
      subtitle="Job Schedule"
      breadcrumbItems={items}
    >
      <DataTables
        data={record}
        error={error}
        loading={loading}
        column={columns}
      />
    </PageContainer>
  );
}
