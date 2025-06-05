"use client";

import { cn } from "@/lib/utils";
import 'bootstrap-icons/font/bootstrap-icons.css';

interface HomeCardProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  icon: string;
  title: string;
  description: string;
  handleClick?: () => void;
}

const HomeCard = ({
  className,
  icon,
  title,
  description,
  ...rest
}: HomeCardProps) => {
  return (
    <section
      className={cn(
        "bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer",
        className
      )}
      {...rest}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <i className={cn("bi text-2xl text-[#212529]", icon)} />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </section>
  );
};

export default HomeCard;
