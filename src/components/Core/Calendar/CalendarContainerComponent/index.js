import PropTypes from "prop-types";

const defaultProps = {
  children: null,
  isCalendarVisible: false,
};

const propTypes = {
  children: PropTypes.node,
  isCalendarVisible: PropTypes.bool,
};

const CalendarContainerComponent = ({ children, isCalendarVisible }) => {
  return (
    <>
      {isCalendarVisible && (
        <div className="absolute top-12 left-0 w-400px border shadow-lg p-3">{children}</div>
      )}
    </>
  );
};

CalendarContainerComponent.defaultProps = defaultProps;
CalendarContainerComponent.propTypes = propTypes;
export default CalendarContainerComponent;
