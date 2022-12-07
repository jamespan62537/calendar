import { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const DAYS_TABLE = "daysTable";

const Type = {
  DEFAULT: "default",
  SELECTED: "selected",
};

const { DEFAULT, SELECTED } = Type;

const defaultProps = {
  year: 1970,
  month: 0,
  day: 1,
  monthList: [],
  handleSetDate: () => {},
  handleSwitchTable: () => {},
};

const propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  day: PropTypes.number,
  monthList: PropTypes.array,
  handleSetDate: PropTypes.func,
  handleSwitchTable: PropTypes.func,
};

const CalendarMonthTableComponent = ({
  year,
  month,
  day,
  monthList,
  handleSetDate,
  handleSwitchTable,
}) => {
  const typeMap = useMemo(
    () => ({
      [DEFAULT]: "text-black bg-white",
      [SELECTED]: "text-white bg-red-600",
    }),
    []
  );

  const handleClick = useCallback(
    (index) => {
      handleSetDate(new Date(year, index, day));
      handleSwitchTable(DAYS_TABLE);
    },
    [day, handleSetDate, year, handleSwitchTable]
  );

  return (
    <>
      {monthList.map((_month, index) => (
        <div
          className={cx(
            "w-1/4 h-93px p-2 rounded-full cursor-pointer flex justify-center items-center",
            {
              [typeMap[DEFAULT]]: index !== month,
              [typeMap[SELECTED]]: index === month,
            }
          )}
          onClick={() => {
            handleClick(index);
          }}
        >
          {_month}
        </div>
      ))}
    </>
  );
};

CalendarMonthTableComponent.defaultProps = defaultProps;
CalendarMonthTableComponent.propTypes = propTypes;
export default CalendarMonthTableComponent;
