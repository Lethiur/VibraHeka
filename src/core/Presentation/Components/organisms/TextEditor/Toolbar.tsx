import { RichTextUndo, RichTextRedo } from 'reactjs-tiptap-editor/history';
import { RichTextSearchAndReplace } from 'reactjs-tiptap-editor/searchandreplace';
import { RichTextClear } from 'reactjs-tiptap-editor/clear';
import { RichTextFontFamily } from 'reactjs-tiptap-editor/fontfamily';
import { RichTextHeading } from 'reactjs-tiptap-editor/heading';
import { RichTextFontSize } from 'reactjs-tiptap-editor/fontsize';
import { RichTextBold } from 'reactjs-tiptap-editor/bold';
import { RichTextItalic } from 'reactjs-tiptap-editor/italic';
import { RichTextUnderline } from 'reactjs-tiptap-editor/textunderline';
import { RichTextStrike } from 'reactjs-tiptap-editor/strike';
import { RichTextEmoji } from 'reactjs-tiptap-editor/emoji';
import { RichTextMoreMark } from 'reactjs-tiptap-editor/moremark';
import { RichTextColor } from 'reactjs-tiptap-editor/color';
import { RichTextHighlight } from 'reactjs-tiptap-editor/highlight';
import { RichTextBulletList } from 'reactjs-tiptap-editor/bulletlist';
import { RichTextOrderedList } from 'reactjs-tiptap-editor/orderedlist';
import { RichTextAlign } from 'reactjs-tiptap-editor/textalign';
import { RichTextIndent } from 'reactjs-tiptap-editor/indent';
import { RichTextLineHeight } from 'reactjs-tiptap-editor/lineheight';
import { RichTextLink } from 'reactjs-tiptap-editor/link';
import { RichTextImage } from 'reactjs-tiptap-editor/image';
import { RichTextVideo } from 'reactjs-tiptap-editor/video';
import { RichTextBlockquote } from 'reactjs-tiptap-editor/blockquote';
import { RichTextHorizontalRule } from 'reactjs-tiptap-editor/horizontalrule';
import { RichTextColumn } from 'reactjs-tiptap-editor/column';
import { RichTextTable } from 'reactjs-tiptap-editor/table';
import { useCurrentEditor } from '@tiptap/react';

import './Toolbar.scss';

const EmailButtonTool = () => {
    const { editor } = useCurrentEditor();

    const handleInsertEmailButton = () => {
        if (!editor) {
            return;
        }

        const label = window.prompt('Texto del boton', 'Quiero empezar');
        if (!label || label.trim().length === 0) {
            return;
        }

        const url = window.prompt('URL del boton', 'https://');
        if (!url || url.trim().length === 0) {
            return;
        }

        const safeLabel = label.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const safeUrl = url.trim().replace(/"/g, '&quot;');

        const buttonHtml = `<p style="text-align:center;margin:16px 0;"><a href="${safeUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:12px 28px;background-color:#8a81d4;color:#ffffff;border-radius:999px;text-decoration:none;font-weight:600;font-family: Georgia, 'Times New Roman', serif;font-size:16px;line-height:1.2;">${safeLabel}</a></p>`;

        editor.chain().focus().insertContent(buttonHtml).run();
    };

    return (
        <button
            type="button"
            className="editor-toolbar__btn editor-toolbar__btn--cta"
            onClick={handleInsertEmailButton}
            title="Insertar boton CTA"
        >
            CTA
        </button>
    );
};

export const EditorToolbar = () => {
    return (
        <div className="editor-toolbar">
            <RichTextUndo />
            <RichTextRedo />
            <RichTextSearchAndReplace />
            <RichTextClear />
            <RichTextFontFamily />
            <RichTextHeading />
            <RichTextFontSize />
            <RichTextBold />
            <RichTextItalic />
            <RichTextUnderline />
            <RichTextStrike />
            <RichTextEmoji />
            <RichTextMoreMark />
            <RichTextColor />
            <RichTextHighlight />
            <RichTextBulletList />
            <RichTextOrderedList />
            <RichTextAlign />
            <RichTextIndent />
            <RichTextLineHeight />
            <RichTextLink />
            <RichTextImage />
            <RichTextVideo />
            <RichTextBlockquote />
            <RichTextHorizontalRule />
            <RichTextColumn />
            <RichTextTable />
            <EmailButtonTool />
        </div>
    );
};
