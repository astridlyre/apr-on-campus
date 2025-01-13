import { humanReadableSize } from "~/utils";

export default function FilePreview({
  file,
  onDelete,
  isSubmitting,
}: {
  file: File;
  onDelete: () => void;
  isSubmitting: boolean;
}) {
  // If it's a video
  if (file.type.startsWith("video")) {
    return (
      <div className="relative">
        <button
          disabled={isSubmitting}
          type="button"
          className="bg-neutral hover:bg-neutralDark absolute right-0 top-0 flex h-6 w-6 items-center justify-center rounded-bl rounded-tr text-white"
          onClick={onDelete}
        >
          &times;
        </button>

        <video
          width="100"
          height="100"
          controls
          className="rounded"
          style={{ objectFit: "contain" }}
        >
          <track kind="captions" />
          <source src={URL.createObjectURL(file)} type={file.type} />
        </video>
      </div>
    );
  }

  // If it's an image
  return (
    <div className="relative">
      <button
        disabled={isSubmitting}
        type="button"
        className="bg-neutral hover:bg-neutralDark absolute right-0 top-0 flex h-6 w-6 items-center justify-center rounded-bl rounded-tr text-white"
        onClick={onDelete}
      >
        &times;
      </button>
      <img
        width="100"
        height="100"
        className="rounded"
        style={{ objectFit: "contain" }}
        src={URL.createObjectURL(file)}
        alt={file.name}
        title={file.name}
      />
      <small className="block w-full text-center text-xs text-fg2">
        {humanReadableSize(file)}
      </small>
    </div>
  );
}
