import {
  IconComponents,
  IconDashboard,
  IconLock,
  IconMoodSmile,
	IconQuotes,
	IconSubtask,
} from "@tabler/icons-react";
import type { NavItem } from "@/types";

export const navLinks: NavItem[] = [
  { label: "Dashboard",
		icon: IconDashboard,
		link: "/dashboard"
	},
	{ label: "Tasks",
		icon: IconSubtask,
		link: "/apps/tasks"
	},
  { label: "Jobs",
		icon: IconSubtask,
		link: "/apps/cronjobs"
	},
  { label: "Queue",
		icon: IconQuotes,
		link: "/apps/queue"
	},
  {
    label: "Components",
    icon: IconComponents,
    initiallyOpened: true,
    links: [
      {
        label: "Table",
        link: "/dashboard/table",
      },
      {
        label: "Form",
        link: "/dashboard/form",
      },
    ],
  },
  {
    label: "Auth",
    icon: IconLock,
    initiallyOpened: true,
    links: [
      {
        label: "Login",
        link: "/login",
      },
      {
        label: "Register",
        link: "/register",
      },
    ],
  },
  {
    label: "Sample",
    icon: IconMoodSmile,
    initiallyOpened: true,
    links: [
      {
        label: "Landing",
        link: "/",
      },
    ],
  },
];
