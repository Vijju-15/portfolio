import React from 'react';
import { useResponsive } from '@/utils/responsive';

const ResponsiveWrapper = ({ 
  children, 
  className = '', 
  as: Component = 'div',
  mobileClassName = '',
  tabletClassName = '',
  desktopClassName = '',
  ...props 
}) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  
  const getResponsiveClassName = () => {
    let responsiveClass = className;
    
    if (isMobile && mobileClassName) {
      responsiveClass += ` ${mobileClassName}`;
    }
    
    if (isTablet && tabletClassName) {
      responsiveClass += ` ${tabletClassName}`;
    }
    
    if (isDesktop && desktopClassName) {
      responsiveClass += ` ${desktopClassName}`;
    }
    
    return responsiveClass;
  };

  return (
    <Component className={getResponsiveClassName()} {...props}>
      {children}
    </Component>
  );
};

export default ResponsiveWrapper;
