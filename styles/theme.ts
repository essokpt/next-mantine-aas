"use client";

import { ActionIcon, createTheme, Loader } from "@mantine/core";

export const theme = createTheme({
	fontFamily: "Space Grotesk, sans-serif",
	headings: {
		fontFamily: "Space Grotesk, sans-serif",
	},	
	focusRing: 'auto',  
		colors: {
			emerald: [
				"#f0fdf5",
				"#dcfce8",
				"#bbf7d1",
				"#86efad",
				"#4ade80",
				"#22c55e",
				"#16a34a",
				"#15803c",
				"#166533",
				"#14532b",
				"#052e14",
			],
		},
	primaryColor: "emerald",
	defaultRadius: "md",
	components: {
		ActionIcon: ActionIcon.extend({
		  defaultProps: {
			variant: 'subtle',
		  },
		}),
		Loader: Loader.extend({
		  defaultProps: {
			type: 'bars',
		  },
		}),
	  },
});
