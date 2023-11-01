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
    pdf: string;
    title: string;
    description: string;
    date: Date;
    type: string;
    course: string;
}

export { UserI, AdminI, NormI };
