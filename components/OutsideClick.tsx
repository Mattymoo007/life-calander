import { useEffect, useRef, FC } from "react";

const useOutsideAlerter = (ref: any, func: Function) => {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target)) func();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, func]);
};

const OutsideClick: FC<{ children: any; click: Function }> = ({
  children,
  click,
}) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, click);

  return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideClick;
