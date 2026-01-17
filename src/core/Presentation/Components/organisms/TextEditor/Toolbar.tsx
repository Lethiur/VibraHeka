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
import { RichTextCallout } from 'reactjs-tiptap-editor/callout';

import './Toolbar.scss';

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
            <RichTextCallout />
        </div>
    );
};