import { RichTextProvider } from 'reactjs-tiptap-editor'
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";

// Base Kit
import { Document } from '@tiptap/extension-document';
import { HardBreak } from '@tiptap/extension-hard-break';
import { ListItem } from '@tiptap/extension-list';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Text } from '@tiptap/extension-text';
import { TextStyle } from '@tiptap/extension-text-style';
import {
    Dropcursor,
    Gapcursor,
    Placeholder,
    TrailingNode,
} from '@tiptap/extensions';

// build extensions

import { Attachment } from 'reactjs-tiptap-editor/attachment';
import { Blockquote } from 'reactjs-tiptap-editor/blockquote';
import { Bold } from 'reactjs-tiptap-editor/bold';
import { BulletList } from 'reactjs-tiptap-editor/bulletlist';
import { Clear } from 'reactjs-tiptap-editor/clear';
import { Color } from 'reactjs-tiptap-editor/color';
import { Column, ColumnNode, MultipleColumnNode } from 'reactjs-tiptap-editor/column';
import { Emoji } from 'reactjs-tiptap-editor/emoji';
import { FontFamily } from 'reactjs-tiptap-editor/fontfamily';
import { FontSize } from 'reactjs-tiptap-editor/fontsize';
import { Heading } from 'reactjs-tiptap-editor/heading';
import { Highlight } from 'reactjs-tiptap-editor/highlight';
import { History } from 'reactjs-tiptap-editor/history';
import { HorizontalRule } from 'reactjs-tiptap-editor/horizontalrule';
import { Image } from 'reactjs-tiptap-editor/image';
import { Indent } from 'reactjs-tiptap-editor/indent';
import { Italic } from 'reactjs-tiptap-editor/italic';
import { LineHeight } from 'reactjs-tiptap-editor/lineheight';
import { Link } from 'reactjs-tiptap-editor/link';
import { MoreMark } from 'reactjs-tiptap-editor/moremark';
import { OrderedList } from 'reactjs-tiptap-editor/orderedlist';
import { SearchAndReplace } from 'reactjs-tiptap-editor/searchandreplace';
import { Strike } from 'reactjs-tiptap-editor/strike';
import { Table } from 'reactjs-tiptap-editor/table';
import { TextAlign } from 'reactjs-tiptap-editor/textalign';
import { TextDirection } from 'reactjs-tiptap-editor/textdirection';
import { TextUnderline } from 'reactjs-tiptap-editor/textunderline';
import { Video } from 'reactjs-tiptap-editor/video';
import { Callout } from 'reactjs-tiptap-editor/callout';

import {
    RichTextBubbleColumns,
    RichTextBubbleLink,
    RichTextBubbleMermaid,
    RichTextBubbleTable,
    RichTextBubbleVideo,
    RichTextBubbleMenuDragHandle,
    RichTextBubbleCallout,
    RichTextBubbleDrawer,
    RichTextBubbleExcalidraw,
    RichTextBubbleKatex,
    RichTextBubbleIframe,
    RichTextBubbleImage,
    RichTextBubbleImageGif,
    RichTextBubbleText,
    RichTextBubbleTwitter,
} from 'reactjs-tiptap-editor/bubble';
import { CharacterCount } from '@tiptap/extensions';

import { useEffect } from 'react';

import 'reactjs-tiptap-editor/style.css';
import '@tiptap/extension-text-style';
import { EMOJI_ITEM_LIST, EMOJI_LIST } from '@/Core/Presentation/Components/organisms/TextEditor/Emojis';
import { Count } from './Extensions/Count';
import { EditorToolbar } from './Toolbar';
import PrimaryButton from '../../atoms/PrimaryButton/PrimaryButton';

const DocumentColumn = Document.extend({
    content: 'block+',
});
const BaseKit = [
    DocumentColumn,
    Text,
    Dropcursor.configure({
        class: 'reactjs-tiptap-editor-theme',
        color: 'hsl(var(--primary))',
        width: 2,
    }),
    Gapcursor,
    HardBreak,
    Paragraph,
    TrailingNode,
    ListItem,
    TextStyle,
    Placeholder.configure({
        placeholder: "Press '/' for commands",
    }),
];


const LIMIT = 2505;

const extensions = [
    ...BaseKit,
    CharacterCount.configure({
        limit: LIMIT,
    }),

    History,
    SearchAndReplace,
    Clear,
    FontFamily,
    Heading,
    FontSize,
    Bold,
    Italic,
    TextUnderline,
    Strike,
    MoreMark,
    Emoji.configure({
        emojis: EMOJI_ITEM_LIST,
        suggestion: {
            items: async ({ query }: any) => {
                const lowerCaseQuery = query?.toLowerCase();
                return EMOJI_LIST.filter(({ name }) => name.toLowerCase().includes(lowerCaseQuery));
            },

        },
    }),
    Color,
    Highlight,
    BulletList,
    OrderedList,
    TextAlign,
    Indent,
    LineHeight,
    Link,
    Blockquote,
    HorizontalRule,

    Column,
    ColumnNode,
    MultipleColumnNode,
    Table,
    TextDirection,
    Attachment,
    Callout
];

interface TextEditorProps {
    content: string;
    onChange: (content: JSONContent) => void;
    onSave: (content: JSONContent) => void;
    onMediaUpload: (content: File) => Promise<string>;
    characterLimit?: number;
}

export default function TextEditor({ content, onChange, onSave, onMediaUpload, characterLimit = LIMIT }: TextEditorProps) {

    console.log(content);
    const editor = useEditor({
        textDirection: 'auto',
        extensions: [...extensions,
        Image.configure({
            upload: onMediaUpload,
        },
        ),
        Video.configure({
            upload: onMediaUpload,
        }),
        ],
        content: JSON.parse(content == "" ? "{}" : content),
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getJSON())
        },
    });

    useEffect(() => {
        // @ts-ignore
        window['editor'] = editor;
    }, [editor]);

    if (!editor) return null
    return (
        <>
            <div className="w-full max-w-[1200px] mx-[auto] my-0 px-4">

                <RichTextProvider editor={editor!}>
                    <div className="rounded-[0.5rem] bg-background !border !border-border">
                        <div className="flex max-h-full w-full flex-col">
                            <div className="absolute top-0 z-10 bg-background border-b">
                                <div className="flex justify-end p-2">
                                    <EditorToolbar />
                                    <PrimaryButton onClick={() => onSave(editor.getJSON())} label='Guardar' />
                                </div>
                            </div>


                            <EditorContent editor={editor} />
                            <RichTextBubbleColumns />
                            <RichTextBubbleDrawer />
                            <RichTextBubbleExcalidraw />
                            <RichTextBubbleIframe />
                            <RichTextBubbleKatex />
                            <RichTextBubbleLink />

                            <RichTextBubbleImage />
                            <RichTextBubbleVideo />
                            <RichTextBubbleImageGif />

                            <RichTextBubbleMermaid />
                            <RichTextBubbleTable />
                            <RichTextBubbleText />
                            <RichTextBubbleTwitter />
                            <RichTextBubbleCallout />

                            {/* Command List */}

                            <RichTextBubbleMenuDragHandle />
                        </div>

                        <Count editor={editor!} limit={characterLimit} />
                    </div>
                </RichTextProvider>


            </div>
        </>
    );
}
