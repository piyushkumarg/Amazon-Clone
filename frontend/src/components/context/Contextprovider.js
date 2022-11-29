import React, { createContext, useState } from "react";
import Cart from "../cart/Cart";

export const Logincontext = createContext(null);

const Contextprovider = ({ children }) => {
  const [account, setAccount] = useState(null);

  return (
    <>
      <Logincontext.Provider value={{ account, setAccount }}>
        {children}
      </Logincontext.Provider>
    </>
  );
};

export default Contextprovider;
