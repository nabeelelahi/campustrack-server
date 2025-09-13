import mongoose, { Schema } from 'mongoose';
import baseModel from '../../base/base.model';

export const name = 'orders';

export const schema = new Schema(
    {
        staff_member: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        student: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        price: {
            type: Number,
            required: true

        },
        items: [
            {
                type: Schema.Types.ObjectId,
                ref: 'menu-items',
            },
        ],
        ...baseModel,
    },
    { timestamps: true },
);

export const Class = mongoose.model(name, schema);