interface NormI {
  _id: string;
  pdf: string;
  title: string;
  description: string;
  type: string;
  course: string;
  date: string;
}

interface AdminRouteI {
  children: any;
  isPrivate: boolean;
}

export type { NormI, AdminRouteI };
