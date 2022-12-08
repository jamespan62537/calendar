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

const CalendarUnitComponent = ({
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
        "p-2 rounded-full cursor-pointer flex justify-center items-center",
        { "text-red-600": isToday },
        typeMap[type],
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

CalendarUnitComponent.defaultProps = defaultProps;
CalendarUnitComponent.propTypes = propTypes;
CalendarUnitComponent.Type = Type;
export default CalendarUnitComponent;
