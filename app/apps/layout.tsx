"use client";

import {
  AppShell,
  Burger,
  Button,
  Container,
  Group,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AdminHeader } from "@/componetes/Headers/AdminHeader";
import { Navbar } from "@/componetes/Navbar/Navbar";
import { navLinks } from "@/config";
import classes from "@/styles/App.module.css";
import { Notifications, notifications } from "@mantine/notifications";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const bg =
    colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <AppShell.Navbar>
     
        <Navbar data={navLinks} hidden={!opened} />
      </AppShell.Navbar>
      <AppShell.Header>
        <AdminHeader
          burger={
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              mr="xl"
            />
          }
        />
      </AppShell.Header>
      <AppShell.Main className={classes.main}>
       
        {children}
      </AppShell.Main>
      <AppShell.Footer p="md">
        <Text w="full" ta="right" size="sm">
          &copy;&nbsp;{new Date().getFullYear()}
          &nbsp;Primotech(Thailand).co.th
        </Text>
      </AppShell.Footer>
    </AppShell>
  );
}
