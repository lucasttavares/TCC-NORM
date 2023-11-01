import mongoose from '../../database';
import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { AdminI } from '../../utils/types';

const AdminSchema = new Schema<AdminI>({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
});

AdminSchema.pre('save', async function (next: any) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;
