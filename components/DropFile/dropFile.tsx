import { useRef, useState } from 'react';
import { Text, Group, Button, rem, useMantineTheme, SimpleGrid, Chip } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload, IconMusic, IconCheck } from '@tabler/icons-react';
import classes from './DropzoneButton.module.css';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

export function Dropfile() {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [files, setFiles] = useState<File[]>([]);
  
  const router = useRouter();
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

  const handleUpload = async () => {
    console.log('handleUpload', files);
    if(files.length > 0){
        const formData = new FormData();
        for (let index = 0; index < files.length; index++) {
            formData.append('file', files[index]);            
        }
        //formData.append('file', files[0]);
        const requestOptions = {
            method: 'POST',
            //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData,
          };
          fetch('http://127.0.0.1:3000/message', requestOptions)
            .then((response) => {
              console.log(response.json());
              if (response.status == 201) {
                const id = notifications.show({
                  loading: true,
                  title: 'Upload New Message',
                  message: 'Data will be loaded in 3 seconds, you cannot close this yet',
                  autoClose: false,
                  withCloseButton: false,
                });
      
                setTimeout(() => {
                  notifications.update({
                    id,
                    color: 'teal',
                    title: 'Upload success.',
                    message: 'Notification will close in 2 seconds, you can close this notification now',
                    icon: <IconCheck className="w-[2rem]" />,
                    loading: false,
                    autoClose: 2000,
                  });
                  router.push('/admin/message')
                }, 3000);
               
              }             
            })
            .then((data) => {
              console.log(data);
            });
    }
   
  };

  const addFile = (file:any) => {
    console.log('add file', file);
    for (let index = 0; index < file.length; index++) {
        setFiles((prevFile) => [...prevFile, file[index]])       
    }
    
  }

  return (
    <div>
      <div className={classes.wrapper}>
        <Dropzone
          openRef={openRef}
          onDrop={(file) => addFile(file)}
          className={classes.dropzone}
          radius="md"
          //accept={}
          // maxSize={30 * 1024 ** 2}
        >
          <div style={{ pointerEvents: 'none' }}>
            <Group justify="center">
              <Dropzone.Accept>
                <IconDownload
                  style={{ width: rem(50), height: rem(50) }}
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{ width: rem(50), height: rem(50) }}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
              </Dropzone.Idle>
            </Group>

            <Text ta="center" fw={700} fz="lg" mt="xl">
              <Dropzone.Accept>Drop files here</Dropzone.Accept>
              <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
              <Dropzone.Idle>Upload resume</Dropzone.Idle>
            </Text>
            <Text ta="center" fz="sm" mt="xs" c="dimmed">
              Drag&apos;n&apos;drop files here to upload. We can accept only <i>.pdf</i> files that
              are less than 30mb in size.
            </Text>
          </div>
        </Dropzone>
        {files.length > 0 ? (
          <Button className={classes.control} size="md" radius="xl" onClick={handleUpload}>
            Upload files
          </Button>
        ) : (
          <></>
        )}
      </div>
      <Chip.Group multiple>
        <Group justify="left" mt="md">
          {previews}
        </Group>
      </Chip.Group>
    </div>
  );
}
