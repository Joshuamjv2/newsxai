import AWS from "aws-sdk"
// import dotenv from "dotenv"

// dotenv.config()

const region = "us-east-1"
const bucket_name = "newsxai-images"
const accessKey = "AKIA5XSDX4SCRFIL2EUV" // process.env.AWS_ACCESS_KEY
const secretKey = "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"  //process.env.AWS_SECRET_KEY


export const s3 = new AWS.S3({
    region: region,
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    signatureVersion: 'v4'
})

export async function generateUploadUrl(image_name){
    const imageName = image_name
    console.log(accessKey, secretKey)
    const params = ({
        Bucket: bucket_name,
        Key: imageName,
        Expires: 60
    })

    const uploadUrl = await s3.getSignedUrlPromise('putObject', params)
    return uploadUrl
}
