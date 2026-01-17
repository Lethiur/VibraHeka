import TextEditor from '@/Core/Presentation/Components/organisms/TextEditor/TextEditor';

export default function EmailsConfiguration() {
    return <div className="flex flex-col flex-1 min-h-0">
        <h1 className="shrink-0 p-4">Emails configuration</h1>

        <div className="flex-1 min-h-0">
            <TextEditor
                content="<p>Vivo con tu madre en un castillo</p>"
                onChange={(content) => console.log(content)}
                onSave={(content) => console.log(content)}
            />
        </div>

    </div>
}