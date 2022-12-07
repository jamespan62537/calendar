import { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const Size = {
  SMALL: "small",
};

const { SMALL } = Size;

const defaultProps = {
  children: null,
  size: SMALL,
  onClick: () => {},
  className: "",
};

const propTypes = {
  children: PropTypes.node,
  size: PropTypes.oneOf(Object.values(Size)),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

const ButtonComponent = ({ children, size, onClick, className }) => {
  const ContainerMap = useMemo(
    () => ({
      [SMALL]: "py-2 px-3 text-xs",
    }),
    []
  );

  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <button
      className={cx(
        className,
        ContainerMap[size],
        "border-1 border-solid rounded-lg inline-flex items-center justify-center space-x-2.5 leading-6"
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

ButtonComponent.defaultProps = defaultProps;
ButtonComponent.propTypes = propTypes;
export default ButtonComponent;
