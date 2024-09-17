import React from "react";
type Props = {
  title: string;
  description: string;
  end?: React.ReactNode;
};
const HeaderPage: React.FC<Props> = ({ title, description, end }) => {
  return (
    <div className="border-b border-lightGrey pb-5">
      <div className="sm:flex sm:items-baseline sm:justify-between">
        <div className="sm:w-0 sm:flex-1">
          <h1
            id="message-heading"
            className="text-base font-semibold leading-6 text-foreground"
          >
            {title}
          </h1>
          <p className="mt-1 truncate text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between sm:ml-6 sm:mt-0 sm:flex-shrink-0 sm:justify-start">
          {end}
        </div>
      </div>
    </div>
  );
};

export default HeaderPage;
