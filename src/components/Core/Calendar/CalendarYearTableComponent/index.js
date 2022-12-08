import { useCallback } from "react";
import PropTypes from "prop-types";

// Component
import CalendarUnitComponent from "../CalendarDayComponent";
// Enum
import { CalendarTableTypeEnum } from "../../../../enums/CalendarEnum";

const { MONTH_TABLE } = CalendarTableTypeEnum;

const defaultProps = {
  year: 1970,
  month: 0,
  day: 1,
  yearPeriod: [],
  handleSetDate: () => {},
  handleSwitchTable: () => {},
};

const propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  day: PropTypes.number,
  yearPeriod: PropTypes.array,
  handleSetDate: PropTypes.func,
  handleSwitchTable: PropTypes.func,
};

const CalendarYearTableComponent = ({
  year,
  month,
  day,
  yearPeriod,
  handleSetDate,
  handleSwitchTable,
}) => {

  const handleClick = useCallback(
    (index) => {
      handleSetDate(new Date(yearPeriod[index], month, day));
      handleSwitchTable(MONTH_TABLE);
    },
    [month, yearPeriod, day, handleSetDate, handleSwitchTable]
  );

  return (
    <>
      {yearPeriod.map((_year, index) => {
        let type = "";
        if (index === 0 || index === yearPeriod.length - 1)
          type = CalendarUnitComponent.Type.DISABLE;
        else if (yearPeriod[index] === year) type = CalendarUnitComponent.Type.SELECTED;
        else type = CalendarUnitComponent.Type.DEFAULT;

        return (
          <CalendarUnitComponent
            className="w-1/4 h-65px"
            key={_year}
            type={type}
            onClick={() => {
              handleClick(index);
            }}
          >
            {_year}
          </CalendarUnitComponent>
        );
      })}
    </>
  );
};

CalendarYearTableComponent.defaultProps = defaultProps;
CalendarYearTableComponent.propTypes = propTypes;
export default CalendarYearTableComponent;
