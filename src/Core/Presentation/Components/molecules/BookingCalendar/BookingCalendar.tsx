
import React from "react";
import { DayPicker } from "react-day-picker";
import { format, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import "react-day-picker/style.css";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";

interface BookingCalendarProps {
    /**
     * List of dates that are available for booking.
     * Days not in this list will be disabled.
     */
    availableDates: Date[];

    /**
     * Available time slots for the currently selected date.
     */
    availableSlots: string[];

    /**
     * Callback fired when a date is selected.
     */
    onDateSelect: (date: Date | undefined) => void;

    /**
     * Callback fired when a time slot is selected.
     */
    onSlotSelect: (slot: string) => void;

    /**
     * Whether the slots are loading.
     */
    isLoadingSlots?: boolean;

    /**
     * Currently selected date (controlled).
     */
    selectedDate?: Date;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
    availableDates,
    availableSlots,
    onDateSelect,
    onSlotSelect,
    isLoadingSlots = false,
    selectedDate,
}) => {
    // We use a modifier to disable days that are not in the availableDates array.
    // We disable any day that is NOT in availableDates.
    const isDateAvailable = (date: Date) => {
        return availableDates.some((availableDate) => isSameDay(date, availableDate));
    };

    const disabledDays = (date: Date) => {
        return !isDateAvailable(date);
    };

    return (
        <Row>
            <Col md={selectedDate ? 6 : 12} className="d-flex justify-content-center transition-all">
                <div className="p-3 bg-white rounded shadow-sm border">
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={onDateSelect}
                        disabled={disabledDays}
                        locale={es}
                        modifiersClassNames={{
                            selected: "bg-primary text-white",
                            today: "fw-bold text-primary"
                        }}
                        styles={{
                            head_cell: {
                                width: "40px",
                            },
                            table: {
                                maxWidth: "none",
                            },
                            day: {
                                margin: "0.2em",
                            },
                        }}
                    />
                </div>
            </Col>

            {selectedDate && (
                <Col md={6} className="mt-4 mt-md-0 fade-in">
                    <Card className="h-100 border-0 shadow-sm">
                        <Card.Header className="bg-white border-bottom-0 pt-4">
                            <h5 className="mb-0">
                                Horarios disponibles para el {format(selectedDate, "PPP", { locale: es })}
                            </h5>
                        </Card.Header>
                        <Card.Body>
                            {isLoadingSlots ? (
                                <div className="text-center py-5">
                                    <Spinner animation="border" variant="primary" />
                                    <p className="mt-2 text-muted">Cargando horarios...</p>
                                </div>
                            ) : availableSlots.length > 0 ? (
                                <div className="d-grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))" }}>
                                    {availableSlots.map((slot) => (
                                        <Button
                                            key={slot}
                                            variant="outline-primary"
                                            className="m-1"
                                            onClick={() => onSlotSelect(slot)}
                                        >
                                            {slot}
                                        </Button>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-4 text-muted">
                                    No hay horarios disponibles para este día.
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            )}
        </Row>
    );
};
