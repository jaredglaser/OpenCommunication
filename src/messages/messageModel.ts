import mongoose = require("mongoose");

const Schema = mongoose.Schema;

export interface IMessage extends mongoose.Document {
    userTo: string;
    userFrom: string;
    time: Date;
    content: String;
    friends: mongoose.Types.Array<string>;
    friendrequests: mongoose.Types.Array<string>;
}

export interface Friend {
    username: string;
    messages: Message;
}

export interface Message extends mongoose.Document{
    userTo: string;
    userFrom: string;
    time: Date;
    content: string;
}

const MessageSchema: mongoose.Schema = new Schema({
    username: {
        type: String,
        required: "username is required"
    },
    friendrequests: [{
        username: {
            type: String,
            required: "username is required"
        }
    }],
    friends: [{
        username: {
            type: String,
            required: "username is required"
        },
        messages: [{
            time: {
                type: Date,
                required: "Date is required"
            },
            content: {
                type: String,
                required: "Content is required"
            }
        }]
    }]
});

export default mongoose.model<Message>("Message", MessageSchema);