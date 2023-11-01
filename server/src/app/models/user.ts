import mongoose from '../../database';
import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserI } from '../../utils/types';

const UserSchema = new Schema<UserI>({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowerCase: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre('save', async function (next: any) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const User = mongoose.model('User', UserSchema);
export default User;
