"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ContextProps {
   sidebar: boolean;
   toggleSidebar: (bool?: boolean) => void;
}

const DashboardContext = createContext<ContextProps>({
   sidebar: true,
   toggleSidebar: (bool?: boolean) => {},
});

export const DashobardContextProvider = ({
   children,
}: {
   children: React.ReactNode;
}) => {
   const [sidebar, setSidebar] = useState(true);
   useEffect(() => {
      const width = window.innerWidth;
      if (width < 1024) {
         setSidebar(false);
      }
   }, []);
   const toggleSidebar = (bool?: boolean) => {
		if(bool != undefined) {
			setSidebar(bool)
		} else {
			setSidebar(!sidebar);
		}
   };
   return (
      <DashboardContext.Provider value={{ sidebar, toggleSidebar }}>
         {children}
      </DashboardContext.Provider>
   );
};

export const useDashboardContext = () => useContext(DashboardContext);