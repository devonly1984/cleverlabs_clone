import {S3Client,PutObjectCommand,GetObjectCommand,DeleteObjectCommand} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import {env} from './env';

import { UploadAudioOptions } from '@/constants/type';

const r2 = new S3Client({
    region: 'auto',
    endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflare.com`,
    credentials: {
        accessKeyId: env.R2_ACCESS_KEY_ID,
        secretAccessKey: env.R2_SECRET_ACCESS_KEY
    }
})

export const uploadAudio = async({
    buffer,key,contentType="audio/wav"
}:UploadAudioOptions):Promise<void>=>{
    await r2.send(
        new PutObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: contentType
    })
    )
}
export const deleteAudio = async(key:string):Promise<void>=>{
    await r2.send(
        new DeleteObjectCommand({
            Bucket: env.R2_BUCKET_NAME,
            Key: key
        })
    )
}
export const getSignedAudioUrl = (key: string): Promise<string> => {
    const command = new GetObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: key
    });

    return getSignedUrl(r2, command, { expiresIn: 3600 })
}