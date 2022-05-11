import React from "react";

const Button = ({
  className = "",
  text = "button",
  size = "base",
  link,
  icon = null,
  iconPosition = "left",
  full = false,
  ...newProps
}) => {
  let finalClass = `${className} relative inline-block font-medium cursor-pointer text-center transition-colors duration-200`;
  if (size === "xs") finalClass += " text-xs";
  else if (size === "sm") finalClass += " text-sm";
  else if (size === "base") finalClass += " text-base";
  else if (size === "lg") finalClass += " text-lg";
  else if (size === "xl") finalClass += " text-xl";

  if (full) finalClass += " w-full";
  let content = text;
  if (icon) {
    if (iconPosition === "left")
      content = (
        <>
          {React.cloneElement(icon, {
            className: "mr-2 absolute top-1/2 -translate-y-1/2 left-[20px]",
          })}
          <span className="pl-[50px] pr-[20px]">{text}</span>
        </>
      );
    else if (iconPosition === "right")
      content = (
        <>
          {text}
          {React.cloneElement(icon, { className: "ml-2" })}
        </>
      );
  }
  let ButtonTag = link ? "a" : "div";
  return (
    <ButtonTag href={link} className={finalClass} {...newProps}>
      {content}
    </ButtonTag>
  );
};

export default Button;
