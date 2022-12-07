import PropTypes from "prop-types";

const defaultProps = {
  children: null,
};

const propTypes = {
  children: PropTypes.node,
};

const CalendarContainerComponent = ({ children }) => {
  return <div className="w-400px border shadow-lg p-3">{children}</div>;
};

CalendarContainerComponent.defaultProps = defaultProps;
CalendarContainerComponent.propTypes = propTypes;
export default CalendarContainerComponent;
