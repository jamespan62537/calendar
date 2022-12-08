import PropTypes from "prop-types";

const defaultProps = {
  children: null,
};

const propTypes = {
  children: PropTypes.node,
};

const CalendarBodyComponent = ({ children }) => {
  return <div className="flex flex-wrap">{children}</div>;
};

CalendarBodyComponent.defaultProps = defaultProps;
CalendarBodyComponent.propTypes = propTypes;
export default CalendarBodyComponent;
