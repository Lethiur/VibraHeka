import { Node } from '@tiptap/core';

export interface EmailButtonAttributes {
    label: string;
    url: string;
    align?: 'left' | 'center' | 'right';
    fontSize: number;
    [key: string]: unknown;
}

export const EMAIL_CTA_EDIT_EVENT = 'vh:email-cta-edit';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        emailButton: {
            setEmailButton: (attrs: EmailButtonAttributes) => ReturnType;
            updateEmailButton: (attrs: EmailButtonAttributes) => ReturnType;
            removeEmailButton: () => ReturnType;
        };
    }
}

export const EmailButton = Node.create({
    name: 'emailButton',

    group: 'block',
    atom: true,
    selectable: true,

    addAttributes() {
        return {
            label: {
                default: 'Quiero empezar',
            },
            url: {
                default: 'https://',
            },
            align: {
                default: 'center',
                parseHTML: (element) => {
                    const value = element.getAttribute('data-email-align');
                    if (value === 'left' || value === 'right' || value === 'center') {
                        return value;
                    }
                    return 'center';
                },
            },
            fontSize: {
                default: 16,
                parseHTML: (element) => {
                    const raw = Number(element.getAttribute('data-email-font-size'));
                    return Number.isFinite(raw) && raw >= 12 && raw <= 32 ? raw : 16;
                },
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-email-button="true"]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        const safeLabel = String(HTMLAttributes.label ?? 'Quiero empezar');
        const safeUrl = String(HTMLAttributes.url ?? 'https://');
        const rawAlign = String(HTMLAttributes.align ?? 'center');
        const safeAlign = rawAlign === 'left' || rawAlign === 'right' ? rawAlign : 'center';
        const rawFontSize = Number(HTMLAttributes.fontSize ?? 16);
        const safeFontSize = Number.isFinite(rawFontSize) && rawFontSize >= 12 && rawFontSize <= 32 ? rawFontSize : 16;

        return [
            'div',
            {
                'data-email-button': 'true',
                'data-email-align': safeAlign,
                'data-email-font-size': String(safeFontSize),
                class: 'email-editor-cta-wrap',
                style: `text-align:${safeAlign};margin:16px 0;`,
            },
            [
                'a',
                {
                    href: safeUrl,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    class: 'email-editor-cta',
                    style: `display:inline-block;background-color:#8a81d4;color:#ffffff;text-decoration:none;font-weight:700;padding:14px 28px;border-radius:999px;border:0;outline:none;line-height:1.2;font-size:${safeFontSize}px;`,
                },
                safeLabel,
            ],
        ];
    },

    addCommands() {
        return {
            setEmailButton:
                (attrs: EmailButtonAttributes) =>
                ({ chain }) =>
                    chain().insertContent({ type: this.name, attrs }).run(),
            updateEmailButton:
                (attrs: EmailButtonAttributes) =>
                ({ commands }) =>
                    commands.updateAttributes(this.name, attrs),
            removeEmailButton:
                () =>
                ({ commands }) =>
                    commands.deleteNode(this.name),
        };
    },
});
