"use client";
import DataTables from "@/components/DataTable/DataTable";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { useDeleteQueue, useQueue } from "@/hooks/useQueue";
import { Queue } from "@/types";
import { ActionIcon, Badge, Group, Text, Tooltip } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { DataTableProps } from "mantine-datatable";
import { useEffect } from "react";

export default function Queues() {
  const { mutateAsync: deleteQueue, isSuccess: isDeleteSuccess } =
      useDeleteQueue();

  const columns: DataTableProps<Queue>["columns"] = [
    {
      accessor: "id",
      render: (item: any) => <Text>#{item.id}</Text>,
    },
    {
      accessor: "taskName",
      render: (item: any) => <Text>{item.data.taskName}</Text>,
    },
    {
      accessor: "fileName",
      sortable: true,
      render: (item: any) => <Text>{item.data.fileName}</Text>,
    },
    {
      accessor: "schedule",
      sortable: true,
      render: (item: any) => <Text>{item.data.schedule}</Text>,
    },
    {
      accessor: "chanel",
      sortable: true,
      render: (item: any) => <Text>{item.data.chanel}</Text>,
    },
    {
      accessor: "attempts",
      sortable: true,
      render: (item: any) => <Text>{item.opts.attempts}</Text>,
    },
    {
      accessor: "delay",
      sortable: true,
      render: (item: any) => <Text>{item.opts.delay}</Text>,
    },
    {
      accessor: "status",
      sortable: true,
      render: (item: Queue) =>
        item.processedOn ? (
          <Badge color="pink">Active</Badge>
        ) : (
          <Badge color="cyan">Waiting</Badge>
        ),
    },
    {
      accessor: "",
      title: "Actions",
      render: (item: any) => (
        <Group gap="sm">
        
          <Tooltip label="Delete Queue">
            <ActionIcon>
              <IconTrash size={18} onClick={() => openDeleteModal(item)} />
            </ActionIcon>
          </Tooltip>
        </Group>
      ),
    },
  ];

  const {
    data: record,
    isError: error,
    isFetching,
    isLoading: loading,
  } = useQueue();

  const openDeleteModal = (item: any) =>
    modals.openConfirmModal({
      title: "Delete Queue",
      size: "md",
      radius: "md",
      withCloseButton: false,
      centered: true,
      children: (
        <>
          <Text size="sm">Are you sure to delete this queue? {item.name}</Text>
        </>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => confirmDelete(item.id),
    });

  const confirmDelete = async (id: any) => {
    await deleteQueue(id);

    console.log("delete message");
  };

  useEffect(() => {
    // interval.start();
    //return interval.stop;
  }, []);

  return (
    <PageContainer title="Queue Annoucement">
      <DataTables
        data={record}
        error={error}
        loading={loading}
        column={columns}
        // onRowDelete={() => openDeleteModal(item)}
      />
    </PageContainer>
  );
}
