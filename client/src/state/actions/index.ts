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
    images: string,
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

interface sellerContent {
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

interface sellerData {
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


/*
{
    "userId" : 1,
    "title" : "mock product 1",
    "images" : "mock image 1",
		"desc": "mock desc 3",
    "retailPrice" : 2.2,
		"negotiable" : true,
		"availableQuantity": 3,
    "readyDate" : "2021-10-11T13:04:40.542Z",
		"categoryId": 1
}
*/

 

