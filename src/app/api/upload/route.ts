import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadResult = await new Promise<{
            secure_url: string;
            public_id: string;
        }>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'tmp',
                    resource_type: 'auto',
                },
                (error, result) => {
                    if (error || !result) return reject(error);
                    resolve(result);
                },
            );
            uploadStream.end(buffer);
        });

        const fileUrl = uploadResult.secure_url;
        const filePath = uploadResult.public_id;

        // Create media record in database as inactive by default
        const media = await prisma.media.create({
            data: {
                url: fileUrl,
                path: filePath,
                status: 'inactive',
            },
        });

        return NextResponse.json({ url: fileUrl, id: media.id });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
