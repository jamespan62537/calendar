import { useState, useEffect, useCallback, useMemo } from "react";

// Component
import CalendarContainerComponent from "./CalendarContainerComponent";
import CalendarHeaderComponent from "./CalendarHeaderComponent";
import CalendarBodyComponent from "./CalendarBodyComponent";
import ButtonComponent from "../ButtonComponent";
import CalendarDaysTableComponent from "./CalendarDaysTableComponent";
import CalendarMonthTableComponent from "./CalendarMonthTableComponent";
// Util
import { getStartDayOfMonth, checkIsLeapYear } from "../../../utils/timeUtil";

const today = new Date();

const tableType = {
  DAYS_TABLE: "daysTable",
  MONTH_TABLE: "monthTable",
  YEAR_TABLE: "yearTable",
};

const { DAYS_TABLE, MONTH_TABLE, YEAR_TABLE } = tableType;

const CalendarComponent = () => {
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [isLeapYear, setIsLeapYear] = useState(
    checkIsLeapYear(date.getFullYear())
  );
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
  const [currentTable, setCurrentTable] = useState(DAYS_TABLE);

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

  const handleSetDate = useCallback((date) => {
    setDate(date);
  }, []);

  const handleSwitchTable = useCallback((table) => {
    setCurrentTable(table);
  }, []);

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
        {currentTable !== MONTH_TABLE && (
          <span className="mx-1">{monthList[month]}</span>
        )}
        <span className="mx-1">{year}</span>
      </div>
    );
  }, [month, monthList, year, currentTable, handleSwitchTable]);

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
    setIsLeapYear(checkIsLeapYear(date.getFullYear()));
  }, [date, day, month, year]);

  return (
    <CalendarContainerComponent>
      <CalendarHeaderComponent>
        <ButtonComponent
          onClick={() => handleSetDate(new Date(year, month - 1, day))}
        >
          Prev
        </ButtonComponent>
        {renderYearWithMonth()}
        <ButtonComponent
          onClick={() => handleSetDate(new Date(year, month + 1, day))}
        >
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
          <>dddd</>
        )}
      </CalendarBodyComponent>
    </CalendarContainerComponent>
  );
};

export default CalendarComponent;