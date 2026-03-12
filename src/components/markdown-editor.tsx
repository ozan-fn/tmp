"use client";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt();

interface EditorProps {
    value: string;
    onChange: (text: string) => void;
}

export default function MarkdownEditor({ value, onChange }: EditorProps) {
    const handleImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            const data = await response.json();
            return data.url;
        } catch (error) {
            console.error("Error uploading image:", error);
            return "";
        }
    };

    return <MdEditor value={value} className="h-125" renderHTML={(text) => mdParser.render(text)} onChange={({ text }) => onChange(text)} onImageUpload={handleImageUpload} placeholder="Write your post content here..." />;
}
