import { useMemo } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const Type = {
  DEFAULT: "default",
  DISABLE: "disable",
  SELECTED: "selected",
};

const { DEFAULT, DISABLE, SELECTED } = Type;

const defaultProps = {
  children: null,
  isToday: false,
  type: DEFAULT,
  className: "",
  onClick: () => {},
};

const propTypes = {
  children: PropTypes.node,
  isToday: PropTypes.bool,
  type: PropTypes.oneOf(Object.values(Type)),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

const CalendarDayComponent = ({
  children,
  isToday,
  type,
  className,
  onClick,
}) => {
  const typeMap = useMemo(
    () => ({
      [DEFAULT]: "text-black bg-white",
      [DISABLE]: "text-gray-100 bg-white cursor-not-allowed",
      [SELECTED]: "text-white bg-red-600",
    }),
    []
  );

  return (
    <div
      className={cx(
        "w-14.2% h-53px p-2 rounded-full cursor-pointer flex justify-center items-center",
        typeMap[type],
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

CalendarDayComponent.defaultProps = defaultProps;
CalendarDayComponent.propTypes = propTypes;
CalendarDayComponent.Type = Type;
export default CalendarDayComponent;
