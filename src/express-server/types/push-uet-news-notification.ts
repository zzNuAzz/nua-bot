import { Request } from "express";

export interface UETNews {
    id: number,
    title: string,
    url: string,
    description: string,
    thumbnail: string,

}

export interface UETNewsPushNotificationRequest extends Request {
    body: UETNews
}
