"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Modal,
  Button,
  Group,
  ActionIcon,
  Text,
  Box,
  rem,
  FileButton,
  Chip,
  Tooltip,
  Anchor,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconHeadphones,
  IconMusic,
  IconPlaylist,
  IconTrash,
} from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import DataTables from "@/components/DataTable/DataTable";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import {
  useDeleteMessage,
  useFetchMessage,
  useStreamMessage,
  useUploadMessage,
} from "@/hooks/useMessage";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { buffer } from "stream/consumers";

const items = [
  { title: "Dashboard", href: "/" },
  { title: "Apps", href: "#" },
  { title: "Message", href: "/apps/message" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

interface tasks {
  name: string;
  description: string;
  next: string;
  last: string;
  time: string;
  enable: boolean;
}

export default function Message() {
  const [files, setFiles] = useState<File[]>([]);
  const [opened, setOpen] = useState(false);
  const [soundPlayer, setSoundPlayer] = useState(false);
  const [fileStream, setFileStream] = useState('');

  const router = useRouter();

  const { mutateAsync: uploadMessages, isSuccess: isUploadSuccess } =
    useUploadMessage();
  const { mutateAsync: deleteMessage, isSuccess: isDeleteSuccess } =
    useDeleteMessage();

    const { mutateAsync: streamMessage, isSuccess: isStreamSuccess } =
    useStreamMessage();

  const form = useForm({
    mode: "uncontrolled",
    name: "message-form",
    initialValues: {},
  });

  const openUpload = () => {
    form.reset();
    setOpen(true);
  };

  const handleSubmit = async (values: typeof form.values) => {
    console.log("post task:", values);
    console.log('test');
    
    const formData = new FormData();
    for (let i = 0; i < files?.length; i++) {
      formData.append("files", files[i]);
    }

    await uploadMessages(formData);
    setOpen(false);
    form.reset();
  };

  const previews = files.map((file, index) => {
    //const imageUrl = URL.createObjectURL(file);
    return (
      <Chip
        key={index}
        icon={<IconMusic style={{ width: rem(16), height: rem(16) }} />}
        color="red"
        variant="filled"
        defaultChecked
      >
        {file.name}
      </Chip>
    );
    // return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
  });

  const {
    data: record,
    isError: error,
    isFetching,
    isLoading: loading,
  } = useFetchMessage();

 

  const columns = [
    {
      accessor: "filename",
      render: (item: any) => <Text>#{item.filename}</Text>,
    },
    {
      accessor: "size",
      sortable: true,
      render: (item: any) => <Text>{item.size}</Text>,
    },
    {
      accessor: "type",
      sortable: true,
      render: (item: any) => <Text>{item.type}</Text>,
    },
    {
      accessor: "path",
      sortable: true,
      render: (item: any) => <Text>{item.path}</Text>,
    },

    {
      accessor: "",
      title: "Actions",
      render: (item: any) => (
        <Group gap="sm">
          <Tooltip label="Play">
            <ActionIcon>
              <IconHeadphones size={18} onClick={() => openSoundPlayer(item.filename)} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Delete">
            <ActionIcon>
              <IconTrash size={18} onClick={() => openDeleteModal(item)} />
            </ActionIcon>
          </Tooltip>
        </Group>
      ),
    },
  ];

 const openSoundPlayer = async(file: any) => {
    const filestream = await streamMessage(file);
    
    if(filestream){
      const fileUrl = window.URL.createObjectURL(filestream);
      console.log('fileUrl', fileUrl);
      setFileStream(fileUrl)
      setSoundPlayer(true);
    }
    
  };

  const openDeleteModal = (item: any) =>
    modals.openConfirmModal({
      title: "Delete message",
      size: "md",
      radius: "md",
      withCloseButton: false,
      centered: true,
      children: (
        <>
          <Text size="sm">Are you sure to delete message?</Text>
          <Text size="sm">{item.filename}</Text>
        </>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => confirmDelete(item.filename),
    });

  const confirmDelete = async (filename: any) => {
    await deleteMessage(filename);

    console.log("delete message");
  };

  return (
    <PageContainer
      title="Message"
      subtitle="Message"
      breadcrumbItems={items}
      createButton
      onHandleCreate={() => openUpload()}
    >

      <DataTables
        data={record}
        error={error}
        loading={loading}
        column={columns}
      />

      <Modal
        opened={soundPlayer}
        onClose={() => setSoundPlayer(false)}
        title="Message preview"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <AudioPlayer
          autoPlay={true}
          src={fileStream}
          onPlay={(e) => console.log("onPlay")}
        />
      </Modal>

      <Modal
        opened={opened}
        onClose={() => setOpen(false)}
        title="Upload Message"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group justify="left" mt="md">
            {previews}
          </Group>
          <br />

          <Group justify="flex-end" mt="md">
            <FileButton onChange={setFiles} accept=".wav" multiple>
              {(props) => <Button {...props}>Select Files</Button>}
            </FileButton>
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
    </PageContainer>
  );
}
