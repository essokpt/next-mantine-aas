'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import {
  DataTable,
  DataTableProps,
  DataTableSortStatus,
} from 'mantine-datatable';
import {
  ActionIcon,
  Avatar,
  Badge,
  Flex,
  Group,
  HoverCard,
  MantineColor,
  MultiSelect,
  Stack,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import sortBy from 'lodash/sortBy';
import { AppStatus, TaskSchedule } from '@/types';
import { useDebouncedValue } from '@mantine/hooks';
import {
  IconCloudDownload,
  IconEdit,
  IconEye,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
//import { PATH_INVOICES } from '@/routes';
import  ErrorAlert  from '@/componetes/ErrorAlert';

const PAGE_SIZES = [5, 10, 20];

const ICON_SIZE = 18;

type StatusBadgeProps = {
  status: AppStatus;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  let color: MantineColor = '';

  switch (status) {
    case 'sent':
      color = 'blue';
      break;
    case 'suspended':
      color = 'gray';
      break;
    case 'cancelled':
      color = 'red';
      break;
    case 'disable':
      color = 'red';
      break;
    case 'approved':
      color = 'green.8';
      break;
    case 'active':
      color = 'green.8';
      break;
    case 'pending':
      color = 'cyan.7';
      break;
    default:
      color = 'dark';
  }

  return (
    <Badge color={color} variant="filled" radius="sm">
      {status}
    </Badge>
  );
};

type TaskTableProps = {
  data?: any;
  column? : any;
  error?: any;
  loading?: boolean;
  onRowEdit?: (data:any) => void;
 
};

const DataTables = ({
  data,
  column,
  error,
  loading,
  onRowEdit,  
}: TaskTableProps) => {
  const theme = useMantineTheme();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
  const [records, setRecords] = useState<any[]>();
  // const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
  //   columnAccessor: 'name',
  //   direction: 'desc',
  // });
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const router = useRouter();
  // const statuses = useMemo(() => {
  //   const statuses = new Set(data.map((e) => e.enable));
  //   // @ts-ignore
  //   return [...statuses];
  // }, [data]);

  
  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {    
    const from = (page - 1) * pageSize;
        const to = from + pageSize;
        // const d = sortBy(data, sortStatus.columnAccessor) as TaskSchedule[];
        //const dd = sortStatus.direction === 'desc' ? d.reverse() : d;
        let filtered = data?.slice(from, to) as TaskSchedule[];
        setRecords(filtered);
  }, [ data, page, pageSize, debouncedQuery, selectedStatuses]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
   // const d = sortBy(data, sortStatus.columnAccessor) as TaskSchedule[];
   // const dd = sortStatus.direction === 'desc' ? d.reverse() : d;
   // let filtered = dd.slice(from, to) as any[];

    // if (debouncedQuery || selectedStatuses.length) {
    //   filtered = data
    //     .filter(({ full_name, enable }) => {
    //       if (
    //         debouncedQuery !== '' &&
    //         !full_name
    //           .toLowerCase()
    //           .includes(debouncedQuery.trim().toLowerCase())
    //       ) {
    //         return false;
    //       }

    //       // @ts-ignore
    //       if (
    //         selectedStatuses.length &&
    //         !selectedStatuses.some((s) => s === status)
    //       ) {
    //         return false;
    //       }
    //       return true;
    //     })
    //     .slice(from, to);
    // }

   // setRecords(filtered);
  }, [ data, page, pageSize, debouncedQuery, selectedStatuses]);

  return error ? (
    <ErrorAlert title="Error loading invoices" message={error.toString()} />
  ) : (
    <DataTable
      minHeight={200}
      verticalSpacing="xs"
      striped
      highlightOnHover
      // @ts-ignore
      columns={column}
      records={records}
      selectedRecords={selectedRecords}
      // @ts-ignore
      onSelectedRecordsChange={setSelectedRecords}
      totalRecords={ data? data.length : 0 }
      recordsPerPage={pageSize}
      page={page}
      onPageChange={(p) => setPage(p)}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
      //sortStatus={"desc"}
      //onSortStatusChange={setSortStatus}
      fetching={loading}
    />
  );
};

export default DataTables;
