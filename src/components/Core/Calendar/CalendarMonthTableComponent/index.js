import { useCallback } from "react";
import PropTypes from "prop-types";

// Component
import CalendarUnitComponent from "../CalendarDayComponent";
// Enum
import { CalendarTableTypeEnum } from "../../../../enums/CalendarEnum";

const { DAYS_TABLE } = CalendarTableTypeEnum;

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
  const handleClick = useCallback(
    (index) => {
      handleSetDate(new Date(year, index, day));
      handleSwitchTable(DAYS_TABLE);
    },
    [day, handleSetDate, year, handleSwitchTable]
  );

  return (
    <>
      {monthList.map((_month, index) => {
        let type = CalendarUnitComponent.Type.DEFAULT;
        if (index === month) type = CalendarUnitComponent.Type.SELECTED;

        return (
          <CalendarUnitComponent
            className="w-1/4 h-93px"
            key={_month}
            type={type}
            onClick={() => {
              handleClick(index);
            }}
          >
            {_month}
          </CalendarUnitComponent>
        );
      })}
    </>
  );
};

CalendarMonthTableComponent.defaultProps = defaultProps;
CalendarMonthTableComponent.propTypes = propTypes;
export default CalendarMonthTableComponent;
