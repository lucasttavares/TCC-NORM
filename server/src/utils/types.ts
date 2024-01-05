interface UserI {
  name: string;
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  createdAt: Date;
}

interface AdminI {
  username: string;
  password: string;
}

interface NormI {
  _id: string;
  pathFile: string;
  pdf: string;
  title: string;
  diacriticTitle?: string;
  description: string;
  date: Date;
  year: number;
  type: string;
  course: string;
}

export { UserI, AdminI, NormI };
