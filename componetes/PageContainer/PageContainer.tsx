import {
  Anchor,
  Breadcrumbs,
  Container,
  type ContainerProps,
  Divider,
  Group,
  Paper,
  PaperProps,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import type { FC, ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  title: string;
  items?: { label: string; href: string }[];
} & Pick<ContainerProps, "fluid">;

const PAPER_PROPS: PaperProps = {
  p: 'md',
  shadow: 'md',
  radius: 'md',
};


export const PageContainer: FC<PageContainerProps> = ({
  children,
  title,
  items,
  fluid = true,
}) => {
  return (
    <Container px={0} fluid>
      <Stack gap="lg">
        {items && items.length > 0 ? (
          <Breadcrumbs>
            {items.map((item) => (
              <Anchor key={item.label} href={item.href}>
                {item.label}
              </Anchor>
            ))}
          </Breadcrumbs>
        ) : null}


        <Title order={3}>{title}</Title>
        <Divider />
        

        {/* <PageHeader title="Orders" breadcrumbItems={items} /> */}
        <Paper {...PAPER_PROPS}>
          <Group justify="space-between" mb="md">
            <Text fz="lg" fw={600}>
             {title}
            </Text>
            {/* <ActionIcon>
                <IconDotsVertical size={18} />
              </ActionIcon> */}
          </Group>
       
          {children}
        </Paper>
      </Stack>
    </Container>
  );
};
