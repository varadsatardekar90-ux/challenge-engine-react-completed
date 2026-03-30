import React from "react";

interface BadgeProps{
  children: React.ReactNode;
  variant?: 'tag'| 'category'|'priority'|'default';
  
}
function Badge({children, variant='default'}:BadgeProps){
  return(
    <span className={'badge badge-${variant}'}>

    {children}
    </span>
  );
}

export default Badge;