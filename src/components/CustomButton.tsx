"use client";

import { CustomButtonProps } from "../../types";

export default function CustomButton({
  title,
  containerStyles,
  handleClick,
  btnType,
  icon,
  iconPosition = "before",
  textStyles,
}: CustomButtonProps) {
  return (
    <button
      disabled={false}
      type={btnType}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`flex ${textStyles}`}>
        {iconPosition === "before" && icon}
        {title}
        {iconPosition === "after" && icon}
      </span>
    </button>
  );
}
