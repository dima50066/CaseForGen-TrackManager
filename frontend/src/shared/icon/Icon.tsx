import React from "react";
const sprite = "/sprite.svg";

interface IconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  id: string;
}

const Icon: React.FC<IconProps> = ({
  className = "",
  width = 24,
  height = 24,
  id,
}) => {
  return (
    <svg className={className} width={width} height={height}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );
};

export default Icon;
