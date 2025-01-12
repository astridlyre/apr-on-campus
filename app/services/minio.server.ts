import { Readable } from "node:stream";

import { contentType } from "mime-types";
import * as Minio from "minio";
import { nanoid } from "nanoid";

if (!process.env.MINIO_ROOT_USER || !process.env.MINIO_ROOT_PASSWORD) {
	throw new Error("Minio credentials not found");
}

const minioClient = new Minio.Client({
	endPoint:
		process.env.NODE_ENV === "production"
			? "apr-on-campus-minio.internal"
			: "127.0.0.1",
	port: 9000,
	useSSL: false,
	accessKey: process.env.MINIO_ROOT_USER,
	secretKey: process.env.MINIO_ROOT_PASSWORD,
});

minioClient.listBuckets().then(console.log).catch(console.error);

export async function uploadFile({
	bucketName,
	fileName,
	data,
}: {
	bucketName: string;
	fileName: string;
	data: AsyncIterable<Uint8Array<ArrayBufferLike>>;
}): Promise<string> {
	const exists = await minioClient.bucketExists(bucketName);
	if (!exists) {
		await minioClient.makeBucket(bucketName, "us-west-2");
		console.log(`Bucket ${bucketName} created in "us-west-2"`);
	}

	const uniqueName = `${nanoid()}-${fileName}`;
	const type = contentType(fileName) || "application/octet-stream";

	await minioClient.putObject(
		bucketName,
		uniqueName,
		Readable.from(data),
		undefined,
		{
			"Content-Type": type,
			"Cache-Control": "public, max-age=31560000, immutable",
		},
	);

	console.log(`File ${uniqueName} uploaded to bucket ${bucketName}`);

	return JSON.stringify({
		href: `/${bucketName}/${uniqueName}`,
		contentType: type,
	});
}

export async function getFile({
	fileName,
	bucketName,
}: { fileName: string; bucketName: string }): Promise<Readable> {
	return minioClient.getObject(bucketName, fileName);
}
