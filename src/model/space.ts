import mongoose, { Schema } from "mongoose";

const spaceSchema = new Schema({
    spaceName: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 100
    },
    spaceUrl:{
        type:String,
        required:true,
        unique:true
    },
    headerTitle: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    isSquare: {
        type: Boolean,
        default: false
    },
    customMessage: {
        type: String,
        optional: true
    },
    question: [{
        type: String
    }],
    isStars: {
        type: Boolean,
        default: true
    },
    collectionType: {
        type: String
    },
    language: {
        type: String
    },
    imageUrl: {
        type: String,
        default: '/hulk.jpeg'
    }
});

export const Space = mongoose.models.Space || mongoose.model('Space',spaceSchema);
