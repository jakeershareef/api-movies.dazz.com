import { Schema } from "@nestjs/mongoose";
import mongoose, { model } from "mongoose";

export const MovieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        genre: {
            type: String,
        },
        rating: {
            type: String
        },
        streaming_link: {
            type: String,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

export const MovieModel = mongoose.model<any>("Movies", MovieSchema, "movies");
