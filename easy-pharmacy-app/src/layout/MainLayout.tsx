import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
  onSearch?: (value: string) => void;
}

export default function MainLayout({ children}: MainLayoutProps) {
  return (
    <>
      {/* <Header onSearch={onSearch} /> */}
      {children}
    </>
  );
}