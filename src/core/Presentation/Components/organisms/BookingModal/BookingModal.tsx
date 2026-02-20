
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { BookingCalendar } from "../../molecules/BookingCalendar/BookingCalendar";
import { addDays } from "date-fns";

interface BookingModalProps {
    show: boolean;
    onHide: () => void;
    therapyId: string;
    therapistId: string;
}

// Simulamos una llamada al backend para obtener fechas disponibles
const fetchAvailableDates = async (_therapistId: string, _therapyId: string): Promise<Date[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simula que los próximos 10 días están disponibles alternativamente
            const today = new Date();
            const dates = [
                addDays(today, 1),
                addDays(today, 3),
                addDays(today, 4),
                addDays(today, 6),
                addDays(today, 10),
            ];
            resolve(dates);
        }, 500);
    });
};

// Simulamos una llamada al backend para obtener horas disponibles para una fecha
const fetchAvailableSlots = async (_date: Date): Promise<string[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Retorna diferentes horarios mockeados
            resolve(["10:00", "11:00", "16:00", "17:30"]);
        }, 300);
    });
};

export const BookingModal: React.FC<BookingModalProps> = ({ show, onHide, therapyId, therapistId }) => {
    const [availableDates, setAvailableDates] = useState<Date[]>([]);
    const [loadingDates, setLoadingDates] = useState(false);

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);

    // Cargar fechas cuando se abre el modal
    useEffect(() => {
        if (show) {
            setLoadingDates(true);
            fetchAvailableDates(therapistId, therapyId)
                .then((dates) => {
                    setAvailableDates(dates);
                })
                .finally(() => setLoadingDates(false));

            // Reset state
            setSelectedDate(undefined);
            setAvailableSlots([]);
        }
    }, [show, therapistId, therapyId]);

    // Cargar horas cuando se selecciona una fecha
    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date);
        if (date) {
            setLoadingSlots(true);
            fetchAvailableSlots(date)
                .then((slots) => {
                    setAvailableSlots(slots);
                })
                .finally(() => setLoadingSlots(false));
        } else {
            setAvailableSlots([]);
        }
    };

    const handleSlotSelect = (slot: string) => {
        alert(`Has seleccionado el horario: ${slot} para el día ${selectedDate?.toLocaleDateString()}`);
        // Aquí iría la lógica de reserva real
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Reservar Terapia</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loadingDates ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2 text-muted">Cargando disponibilidad...</p>
                    </div>
                ) : (
                    <BookingCalendar
                        availableDates={availableDates}
                        availableSlots={availableSlots}
                        onDateSelect={handleDateSelect}
                        onSlotSelect={handleSlotSelect}
                        isLoadingSlots={loadingSlots}
                        selectedDate={selectedDate}
                    />
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
