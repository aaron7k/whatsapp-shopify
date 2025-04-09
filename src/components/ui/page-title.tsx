import React from "react";

interface PageTitleProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const PageTitle = ({ title, subtitle, children }: PageTitleProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-4 border-b">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
      {children && <div className="mt-4 sm:mt-0">{children}</div>}
    </div>
  );
};

export default PageTitle;
