import { LoaderFunction } from "@remix-run/node";
import { contentType } from "mime-types";

import { getFile } from "~/services/minio.server";
import { requireUserId } from "~/session.server";

export const loader: LoaderFunction = async ({ params, request }) => {
  await requireUserId(request);

  const { slug } = params;

  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const file = await getFile({ fileName: slug, bucketName: "static" });

  const readableStream = new ReadableStream({
    start(controller) {
      file.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      file.on("end", () => {
        controller.close();
      });
      file.on("error", (err) => {
        console.error(err);
        controller.error(err);
      });
    },
  });

  return new Response(readableStream, {
    headers: {
      "Content-Type": contentType(slug) || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
