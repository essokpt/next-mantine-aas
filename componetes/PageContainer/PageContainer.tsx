import {
  Anchor,
  Breadcrumbs,
  BreadcrumbsProps,
  Button,
  Container,
  type ContainerProps,
  Divider,
  Flex,
  Group,
  Paper,
  PaperProps,
  rem,
  Space,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import type { FC, ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  breadcrumbItems?: any[];
  createButton?: boolean;
  onHandleCreate?: () => void;
} & Pick<ContainerProps, "fluid">;

const PAPER_PROPS: PaperProps = {
  p: "md",
  shadow: "md",
  radius: "md",
};

export const PageContainer: FC<PageContainerProps> = ({
  children,
  title,
  subtitle,
  breadcrumbItems,
  createButton,
  onHandleCreate,
  fluid = true,
}) => {
  const theme = useMantineTheme();
  const colorScheme = useColorScheme();

  const BREADCRUMBS_PROPS: Omit<BreadcrumbsProps, "children"> = {
    style: {
      a: {
        padding: rem(8),
        borderRadius: theme.radius.sm,
        fontWeight: 500,
        color: colorScheme === "dark" ? theme.white : theme.black,

        "&:hover": {
          transition: "all ease 150ms",
          backgroundColor:
            colorScheme === "dark"
              ? theme.colors.dark[5]
              : theme.colors.gray[2],
          textDecoration: "none",
        },
      },
    },
  };

  return (
    <Container px={0} fluid>
      <Stack gap="lg">
        <Title order={3}>{title}</Title>
        <Flex
          align="center"
          justify="space-between"
          direction={{ base: "row", sm: "row" }}
          gap={{ base: "sm", sm: 4 }}
        >
          {breadcrumbItems ? (
            <Stack>
              <Breadcrumbs {...BREADCRUMBS_PROPS}>
                {breadcrumbItems}
              </Breadcrumbs>
            </Stack>
          ) : null}

          {createButton ? (
            <Button
              leftSection={<IconPlus size={18} />}
              onClick={onHandleCreate}
            >
              {`New ${title}`}
            </Button>
          ) : null}
        </Flex>
        <Divider />

        {/* <PageHeader title="Orders" breadcrumbItems={items} /> */}
        <Paper {...PAPER_PROPS}>
          <Group justify="space-between" mb="md">
            <Text fz="lg" fw={600}>
              {subtitle}
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
