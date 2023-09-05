// @ts-nocheck
import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { formatDate } from './date';

interface ExportToExcelProps {
  apiData: Array<any>; // You can replace 'any' with the actual type of your API data
  fileName: string;
}

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(number);
}

const modifyColumns = (data: Array<any>) => {
  // Modify the columns as needed
  return data.map((item) => {
    // For example, let's assume we want to rename the 'name' column to 'full_name'
    const modifiedNestedData = { ...item.Product, new_property: 'New Value' };

    // For example, let's assume we want to rename the 'name' column to 'full_name'
    return {
      id: item.id,
      nama_produk: item.Product.name,
      harga: rupiah(item.Product.price),
      quantity: item.quantity,
      total_harga: rupiah(item.totalPrice),
      tanggal_transaksi: formatDate(item.transactionDate),
      tanggal_input: formatDate(item.createdAt),
      shift: item.shift,
      pegawai: item?.User?.name
    };
  });
};

export const ExportToExcel: React.FC<ExportToExcelProps> = ({ apiData, fileName }) => {
  const fileType: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension: string = '.xlsx';

  const exportToCSV = (apiData: Array<any>, fileName: string) => {
    const modifiedData = modifyColumns(apiData);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(modifiedData);
    const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };


  return (
    <button type="submit" className="btn btn-default btn-flat float-right justify-content" onClick={(e) => exportToCSV(apiData, fileName)}>
      <i className="fas fa-download mr-2" />
      Export Transactions
    </button>
  )
};
