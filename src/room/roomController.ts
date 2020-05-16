import express from "express";
import Room from "./roomModel";

export class RoomController {
    //TOTO: add an entry to the rooms table
    public CreateRoom(req: express.Request, res: express.Response): void {
        let newRoom = new Room(req.body);
        newRoom.save((err, room) => {
            if (err) {
                res.send(err);
            }
            res.json(room);
        })
    }

    public SendRoomChat(req: express.Request, res: express.Response): void {
        //TODO: add a message to the RoomMessage table and ping users to trigger refreshroomchat
        const roomChatId = req.query.roomChatId;
        Room.findOneAndUpdate({ _id: roomChatId }, { $push: { messages: {content: req.body.content }}}, function (err, room) {
            if (err || room == null) {
                return res.sendStatus(500).end();
            }
            room.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'Message Sent', status: 'success' });
                }
            });
        });
    }


    public RefreshRoomChat(req: express.Request, res: express.Response): void {
        //TODO: return list of of every message after the last one.
        Room.findOne({ messages: {content: req.body.content }}, "Messages", function (err, room) {
            if (err || room == null) {
                return res.sendStatus(500).end();
            }
            room.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'Messages retrieved', status: 'success' });
                }
            });
        });
    }

    public JoinRoomVoice(req: express.Request, res: express.Response): void {
        //TODO: return list of who is in the voice room and trigger peers to connect to you
        const roomVoiceId = req.query.roomVoiceId;
        Room.findOneAndUpdate({ _id: roomVoiceId }, { $push: { users: {username: req.body.username }} }, function (err, room) {
            if (err || room == null) {
                return res.sendStatus(500).end();
            }
            room.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'Joined Voice Room', status: 'success' });
                }
            });
        });
    }

    public RefreshRoomVoice(req: express.Request, res: express.Response): void {
        //TODO: return list of of everyone in the voice room
        Room.findOne({ name: req.body.name}, "users", function(err, room) {
            if(err || room == null) {
                return res.sendStatus(500).end();
            }
            room.save(function (err) {
                if(err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'Users retrieved', status: 'success'});
                }
            });
        });

    }

    public JoinRoomVideo(req: express.Request, res: express.Response): void {
        //TODO: return list of who is in the video room and trigger peers to connect to you
        const roomVideoId = req.query.roomVideoId;
        Room.findOneAndUpdate({ _id: roomVideoId }, { $push: { users: {username: req.body.username }} }, function (err, room) {
            if (err || room == null) {
                return res.sendStatus(500).end();
            }
            room.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end()
                }
                else {
                    return res.send({ fn: 'Joine Video Room', status: 'success' });
                }
            });
        });
    }

    public RefreshRoomVideo(req: express.Request, res: express.Response): void {
        //TODO: return list of of everyone in the video room
        Room.findOne({ name: req.body.name }, "users", function (err, room) {
            if (err || room == null) {
                return res.sendStatus(500).end();
            }
            room.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'Users retrieved', status: 'success' });
                }
            });
        });
    }


}