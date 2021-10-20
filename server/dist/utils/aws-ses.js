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
const AWS = require("aws-sdk");
const aws_ses = (userEmail, username, topUpAmount, updatedBalance, cardInfo) => __awaiter(void 0, void 0, void 0, function* () {
    AWS.config.update({
        accessKeyId: process.env.SES_ACCESS_KEY,
        secretAccessKey: process.env.SES_SECRET_ACCESS_KEY,
        region: process.env.SES_BUCKET_REGION,
    });
    // Setting up S3 upload parameters
    const params = {
        Source: process.env.SES_email_source,
        Destination: {
            ToAddresses: [userEmail],
        },
        ReplyToAddresses: [process.env.SES_email_ReplyToAddresses],
        Message: {
            Body: {
                //  Use this for email clients that can process HTML.
                Html: {
                    Charset: "UTF-8",
                    Data: `Dear Compost Hub Customer,<br><br>

                    Congratulations <strong>${username}</strong>!<br><br>

                    €${topUpAmount} has been succssfully added to your account.<br><br>

                    Now You have €${updatedBalance} in your account<br>
                    It has been paid using ${cardInfo.card.brand} **** **** **** ${cardInfo.card.last4}<br><br>

                    Thank you for the top up!<br><br>

                    Sincerely,<br>
                    Compost Hub Team<br>
                    `,
                },
                // Use this for text-based email clients, or clients on high-latency networks (such as mobile devices).
                Text: {
                    Charset: "UTF-8",
                    Data: `Dear Compost Hub Customer,<br><br>

                    Congratulations <strong>${username}</strong>!<br><br>

                    €${topUpAmount} has been succssfully added to your account.<br><br>

                    Now You have €${updatedBalance} in your account<br>
                    It has been paid using ${cardInfo.card.brand} **** **** **** ${cardInfo.card.last4}<br>
                    Thank you for the top up!<br><br>

                    Sincerely,<br>
                    Compost Hub Team<br>
                    `,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Compost Hub - Account Top Up",
            },
        },
    };
    // Create the promise and SES service object
    const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
        .sendEmail(params)
        .promise();
    // Handle promise's fulfilled/rejected states
    sendPromise
        .then((data) => {
        console.log("SES data:", data);
    })
        .catch((err) => {
        console.error("SES error:", err, err.stack);
    });
});
exports.default = aws_ses;
