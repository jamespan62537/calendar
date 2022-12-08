import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import PropTypes from "prop-types";

// Component
import CalendarInputComponent from "./CalendarInputComponent";
import CalendarContainerComponent from "./CalendarContainerComponent";
import CalendarHeaderComponent from "./CalendarHeaderComponent";
import CalendarBodyComponent from "./CalendarBodyComponent";
import ButtonComponent from "../Button";
import CalendarDaysTableComponent from "./CalendarDaysTableComponent";
import CalendarMonthTableComponent from "./CalendarMonthTableComponent";
import CalendarYearTableComponent from "./CalendarYearTableComponent";
// Util
import {
  getStartDayOfMonth,
  checkIsLeapYear,
  getYearPeriodUtil,
} from "../../../utils/timeUtil";
// Enum
import { CalendarTableTypeEnum } from "../../../enums/CalendarEnum";

const today = new Date();

const { DAYS_TABLE, MONTH_TABLE, YEAR_TABLE } = CalendarTableTypeEnum;

const switchOperation = {
  MINUS: "minus",
  PLUS: "plus",
};

const { MINUS, PLUS } = switchOperation;

const defaultProps = {
  initialValue: null,
  onSelected: () => {},
};

const propTypes = {
  initialValue: PropTypes.object,
  onSelected: PropTypes.func,
};

const CalendarComponent = ({ initialValue, onSelected }) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [date, setDate] = useState(initialValue || today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [isLeapYear, setIsLeapYear] = useState(
    checkIsLeapYear(date.getFullYear())
  );
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
  const [currentTable, setCurrentTable] = useState(DAYS_TABLE);

  const calendarRef = useRef(null);

  const yearPeriod = useMemo(() => getYearPeriodUtil(year), [year]);

  const monthList = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const handleSetDate = useCallback(
    (date) => {
      onSelected(date);
      setDate(date);
    },
    [onSelected]
  );

  const handleSwitchTable = useCallback((table) => setCurrentTable(table), []);

  const handleSetCalendarVisible = useCallback(
    (isVisible) => setIsCalendarVisible(isVisible),
    []
  );

  const handleSwitchDateByTable = useCallback(
    (operation) => {
      if (currentTable === DAYS_TABLE) {
        if (operation === PLUS) handleSetDate(new Date(year, month + 1, day));
        else handleSetDate(new Date(year, month - 1, day));
      }
      if (currentTable === MONTH_TABLE) {
        if (operation === PLUS) handleSetDate(new Date(year + 1, month, day));
        else handleSetDate(new Date(year - 1, month, day));
      }
      if (currentTable === YEAR_TABLE) {
        if (operation === PLUS) handleSetDate(new Date(year + 10, month, day));
        else handleSetDate(new Date(year - 10, month, day));
      }
    },
    [currentTable, day, handleSetDate, month, year]
  );

  const renderYearWithMonth = useCallback(() => {
    return (
      <div
        className="font-medium text-lg cursor-pointer"
        onClick={() => {
          if (currentTable === DAYS_TABLE) handleSwitchTable(MONTH_TABLE);
          else if (currentTable === MONTH_TABLE) handleSwitchTable(YEAR_TABLE);
          else handleSwitchTable(DAYS_TABLE);
        }}
      >
        {currentTable === DAYS_TABLE && (
          <>
            <span className="mx-1">{monthList[month]}</span>
            <span className="mx-1">{year}</span>
          </>
        )}
        {currentTable === MONTH_TABLE && <span className="mx-1">{year}</span>}
        {currentTable === YEAR_TABLE && (
          <>
            <span className="mx-1">{yearPeriod[0]}</span> -
            <span className="mx-1">{yearPeriod[yearPeriod.length - 1]}</span>
          </>
        )}
      </div>
    );
  }, [month, monthList, year, yearPeriod, currentTable, handleSwitchTable]);

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
    setIsLeapYear(checkIsLeapYear(date.getFullYear()));
  }, [date, day, month, year]);

  useEffect(() => {
    if (!calendarRef.current) return;

    const handleMouseUp = (event) => {
      const isClickCalendar = calendarRef?.current?.contains(event.target);

      if (!isClickCalendar) {
        handleSetCalendarVisible(false);
      }
    };

    window.addEventListener("mouseup", handleMouseUp);

    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [handleSetCalendarVisible]);

  return (
    <CalendarInputComponent
      calendarRef={calendarRef}
      date={date}
      handleSetCalendarVisible={handleSetCalendarVisible}
    >
      <CalendarContainerComponent isCalendarVisible={isCalendarVisible}>
        <CalendarHeaderComponent>
          <ButtonComponent onClick={() => handleSwitchDateByTable(MINUS)}>
            Prev
          </ButtonComponent>
          {renderYearWithMonth()}
          <ButtonComponent onClick={() => handleSwitchDateByTable(PLUS)}>
            Next
          </ButtonComponent>
        </CalendarHeaderComponent>
        <CalendarBodyComponent>
          {currentTable === DAYS_TABLE && (
            <CalendarDaysTableComponent
              year={year}
              month={month}
              day={day}
              isLeapYear={isLeapYear}
              startDay={startDay}
              handleSetDate={handleSetDate}
              handleSetCalendarVisible={handleSetCalendarVisible}
            />
          )}
          {currentTable === MONTH_TABLE && (
            <CalendarMonthTableComponent
              year={year}
              month={month}
              day={day}
              monthList={monthList}
              handleSetDate={handleSetDate}
              handleSwitchTable={handleSwitchTable}
            />
          )}
          {currentTable === YEAR_TABLE && (
            <CalendarYearTableComponent
              year={year}
              month={month}
              day={day}
              yearPeriod={yearPeriod}
              handleSetDate={handleSetDate}
              handleSwitchTable={handleSwitchTable}
            />
          )}
        </CalendarBodyComponent>
      </CalendarContainerComponent>
    </CalendarInputComponent>
  );
};

CalendarComponent.defaultProps = defaultProps;
CalendarComponent.propTypes = propTypes;
export default CalendarComponent;
