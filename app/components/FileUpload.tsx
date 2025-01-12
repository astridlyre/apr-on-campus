import { A } from "@mobily/ts-belt";

import FilePreview from "./FilePreview";

export default function FileUpload({
  files,
  setFiles,
  fileInputRef,
  handleFileChange,
  fileError,
  isSubmitting,
}: {
  files: readonly File[];
  setFiles: React.Dispatch<React.SetStateAction<readonly File[]>>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  fileError: string;
  isSubmitting: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 rounded border border-divider bg-slate-100 p-4">
      <label>
        <span
          role="button"
          onKeyDown={(evt) => {
            if (evt.key === "Enter") {
              fileInputRef.current?.click();
            }
          }}
          tabIndex={0}
          className="inline-block cursor-pointer rounded-md bg-slate-300 px-4 py-2 text-slate-800 shadow-sm hover:bg-slate-200"
        >
          Attach photos (optional)
        </span>
        <input
          ref={fileInputRef}
          onChange={handleFileChange}
          className="invisible absolute h-0 w-0"
          type="file"
          name="file"
          accept="image/*, video/*"
          multiple
        />
      </label>

      <div className="flex flex-wrap gap-4">
        {files.length > 0 ? (
          files.map((file, i) => (
            <FilePreview
              isSubmitting={isSubmitting}
              key={i}
              file={file}
              onDelete={() => {
                setFiles(A.filter((aFile) => aFile !== file));
              }}
            />
          ))
        ) : (
          <small className="text-sm text-fg">No files attached.</small>
        )}
      </div>

      <div>
        <small className="mb-4 text-xs text-red-600">{fileError}</small>

        <small className="text-xs text-fg2">
          Up to 10 files. &lt; 250MB each. Supported formats include jpg, jpeg,
          png, gif, webp, mp4, mov, and avi. If you need to attach a larger
          video, please consider using a file sharing service and provide the
          link in your description above.
        </small>
      </div>
    </div>
  );
}
