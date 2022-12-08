import { useCallback } from "react";
import PropTypes, { object } from "prop-types";

const defaultProps = {
  children: null,
  calendarRef: null,
  date: null,
  handleSetCalendarVisible: () => {},
};

const propTypes = {
  children: PropTypes.node,
  calendarRef: PropTypes.object,
  date: PropTypes.object,
  handleSetCalendarVisible: PropTypes.func,
};

const CalendarInputComponent = ({
  children,
  calendarRef,
  date,
  handleSetCalendarVisible,
}) => {
  const renderDate = useCallback(() => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const _date = date.getDate();

    const dateIsoString = `${year}-${month}-${_date}`;
    return dateIsoString || "請選擇日期";
  }, [date]);

  return (
    <button
      ref={calendarRef}
      onClick={() => handleSetCalendarVisible(true)}
      className="relative inline-block py-2.5 px-5 border-1 border-solid border-gray-400 rounded-md mr-5"
    >
      <div className="text-left text-base">{renderDate()}</div>
      {children}
    </button>
  );
};

CalendarInputComponent.defaultProps = defaultProps;
CalendarInputComponent.propTypes = propTypes;
export default CalendarInputComponent;
