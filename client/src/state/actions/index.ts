import * as AT from './actionTypes' 

interface DepositAction {
    type: AT.ActionType.BALANCE_DEPOSIT,
    payload: number
}

interface WithdrawAction {
    type: AT.ActionType.BALANCE_WITHDRAW,
    payload: number
}

interface IloginRespObj {
    status: boolean,
    message: string,
    data: User
}

interface User {
    userId: number,
    email: string,
    username: string,
    balance: number,
    createdAt: string,
    accessToken: string
    location: ILocationUpdate,
}

export interface Icoordinates {
    latitude: number,
    longitude: number
}

export interface  ILocationUpdate {
    availability: boolean,
    error: boolean,
    latitude: number,
    longitude: number

}

export interface I_initial_Login {
    email: string;
    password: string;
}

export interface I_initial_Register {
    email: string;
    password: string;
    username: string;
}

export type IactionBalance = DepositAction | WithdrawAction;

export type IactionLoginRegister = {
    type: string;
    payload : IloginRespObj ;
}

export interface IactionLocationUpdate {
    type: string,
    payload: ILocationUpdate
}

/* Api Service interfaces */

/* Get all user products */
export type IgetAllUserProducts = {
    status:boolean,
    message: string,
    data: UserProduct[]
}

interface UserProduct {
    productId: number,
    sellerId: number,
    title: string,
    images: Array<any>,
    desc: string,
    retailPrice: number,
    negotiable: boolean,
    availableQuantity: number,
    readyDate: string
}

/* Submit user individual product */

export type userOffer = {
    userId : number,
    title : string,
    images : string,
	desc: string,
    retailPrice : number,
	negotiable : boolean,
	availableQuantity: number,
    readyDate : string,
	categoryId: number
}

/* Post all available categories */

type categoriesType = {
    categoryId: number,
    categoryName: string
}

export type Icategories = {
    status:boolean,
    message: string,
    data: categoriesType[]
}

export type IuserProducts = {
    status:boolean,
    message: string,
    data: sellerContent[]
}

export interface sellerContent {
    productId: number,
    sellerId: number,
    title: string,
    images: string,
    desc: string,
    retailPrice: number,
    negotiable: boolean,
    availableQuantity: number,
    readyDate: string,
    seller: sellerData,
    categories: IcategoryObj[]
}

export interface sellerData {
    userId: number,
    username: string,
    location: ILocationUpdate
}

interface IcategoryObj {
    category: Icategory
}

interface Icategory {
    categoryId: number,
    categoryName: string
}

export type Imessage  = {
    senderId: number,
    inboxId: number,
    content : string
}

export type InewChatRoom = {
    userId1: number,
    userId2: number
}

export type IgetAllMessages = {
    inboxId: number,
    lastUpdated: string,
    Message: IchatMessageObj[]
}

export type IchatMessageObj = {
    messageId: number,
    senderId: number,
    senderName: string,
    content: string,
    createAt: string,
    inboxId: number
}

export type IchatConversations = {
    inboxId: number,
    lastUpdated: string,
    users: Iconversation[]
}

export interface Iconversation {
    userId: number,
    username: string
}

 

