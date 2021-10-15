import { Request } from "express";
// AWS
const AWS = require('aws-sdk');
// Ts
interface FilesRequest extends Request {
    files: any;
}   

const s3UploadImg = async (req: Request) => {
    AWS.config.update({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        region: process.env.S3_BUCKET_REGION,
    })

    const s3 = new AWS.S3();
    /* tslint:disable-next-line */
    console.log(req.body)
    console.log((req as FilesRequest).files)

    // Binary data base64
    const fileContent = Buffer.from((req as FilesRequest).files.file.data, 'binary');

    // Setting up S3 upload parameters
    const params = {
        Bucket: 'compost-app-2-image-s3-bucket',
        Key: req.body.key, // File name you want to save as in S3
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

        const { Location } = await s3.upload(params).promise();
        return Location;

    } catch (error) {
        /* tslint:disable-next-line */
        console.log(error);
    }

    
}

export default s3UploadImg;