"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import DetailStaff from "./detailProduct";
import { Checkbox } from "@/components/TableUI/checkbox";
import { UUID } from "crypto";
export type product = {
  id: string;
  name: string;
  original_price: number;
  description: string; 
  category: string;
  image: string;
};
type MyColumnDef<T> = ColumnDef<T> & {
  reloadData?: () => void;
};
export async function columns(
  reloadData: () => void,
): Promise<MyColumnDef<product>[]> {
  return [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() ? "indeterminate" : false)
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "id",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Product ID
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Product name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "original_price",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Price
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "category",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Category
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "Chi tiết/Sửa đổi",
        header: () => {
          return "Detail";
        },
        cell: function Cell ({ row }) {
          const [modalIsOpen, setModalIsOpen] = useState(false);

          const openModal = () => {
            setModalIsOpen(true);
          };

          const closeModal = () => {
            setModalIsOpen(false);
          };

          return (
            <div className="relative flex  mr-2">
              <Button
                onClick={openModal}
                className="bg-transparent hover:bg-white font-bold hover:text-black py-1 px-[0.65rem] border border-gray-600 hover:border-transparent rounded-full"
              >
                +
              </Button>
              {modalIsOpen && (
                <DetailStaff onClose={closeModal} dataInitial={row.original} reload={reloadData} />
              )}
            </div>
          );
        },
      }
    ]
}