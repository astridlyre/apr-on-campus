import { useState } from "react";

import TextLink from "./TextLink";

export default function Image({
  src,
  srcSet,
  bigSrc,
  alt = "",
  caption,
}: {
  alt?: string;
  src: string;
  srcSet?: string;
  bigSrc: string;
  caption?: string | React.ReactNode;
}) {
  const [bigImageSrc, setBigImageSrc] = useState("");

  return (
    <>
      <figure
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="button"
        tabIndex={0}
        onKeyDown={(evt) => {
          if (evt.key === "Enter") {
            setBigImageSrc(bigSrc);
          }
        }}
        onClick={() => {
          setBigImageSrc(bigSrc);
        }}
        className="cursor-pointer"
      >
        <img
          alt={alt}
          src={src}
          srcSet={srcSet}
          className="w-full max-w-full"
        />
        {caption ? (
          <figcaption className="mt-2 text-sm text-fg2">
            The above image is from{" "}
            <TextLink href="https://visualizingpalestine.org/" external>
              Visualizing Palestine
            </TextLink>
          </figcaption>
        ) : null}
      </figure>

      {bigImageSrc ? (
        <div className="fixed inset-0 z-20 flex items-center justify-center p-8">
          <div
            aria-hidden="true"
            onClick={() => {
              setBigImageSrc("");
            }}
            className="absolute inset-0 bg-white p-8 opacity-70"
          />
          <div
            aria-hidden="true"
            onClick={() => {
              setBigImageSrc("");
            }}
            className="relative m-auto"
          >
            <button
              type="button"
              onClick={() => {
                setBigImageSrc("");
              }}
              className="absolute -right-[5vw] top-0 z-10 h-12 w-12 text-3xl font-bold text-fg hover:bg-primary"
            >
              &times;
            </button>
            <img
              className="z-10 max-h-[95vh] max-w-[95vw]"
              src={bigImageSrc}
              alt={alt}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
