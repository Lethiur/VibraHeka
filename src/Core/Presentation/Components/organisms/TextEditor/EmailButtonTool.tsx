import type { Editor } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import { Button, Form, Overlay, Popover } from "react-bootstrap";
import { EMAIL_CTA_EDIT_EVENT, type EmailButtonAttributes } from "./Extensions/EmailButton";
import "./EmailButtonTool.scss";

interface EmailButtonToolProps {
    editor: Editor | null;
}

interface EmailCtaEditEventDetail {
    label: string;
    url: string;
    pos: number;
    fontSize?: number;
}

export default function EmailButtonTool({ editor }: EmailButtonToolProps) {
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [label, setLabel] = useState<string>("Quiero empezar");
    const [url, setUrl] = useState<string>("https://");
    const [fontSize, setFontSize] = useState<number>(16);
    const [error, setError] = useState<string>("");
    const [editingPos, setEditingPos] = useState<number | null>(null);
    const targetRef = useRef<HTMLButtonElement | null>(null);

    const resolveCurrentAlign = (): NonNullable<EmailButtonAttributes["align"]> => {
        if (!editor) return "center";

        const selectionAlign = editor.state.selection.$from.parent.attrs?.textAlign;
        if (selectionAlign === "left" || selectionAlign === "center" || selectionAlign === "right") {
            return selectionAlign;
        }

        const paragraphAlign = editor.getAttributes("paragraph")?.textAlign;
        if (paragraphAlign === "left" || paragraphAlign === "center" || paragraphAlign === "right") {
            return paragraphAlign;
        }

        const headingAlign = editor.getAttributes("heading")?.textAlign;
        if (headingAlign === "left" || headingAlign === "center" || headingAlign === "right") {
            return headingAlign;
        }

        const { from } = editor.state.selection;
        const resolvedPos = editor.state.doc.resolve(from);

        for (let depth = resolvedPos.depth; depth >= 0; depth -= 1) {
            const node = resolvedPos.node(depth) as { attrs?: Record<string, unknown> };
            const align = node.attrs?.textAlign;
            if (align === "left" || align === "center" || align === "right") {
                return align;
            }
        }

        return "center";
    };

    useEffect(() => {
        const onEditEvent = (event: Event) => {
            const customEvent = event as CustomEvent<EmailCtaEditEventDetail>;
            setLabel(customEvent.detail.label);
            setUrl(customEvent.detail.url);
            setFontSize(customEvent.detail.fontSize && customEvent.detail.fontSize >= 12 ? customEvent.detail.fontSize : 16);
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
                    const currentNode = tr.doc.nodeAt(editingPos);
                    const currentAlign = currentNode?.attrs?.align;
                    const safeAlign =
                        currentAlign === "left" || currentAlign === "right" || currentAlign === "center"
                            ? currentAlign
                            : "center";

                    tr.setNodeMarkup(editingPos, undefined, {
                        label: trimmedLabel,
                        url: trimmedUrl,
                        align: safeAlign,
                        fontSize,
                    });
                    return true;
                })
                .run();
        } else {
            editor.commands.setEmailButton({
                label: trimmedLabel,
                url: trimmedUrl,
                align: resolveCurrentAlign(),
                fontSize,
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
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                    setEditingPos(null);
                    setFontSize(16);
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

                        <Form.Group className="mb-3" controlId="ctaFontSize">
                            <Form.Label>Tamano de fuente</Form.Label>
                            <Form.Select
                                value={fontSize}
                                onChange={(event) => setFontSize(Number(event.target.value))}
                            >
                                <option value={14}>14 px</option>
                                <option value={16}>16 px</option>
                                <option value={18}>18 px</option>
                                <option value={20}>20 px</option>
                                <option value={22}>22 px</option>
                            </Form.Select>
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
