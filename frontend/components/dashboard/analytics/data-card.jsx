import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "lib/format";
import React from "react";
import { FiDollarSign } from "react-icons/fi";

export const DataCard = ({ value, label, shouldFormat }) => {
  return (
    <Card className="border-l-4 border-blue-500 transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-100">
      <CardHeader className="flex items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <FiDollarSign className="text-blue-500" size={18} />
          <CardTitle className="text-lg font-semibold">{label}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-800">
          {shouldFormat ? formatPrice(value) : value}
        </div>
        <p className="mt-2 text-sm text-gray-600">
          {label} details and information.
        </p>
      </CardContent>
    </Card>
  );
};
