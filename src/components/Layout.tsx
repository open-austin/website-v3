import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [dark, setDark] = useLocalStorage("dark", false);

  return (
    <div className={dark ? "dark bg-gray-900" : ""}>
      <Header dark={dark} setDark={setDark} />
      <div className={className}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
