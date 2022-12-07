import PropTypes from "prop-types";

const defaultProps = {
  children: null,
};

const propTypes = {
  children: PropTypes.node,
};

const CalendarHeaderComponent = ({ children }) => {
  return <div className="w-full flex justify-between items-center p-2">{children}</div>;
};

CalendarHeaderComponent.defaultProps = defaultProps;
CalendarHeaderComponent.propTypes = propTypes;
export default CalendarHeaderComponent;
