import type  {IconProps, TablerIcon}  from "@tabler/icons-react";

export interface MessageType {
  id: number
  filename : String 
  size : String
  type : String  
  path : String
}

export interface NavItem {
  label: string;
  icon: (props: IconProps) => JSX.Element;
  link?: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export interface Queue {
  id: number;
  name: string;
  data: {
    taskName: string;
    fileName: string;
    schedule: string;
    chanel: string;
  };
  opts: {
    attempts: number;
    delay: number;
  };
  progress: number;
  returnvalue: string;
  stacktrace: [];
  attemptsStarted: number;
  attemptsMade: number;
  delay: number;
  timestamp: Date;
  queueQualifiedName: string;
  processedOn: Date;
}

export interface CronJob { 
  name: string; 
  time: string;
  last: boolean;
  next: string; 
  enable: boolean;
}

export type TaskSchedule = {
  id: number;
  name: string;
  description: string;
  fileName: string;
  time: string;
  enable: boolean;
  chanel: string;
}

export type AppStatus =
  | 'pending'
  | 'sent'
  | 'cancelled'
  | 'approved'
  | 'suspended'
  | string;
