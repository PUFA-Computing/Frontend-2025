import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import EditorToolbar from "./toolbar/editor-toolbar";

interface EditorProps {
    content: string;
    placeholder: string;
    onChange: (value: string) => void;
}

const Editor = ({ content, placeholder, onChange }: EditorProps) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return null;

    return (
        <div className="prose lg:prose-xl overflow-hidden rounded-lg border border-gray-300">
            <EditorToolbar editor={editor} />
            <div className="relative max-h-[550px] cursor-text overflow-auto bg-white p-4">
                <EditorContent
                    editor={editor}
                    placeholder={placeholder}
                    className="cursor-text"
                    onClick={() => editor?.commands.focus()}
                />
                <div className="pointer-events-none absolute inset-0 rounded-lg border-2 border-transparent focus-within:border-indigo-600" />
            </div>
        </div>
    );
};

export default Editor;
