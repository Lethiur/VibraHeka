import TextEditor from "@/Core/Presentation/Components/organisms/TextEditor/TextEditor";
import { EmailTemplate } from "@/Modules/Admin/Emails/Domain/Models/EmailTemplate";
import { UseGetEmailTemplateContent } from "@/Modules/Admin/Emails/Presentation/Hooks/UseGetEmailTemplateContent";
import { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { JSONContent } from "@tiptap/react";

interface EmailTemplateEditorProps {
    template: EmailTemplate;
    onSave: (json: JSONContent) => void;
    onUploadMedia: (file: File) => Promise<string>;
}


export default function EmailTemplateEditor({ template, onSave, onUploadMedia }: EmailTemplateEditorProps) {

    const { content, loading, error, GetContent } = UseGetEmailTemplateContent();

    useEffect(() => {
        GetContent(template.ID);
    }, []);

    if (loading) {
        return <div className="d-flex justify-content-center py-4">
            <Spinner animation="border" />
        </div>
    }

    return (
        <div>
            <h1>Email Template Editor {template.Name}</h1>
            <TextEditor content={content} onChange={console.log} onSave={onSave} onMediaUpload={onUploadMedia} />
        </div>
    );
}