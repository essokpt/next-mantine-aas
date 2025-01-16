import "@mantine/core/styles.css";
import React from "react";
import {
  MantineProvider,
  ColorSchemeScript,
  Notification,
 
} from "@mantine/core";
import { spaceGrotesk } from "../styles/fonts";
import { theme } from "@/styles/theme";
import { ModalsProvider } from "@mantine/modals";


export default function RootLayout({ children }: { children: React.ReactNode }) {
 
  return (
    <html lang="en-US">
      <head>
        <ColorSchemeScript defaultColorScheme="auto"/>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body >
        <MantineProvider theme={theme} defaultColorScheme="light">
         
          <ModalsProvider>{children}</ModalsProvider>

          <Notification />
        </MantineProvider>
      </body>
    </html>
  );
}
