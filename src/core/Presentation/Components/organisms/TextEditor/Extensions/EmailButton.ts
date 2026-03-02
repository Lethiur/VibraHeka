import { Node } from '@tiptap/core';

export interface EmailButtonAttributes {
    label: string;
    url: string;
}

const EMAIL_CTA_EDIT_EVENT = 'vh:email-cta-edit';

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

        return [
            'div',
            {
                'data-email-button': 'true',
                class: 'email-editor-cta-wrap',
                style: 'text-align:center;margin:16px 0;',
            },
            [
                'table',
                {
                    role: 'presentation',
                    border: '0',
                    cellpadding: '0',
                    cellspacing: '0',
                    align: 'center',
                    style: 'margin:0 auto;',
                },
                [
                    'tr',
                    [
                        'td',
                        {
                            align: 'center',
                        },
                        [
                            'a',
                            {
                                href: safeUrl,
                                target: '_blank',
                                rel: 'noopener noreferrer',
                                class: 'email-editor-cta',
                                style: 'display:inline-block;background-color:#8a81d4;color:#ffffff;text-decoration:none;font-weight:700;padding:14px 28px;border-radius:999px;',
                            },
                            safeLabel,
                        ],
                    ],
                ],
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

    addNodeView() {
        return ({ node, getPos, editor }) => {
            const dom = document.createElement('div');
            dom.className = 'email-editor-cta-wrap email-editor-cta-node';
            dom.setAttribute('data-email-button', 'true');

            const link = document.createElement('a');
            link.className = 'email-editor-cta';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';

            const actions = document.createElement('div');
            actions.className = 'email-editor-cta-actions';

            const editButton = document.createElement('button');
            editButton.type = 'button';
            editButton.className = 'email-editor-cta-action-btn';
            editButton.textContent = 'Editar';

            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.className = 'email-editor-cta-action-btn email-editor-cta-action-btn--danger';
            deleteButton.textContent = 'Eliminar';

            actions.appendChild(editButton);
            actions.appendChild(deleteButton);
            dom.appendChild(link);
            dom.appendChild(actions);

            const sync = (attrs: EmailButtonAttributes) => {
                link.textContent = attrs.label;
                link.href = attrs.url;
            };

            const toggleActions = (show: boolean) => {
                dom.classList.toggle('is-open', show);
            };

            sync(node.attrs as EmailButtonAttributes);

            link.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                toggleActions(true);
            });

            dom.addEventListener('click', (event) => {
                event.stopPropagation();
                toggleActions(true);
            });

            editButton.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                const pos = typeof getPos === 'function' ? getPos() : getPos;
                if (pos === undefined) return;
                window.dispatchEvent(
                    new CustomEvent(EMAIL_CTA_EDIT_EVENT, {
                        detail: {
                            label: String(node.attrs.label ?? ''),
                            url: String(node.attrs.url ?? ''),
                            pos,
                        },
                    }),
                );
            });

            deleteButton.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                const pos = typeof getPos === 'function' ? getPos() : getPos;
                if (pos === undefined) return;
                editor
                    .chain()
                    .focus()
                    .command(({ tr }) => {
                        tr.delete(pos, pos + node.nodeSize);
                        return true;
                    })
                    .run();
            });

            document.addEventListener('click', () => toggleActions(false));

            return {
                dom,
                update: (updatedNode) => {
                    if (updatedNode.type.name !== this.name) return false;
                    sync(updatedNode.attrs as EmailButtonAttributes);
                    return true;
                },
                ignoreMutation: () => true,
            };
        };
    },
});
