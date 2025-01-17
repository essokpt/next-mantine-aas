"use client";
import DataTables from "@/componetes/DataTable/DataTable";
import { PageContainer } from "@/componetes/PageContainer/PageContainer";
import { useCronjob } from "@/hooks/useCronjob";
import { CronJob } from "@/types";
import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { DataTableProps } from "mantine-datatable";

const columns: DataTableProps<CronJob>['columns'] = [
    
  {
    accessor: 'name',
    render: (item: any) => <Text>#{item.name}</Text>,
  },
  {
    accessor: 'time',
    sortable: true,
    render: (item: any) => <Text>{item.time}</Text>,
  },
  {
    accessor: 'last',
    sortable: true,
    render: (item: any) => <Text>{item.last}</Text>,
  },
  {
    accessor: 'next',
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

export default function Cronjob() {
  // const {
  //   data: record,
  //   loading,
  //   error,
  //   refetch,
  //   abort,
  // } = useFetch<CronJob[]>("http://127.0.0.1:3005/tasks/cronjobs");
    const { data:record, isError:error, isFetching, isLoading:loading } = useCronjob();
  
  return (
    <PageContainer title="Cron Job">
      <DataTables data={record} error={error} loading={loading} column={columns}/>
    </PageContainer>
  );
}
