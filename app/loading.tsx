import { Center, Loader, Stack, Text } from '@mantine/core';

export default function Loading() {
  return (
    <Center pt={80}>
      <Stack align="center">
        <Loader />
        <Text>Loading...</Text>
      </Stack>
    </Center>
  );
}
