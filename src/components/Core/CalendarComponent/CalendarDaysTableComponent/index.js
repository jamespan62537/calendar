import { useCallback, useMemo } from "react";
import PropTypes from "prop-types";

// Component
import CalendarDayComponent from "../CalendarDayComponent";

const defaultProps = {
  year: 1970,
  month: 0,
  day: 1,
  isLeapYear: false,
  startDay: 0,
  handleSetDate: () => {},
};

const propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  day: PropTypes.number,
  isLeapYear: PropTypes.bool,
  startDay: PropTypes.number,
  handleSetDate: PropTypes.func,
};

const CalendarDaysTableComponent = ({
  year,
  month,
  day,
  isLeapYear,
  startDay,
  handleSetDate,
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

  const renderWeekDays = useCallback(() => {
    return daysOfTheWeek.map((day) => (
      <CalendarDayComponent key={day}>{day}</CalendarDayComponent>
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
          <CalendarDayComponent
            key={index}
            type={CalendarDayComponent.Type.DISABLE}
          >
            {lastMonthDays + _day}
          </CalendarDayComponent>
        );
      }
      // Show next month days
      if (_day > currentDayOfTheMonth[month]) {
        return (
          <CalendarDayComponent
            key={index}
            type={CalendarDayComponent.Type.DISABLE}
          >
            {_day - currentDayOfTheMonth[month]}
          </CalendarDayComponent>
        );
      }

      // Show current month day
      return (
        <CalendarDayComponent
          key={index}
          onClick={() => handleSetDate(new Date(year, month, _day))}
          type={
            _day === day
              ? CalendarDayComponent.Type.SELECTED
              : CalendarDayComponent.Type.DEFAULT
          }
        >
          {_day}
        </CalendarDayComponent>
      );
    });
  }, [startDay, currentDayOfTheMonth, month, day, handleSetDate, year]);

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
