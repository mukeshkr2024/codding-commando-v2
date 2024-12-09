/* eslint-disable new-cap */
/* eslint-disable camelcase */
import React from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import { formatCreatedAtDate } from "lib/format";

const handleDownload = (rowData) => {
  const doc = new jsPDF();
  doc.setFontSize(12);
  doc.text("Invoice", 20, 20);

  const { courseId, payment_id, order_id, paymentType, amount, purchasedAt } =
    rowData;
  const topPosition = 40;

  doc.text(`Course Title: ${courseId?.title}`, 20, topPosition);
  doc.text(`Description: ${courseId?.description}`, 20, topPosition + 10);
  doc.text(`Payment ID: ${payment_id}`, 20, topPosition + 20);
  doc.text(`Order ID: ${order_id}`, 20, topPosition + 30);
  doc.text(`Payment Type: ${paymentType}`, 20, topPosition + 40);
  doc.text(`Amount: ${amount}`, 20, topPosition + 50);
  doc.text(
    `Purchased At: ${new Date(purchasedAt).toLocaleString()}`,
    20,
    topPosition + 60,
  );

  doc.save("invoice.pdf");
};

export const Invoicecolumns = [
  {
    accessorKey: "courseId.title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Course <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "purchasedAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Purchased At <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div>{formatCreatedAtDate(row.getValue("purchasedAt"))}</div>
    ),
  },
  {
    accessorKey: "paymentType",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <FaDownload onClick={() => handleDownload(row.original)} />
    ),
  },
];
