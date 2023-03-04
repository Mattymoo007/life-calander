import { FC, useRef, useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import OutsideClick from "./OutsideClick";
import { motion } from "framer-motion";
import { dropdownMenuAnimate } from "~/utils/animations";

type DropdownOption = {
  label: string;
  value: string;
  href?: string;
};

const Dropdown: FC<{
  label?: string;
  children?: any;
  options?: DropdownOption[];
  alignment?: "center" | "right" | "left";
  menuClasses?: string;
  size?: "sm" | "md" | "lg" | "xl";
  onChange?: Function;
}> = ({
  children,
  label = "Select",
  options = [{ label: "option 1", value: "option 1" }],
  alignment = "left",
  menuClasses = "w-[200px]",
  size = "md",
  onChange = () => {},
}) => {
  const [open, setOpen] = useState(false);
  const nodeRef = useRef(null);

  const toggle = () => setOpen(!open);
  const onOutsideClick = () => setOpen(false);
  const handleClick = (option: DropdownOption) => {
    onChange(option);
  };

  const positionClasses = {
    center: "origin-top",
    right: "origin-top-right",
    left: "origin-top-left",
  };

  const wrapperAlignment =
    alignment === "left"
      ? "items-start"
      : alignment === "center"
      ? "items-center"
      : "items-end";

  const buttonSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <OutsideClick click={onOutsideClick}>
      <div
        className={`relative inline-flex flex-col inter ${wrapperAlignment}`}
        onClick={toggle}
      >
        {/* Input */}
        <button
          type="button"
          className={`btn bg-transparent ${open && "active"} ${
            buttonSizes[size]
          }`}
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {label}
          <IoChevronDownSharp
            className={`ml-[7px] transition-colors duration-100 ${
              open && "text-primary"
            }`}
          />
        </button>

        {/* Dropdown menu */}
        <motion.div
          animate={open ? "enter" : "exit"}
          variants={dropdownMenuAnimate}
          initial={false}
          className={`absolute top-[100%] z-10 mt-[6px] text-gray-700 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm overflow-hidden ${positionClasses[alignment]} ${menuClasses}`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          ref={nodeRef}
        >
          <div role="none">
            {options?.length
              ? options.map((option) => (
                  <a
                    key={option.value}
                    href={option.href || "#"}
                    className="first:pt-[10px] last:pb-[10px] block px-4 py-2 hover:bg-gray-50 transition-colors"
                    role="menuitem"
                    id="menu-item-0"
                    onClick={() => handleClick(option)}
                  >
                    {option.label}
                  </a>
                ))
              : children}
          </div>
        </motion.div>
      </div>
    </OutsideClick>
  );
};

export default Dropdown;
