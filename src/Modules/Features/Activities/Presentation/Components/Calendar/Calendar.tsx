import { Link } from "react-router-dom";
import "./Calendar.scss";
import { ACTIVITIES_DATA, Activity, ActivityWeek } from "../../../Data/ActivitiesData";
import React from "react";

const Calendar: React.FC = () => {
    return (
        <div className="vh-calendar">
            {/* Global Header for Web */}
            <div className="vh-calendar__global-header">
                <div className="vh-calendar__global-header-spacer"></div>
                <div className="vh-calendar__global-header-cell">Jueves</div>
                <div className="vh-calendar__global-header-cell">Viernes</div>
                <div className="vh-calendar__global-header-cell">Sábado</div>
            </div>

            {ACTIVITIES_DATA.map((week: ActivityWeek, index: number) => (
                <div className="vh-calendar__week" key={index}>
                    <div className="vh-calendar__week-sidebar">
                        <span className="vh-calendar__week-name">{week.label}</span>
                        <span className="vh-calendar__week-theme">{week.theme}</span>
                    </div>
                    <div className="vh-calendar__week-days">
                        {week.activities.wednesday && <DayColumn activity={week.activities.wednesday} fallbackWeekday="Miércoles" />}
                        <DayColumn activity={week.activities.thursday} fallbackWeekday="Jueves" />
                        {week.activities.friday && <DayColumn activity={week.activities.friday} fallbackWeekday="Viernes" />}
                        {week.activities.saturday && <DayColumn activity={week.activities.saturday} fallbackWeekday="Sábado" />}
                    </div>
                </div>
            ))}
        </div>
    );
};

interface DayColumnProps {
    activity?: Activity;
    fallbackWeekday: string;
}

const DayColumn: React.FC<DayColumnProps> = ({ activity, fallbackWeekday }) => {
    return (
        <div className="vh-calendar__day-column">
            <div className="vh-calendar__day-header">
                {/* Visualizado solo en Mobile para dar contexto */}
                <span className="vh-calendar__day-header-dayname">{activity?.weekday || fallbackWeekday}</span>
                <span className="vh-calendar__day-header-daynum">{activity?.day || ""}</span>
            </div>
            {activity ? (
                <CalendarCell activity={activity} />
            ) : (
                <div className="vh-calendar__cell vh-calendar__cell--empty"></div>
            )}
        </div>
    );
};

interface CalendarCellProps {
    activity: Activity;
}

const CalendarCell: React.FC<CalendarCellProps> = ({ activity }) => {
    return (
        <div className="vh-calendar__cell">
            <div className="vh-calendar__cell-content">
                <div className="vh-calendar__item">
                    <strong>Horas:</strong> {activity.time}
                </div>
                <div className="vh-calendar__item">
                    <strong>Terapeuta:</strong>{" "}
                    {activity.therapistHandle ? (
                        <Link to={`/terapeutas/${activity.therapistHandle}`} className="vh-calendar__link">
                            {activity.therapist}
                        </Link>
                    ) : (
                        activity.therapist
                    )}
                    {activity.extraTherapistHandle && (
                        <>
                            {" y "}
                            <Link to={`/terapeutas/${activity.extraTherapistHandle}`} className="vh-calendar__link">
                                Luis Galvis
                            </Link>
                        </>
                    )}
                </div>
                <div className="vh-calendar__item">
                    <strong>Formato:</strong> {activity.format}
                </div>
                <div className="vh-calendar__item">
                    <strong>Título:</strong> {activity.title}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
