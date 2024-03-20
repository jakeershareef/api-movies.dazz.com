import mongoose, { model } from "mongoose";
import * as bcrypt from "bcrypt";

export const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
        },
        last_name: {
            type: String,
        },
        user_name: {
            type: String
        },
        phone_number: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
        },
        user_type: {
            type: String,
            enum: ["ADMIN", "CUSTOMER", "MARKETER"],
            default: "ADMIN"
        },
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE", "ARCHIVED"],
            default: "ACTIVE",
        },
        password: {
            type: String,
        }
    }
);


userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }
        const hashed = await bcrypt.hash(this["password"], 10);
        this["password"] = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
});

export const UserModel = mongoose.model<any>("Users", userSchema, "users");
