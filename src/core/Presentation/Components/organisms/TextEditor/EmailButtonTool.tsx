import type { Editor } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import { Button, Form, Overlay, Popover } from "react-bootstrap";
import "./EmailButtonTool.scss";

interface EmailButtonToolProps {
    editor: Editor | null;
}

interface EmailCtaEditEventDetail {
    label: string;
    url: string;
    pos: number;
}

const EMAIL_CTA_EDIT_EVENT = "vh:email-cta-edit";

export default function EmailButtonTool({ editor }: EmailButtonToolProps) {
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [label, setLabel] = useState<string>("Quiero empezar");
    const [url, setUrl] = useState<string>("https://");
    const [error, setError] = useState<string>("");
    const [editingPos, setEditingPos] = useState<number | null>(null);
    const targetRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const onEditEvent = (event: Event) => {
            const customEvent = event as CustomEvent<EmailCtaEditEventDetail>;
            setLabel(customEvent.detail.label);
            setUrl(customEvent.detail.url);
            setEditingPos(customEvent.detail.pos);
            setShowPopover(true);
            setError("");
        };

        window.addEventListener(EMAIL_CTA_EDIT_EVENT, onEditEvent as EventListener);
        return () => window.removeEventListener(EMAIL_CTA_EDIT_EVENT, onEditEvent as EventListener);
    }, []);

    const handleInsertEmailButton = () => {
        if (!editor) return;

        const trimmedLabel = label.trim();
        const trimmedUrl = url.trim();

        if (!trimmedLabel || !trimmedUrl) {
            setError("Texto y URL son obligatorios.");
            return;
        }

        if (editingPos !== null) {
            editor
                .chain()
                .focus()
                .command(({ tr }) => {
                    tr.setNodeMarkup(editingPos, undefined, {
                        label: trimmedLabel,
                        url: trimmedUrl,
                    });
                    return true;
                })
                .run();
        } else {
            editor.commands.setEmailButton({
                label: trimmedLabel,
                url: trimmedUrl,
            });
        }

        setError("");
        setShowPopover(false);
        setEditingPos(null);
    };

    const handleDeleteEmailButton = () => {
        if (!editor || editingPos === null) return;

        editor
            .chain()
            .focus()
            .command(({ tr }) => {
                const node = tr.doc.nodeAt(editingPos);
                if (!node) return false;
                tr.delete(editingPos, editingPos + node.nodeSize);
                return true;
            })
            .run();

        setShowPopover(false);
        setEditingPos(null);
    };

    return (
        <>
            <button
                ref={targetRef}
                type="button"
                className="editor-toolbar__btn editor-toolbar__btn--cta"
                onClick={() => {
                    setEditingPos(null);
                    setShowPopover((prevState) => !prevState);
                }}
                title="Insertar boton CTA"
            >
                CTA
            </button>

            <Overlay
                target={targetRef.current}
                show={showPopover}
                placement="bottom"
                rootClose={true}
                onHide={() => setShowPopover(false)}
            >
                <Popover className="email-button-tool__popover">
                    <Popover.Header as="h3">
                        {editingPos !== null ? "Editar boton CTA" : "Insertar boton CTA"}
                    </Popover.Header>
                    <Popover.Body>
                        <Form.Group className="mb-2" controlId="ctaLabel">
                            <Form.Label>Texto</Form.Label>
                            <Form.Control
                                type="text"
                                value={label}
                                onChange={(event) => setLabel(event.target.value)}
                                placeholder="Quiero empezar"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="ctaUrl">
                            <Form.Label>URL</Form.Label>
                            <Form.Control
                                type="url"
                                value={url}
                                onChange={(event) => setUrl(event.target.value)}
                                placeholder="https://"
                            />
                        </Form.Group>

                        {error && <small className="email-button-tool__error">{error}</small>}

                        <div className="d-flex justify-content-end gap-2 mt-3">
                            {editingPos !== null && (
                                <Button size="sm" variant="outline-danger" onClick={handleDeleteEmailButton}>
                                    Eliminar
                                </Button>
                            )}
                            <Button size="sm" variant="primary" onClick={handleInsertEmailButton}>
                                {editingPos !== null ? "Guardar cambios" : "Insertar"}
                            </Button>
                        </div>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </>
    );
}
