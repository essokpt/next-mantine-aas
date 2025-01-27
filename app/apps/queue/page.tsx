"use client";
import DataTables from "@/componetes/DataTable/DataTable";
import { PageContainer } from "@/componetes/PageContainer/PageContainer";
import { useQueue } from "@/hooks/useQueue";
import { useCreateTask } from "@/hooks/useTask";
import { Queue } from "@/types";
import { ActionIcon, Badge, Group, Text, Tooltip } from "@mantine/core";
import { useFetch, useInterval } from "@mantine/hooks";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { DataTableProps } from "mantine-datatable";
import { useEffect } from "react";


const columns: DataTableProps<Queue>['columns'] = [
  {
    accessor: 'id',
    render: (item: any) => <Text>#{item.id}</Text>,
  },
  {
    accessor: 'taskName',
    render: (item: any) => <Text>{item.data.taskName}</Text>,
  },
  {
    accessor: 'fileName',
    sortable: true,
    render: (item: any) => <Text>{item.data.fileName}</Text>,
  },
  {
    accessor: 'schedule',
    sortable: true,
    render: (item: any) => <Text>{item.data.schedule}</Text>,
  },
  {
    accessor: 'attempts',
    sortable: true,
    render: (item: any) => <Text>{item.opts.attempts}</Text>,
  },
  {
    accessor: 'delay',
    sortable: true,
    render: (item: any) => <Text>{item.opts.delay}</Text>,
  },
  {
    accessor: 'status',
    sortable: true,
    render: (item: Queue) => (
      item.processedOn ?    
        ( <Badge color="pink">Active</Badge>)
        : (
          <Badge color="cyan">Waiting</Badge>
        )
         
         ),

  },
  {
    accessor: '',
    title: 'Actions',
    render: (item: any) => (
      <Group gap="sm">
        <Tooltip label="Edit job">
          <ActionIcon>
            <IconEdit size={18}
            // onClick={() => onRowEdit(item)}
             />

          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete task">
          <ActionIcon>
            <IconTrash size={18} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="View invoice details">
          <ActionIcon
            // onClick={() =>
            //   router.push(PATH_INVOICES.invoices.invoice_details(item.id))
            // }
          >
            <IconEye size={18} />
          </ActionIcon>
        </Tooltip>
      </Group>
    ),
  },
];

export default function Queues() {
  // const {
  //   data: record,
  //   loading,
  //   error,
  //   refetch,
  //   abort,
  // } = useFetch<Queue[]>("http://127.0.0.1:3005/tasks/queue");

  const { data:record, isError:error, isFetching, isLoading:loading } = useQueue();


  // const interval = useInterval(
  //   () => {
  //     console.log('Refesh queue');
  //     refetch();
  //   },
  //   2200,
  //   { autoInvoke: true }
  // );

  useEffect(() => {
   // interval.start();
    //return interval.stop;
  }, []);

  return (
    <PageContainer title="Queue Annoucement">
      <DataTables data={record} error={error} loading={loading} column={columns}/>
    </PageContainer>
  );
}
