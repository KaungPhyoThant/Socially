"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";

interface ImageUploadProps {
    onChange: (url: string) => void;
    value: string;
    endpoint: "imageUploader";
}

const ImageUpload: React.FC<ImageUploadProps> = ({ endpoint, onChange, value }) => {
    if (value) {
        return (
            <div className="relative size-40">
                <img
                    src={value}
                    alt="Uploaded image preview"
                    className="rounded-md size-40 object-cover"
                />
                <button
                    onClick={() => onChange("")}
                    className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
                    type="button"
                    aria-label="Remove uploaded image"
                >
                    <XIcon className="h-4 w-4 text-white" />
                </button>
            </div>
        );
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                if (res && res[0]?.url) {
                    onChange(res[0].url);
                }
            }}
            onUploadError={(error: Error) => {
                alert("Upload failed: " + error.message);
                console.error("Upload Error:", error);
            }}
        />
    );
};

export default ImageUpload;
