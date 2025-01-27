import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { spaceGrotesk } from "../styles/fonts";
import { theme } from "@/styles/theme";
import { ModalsProvider } from "@mantine/modals";
import { AppProvider } from "./provider";
import { Notifications } from "@mantine/notifications";
import 'mantine-datatable/styles.layer.css';
import '@mantine/notifications/styles.css';
//import 'react-js-cron/dist/styles.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
       
          <ModalsProvider>
            <AppProvider>{children}</AppProvider>
          </ModalsProvider>
          <Notifications />
        </MantineProvider>
      </body>
    </html>
  );
}
