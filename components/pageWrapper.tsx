import React from "react";
import { View, ViewProps } from "react-native";

interface PageWrapperProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
}

const PageWrapper = ({ className = "", children, style, ...rest }: PageWrapperProps) => {
  return (
    <View
      className={`flex-1 bg-blue-500 ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </View>
  );
};

export default PageWrapper;
