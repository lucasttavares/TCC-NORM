import { ReactNode } from 'react';

interface NormI {
  _id?: string;
  link?: string;
  title?: string;
  description?: string;
  type?: string;
  course?: string;
  date?: string;
  year?: number;
  isAdmin?: boolean;
  onEffect?: () => void;
}

interface AdminRouteI {
  children: ReactNode;
  isPrivate: boolean;
}

export type { NormI, AdminRouteI };
