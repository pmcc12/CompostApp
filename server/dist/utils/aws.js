"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// AWS
const AWS = require('aws-sdk');
const s3UploadImg = (req) => __awaiter(void 0, void 0, void 0, function* () {
    AWS.config.update({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        region: process.env.S3_BUCKET_REGION,
    });
    const s3 = new AWS.S3();
    /* tslint:disable-next-line */
    console.log(req.body);
    console.log(req.files);
    // Binary data base64
    const fileContent = Buffer.from(req.files.data, 'binary');
    // Setting up S3 upload parameters
    const params = {
        Bucket: 'compost-app-2-image-s3-bucket',
        Key: Date.now().toString(),
        Body: fileContent
    };
    // Upload to s3
    // var imgData: any;
    // await s3.upload(params, (err: any, data: any) => {
    //     if (err) {
    //         throw err;
    //     }
    //     imgData = data
    //     console.log(imgData)
    // });
    try {
        const { Location } = yield s3.upload(params).promise();
        return Location;
    }
    catch (error) {
        /* tslint:disable-next-line */
        console.log(error);
    }
});
exports.default = s3UploadImg;
