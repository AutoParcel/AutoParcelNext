import React, { ReactNode } from "react";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="m-10">{children}</div>;
};
export default Layout;
