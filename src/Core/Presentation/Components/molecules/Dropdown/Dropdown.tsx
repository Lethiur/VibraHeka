

import { useMemo, useState, ChangeEvent, useId } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

/* ============
   Props genéricas
   ============ */

interface SearchableDropdownProps<T> {
    label: string;
    options: T[] | undefined;
    isLoading: boolean;
    value: T | null;
    getId: (item: T) => string;
    getLabel: (item: T) => string;
    onChange?: (item: T) => void;
}

/* ============
   Componente
   ============ */

export default function SearchableDropdown<T>({
    label,
    options,
    isLoading,
    value,
    getId,
    getLabel,
    onChange,
}: SearchableDropdownProps<T>) {
    const dropdownId = useId();

    const [search, setSearch] = useState<string>("");

    /* ============
       Filtrado
       ============ */

    const filteredOptions = useMemo<T[]>(() => {
        if (!options) return [];

        const query = search.trim().toLowerCase();

        if (query === "") return options;

        return options.filter(item =>
            getLabel(item).toLowerCase().includes(query)
        );
    }, [options, search, getLabel]);

    /* ============
       Handlers
       ============ */

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearch(e.target.value);
    };

    const handleSelect = (item: T): void => {

        setSearch("");
        onChange?.(item);
    };

    /* ============
       Render
       ============ */

    return (
        <Form.Group className="w-100">
            <Form.Label htmlFor={dropdownId}>{label}</Form.Label>

            <Dropdown className="w-100">
                <Dropdown.Toggle
                    id={dropdownId}
                    variant="outline-primary"
                    className="w-100 text-start d-flex justify-content-between align-items-center"
                    disabled={isLoading}
                >
                    {

                        isLoading ? (
                            <>
                                <span>Cargando…</span>
                                <Spinner animation="border" size="sm" />
                            </>
                        ) : value ? (
                            getLabel(value)
                        ) : (
                            "Selecciona una opción"
                        )}
                </Dropdown.Toggle>

                {!isLoading && (
                    <Dropdown.Menu
                        className="w-100"
                        style={{ maxHeight: "300px", overflowY: "auto" }}
                    >
                        <Form.Control
                            type="text"
                            placeholder="Buscar..."
                            className="mx-2 my-2"
                            value={search}
                            onChange={handleSearchChange}
                            autoFocus
                        />

                        <Dropdown.Divider />

                        {filteredOptions.length === 0 ? (
                            <Dropdown.Item disabled>
                                No hay resultados
                            </Dropdown.Item>
                        ) : (
                            filteredOptions.map(item => (
                                <Dropdown.Item
                                    key={getId(item)}
                                    onClick={() => handleSelect(item)}
                                >
                                    {getLabel(item)}
                                </Dropdown.Item>
                            ))
                        )}
                    </Dropdown.Menu>
                )}
            </Dropdown>
        </Form.Group>
    );
}
