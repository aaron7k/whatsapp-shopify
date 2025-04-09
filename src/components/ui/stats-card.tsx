import React from "react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  className,
}: StatsCardProps) => {
  return (
    <div className={cn("bg-white rounded-lg shadow p-5 flex flex-col", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="p-2 bg-green-100 rounded-full">
          <Icon className="w-5 h-5 text-whatsapp" />
        </div>
      </div>
      <div className="mt-2">
        <div className="text-2xl font-semibold">{value}</div>
        {trend && (
          <div className="flex items-center mt-1">
            <span
              className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {trend.isPositive ? "+" : "-"}
              {trend.value}%
            </span>
            <span className="text-xs text-gray-400 ml-1">from last period</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
