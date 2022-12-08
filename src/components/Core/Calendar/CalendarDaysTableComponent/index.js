import { useCallback, useMemo } from "react";
import PropTypes from "prop-types";

// Component
import CalendarUnitComponent from "../CalendarDayComponent";

const defaultProps = {
  year: 1970,
  month: 0,
  day: 1,
  isLeapYear: false,
  startDay: 0,
  handleSetDate: () => {},
  handleSetCalendarVisible: () => {},
};

const propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  day: PropTypes.number,
  isLeapYear: PropTypes.bool,
  startDay: PropTypes.number,
  handleSetDate: PropTypes.func,
  handleSetCalendarVisible: PropTypes.func,
};

const CalendarDaysTableComponent = ({
  year,
  month,
  day,
  isLeapYear,
  startDay,
  handleSetDate,
  handleSetCalendarVisible,
}) => {
  const daysOfTheWeek = useMemo(
    () => ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    []
  );

  const leapDayOfTheMonth = useMemo(
    () => [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    []
  );

  const commonDayOfTheMonth = useMemo(
    () => [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    []
  );

  const currentDayOfTheMonth = useMemo(
    () => (isLeapYear ? leapDayOfTheMonth : commonDayOfTheMonth),
    [isLeapYear, commonDayOfTheMonth, leapDayOfTheMonth]
  );

  const handleClick = useCallback(
    (e, _day) => {
      e.stopPropagation();
      handleSetDate(new Date(year, month, _day));
      handleSetCalendarVisible(false);
    },
    [handleSetCalendarVisible, handleSetDate, month, year]
  );

  const renderWeekDays = useCallback(() => {
    return daysOfTheWeek.map((day) => (
      <CalendarUnitComponent className="w-14.2% h-53px" key={day}>
        {day}
      </CalendarUnitComponent>
    ));
  }, [daysOfTheWeek]);

  const renderDays = useCallback(() => {
    // Set array with six weeks
    const daysCount = Array(42).fill(null);
    return daysCount.map((_, index) => {
      const _day = index - startDay + 1;
      // Show last month days
      if (_day <= 0) {
        const lastMonthDays =
          currentDayOfTheMonth[month - 1] || currentDayOfTheMonth[11];

        return (
          <CalendarUnitComponent
            className="w-14.2% h-53px"
            key={index}
            type={CalendarUnitComponent.Type.DISABLE}
          >
            {lastMonthDays + _day}
          </CalendarUnitComponent>
        );
      }
      // Show next month days
      if (_day > currentDayOfTheMonth[month]) {
        return (
          <CalendarUnitComponent
            className="w-14.2% h-53px"
            key={index}
            type={CalendarUnitComponent.Type.DISABLE}
          >
            {_day - currentDayOfTheMonth[month]}
          </CalendarUnitComponent>
        );
      }

      let type = CalendarUnitComponent.Type.DEFAULT;
      if (_day === day) type = CalendarUnitComponent.Type.SELECTED;
      let isToday = false;
      if (
        _day === new Date().getDate() &&
        month === new Date().getMonth() &&
        _day !== day
      )
        isToday = true;

      // Show current month day
      return (
        <CalendarUnitComponent
          className="w-14.2% h-53px"
          key={index}
          isToday={isToday}
          type={type}
          onClick={(e) => handleClick(e, _day)}
        >
          {_day}
        </CalendarUnitComponent>
      );
    });
  }, [startDay, currentDayOfTheMonth, month, day, handleClick]);

  return (
    <>
      {renderWeekDays()}
      {renderDays()}
    </>
  );
};

CalendarDaysTableComponent.defaultProps = defaultProps;
CalendarDaysTableComponent.propTypes = propTypes;
export default CalendarDaysTableComponent;
