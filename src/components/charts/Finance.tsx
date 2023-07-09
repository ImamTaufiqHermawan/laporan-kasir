import React, { useEffect, useState } from 'react';
import { ContentHeader } from '@components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TransactionService } from '@app/services/transactionService';
import { format } from 'date-fns';
import groupBy from 'lodash/groupBy';
import sumBy from 'lodash/sumBy';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Transaksi 2023',
      font: {
        weight: 'bold',
        size: 22
      }
    },
  },
};

const Finance = () => {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    TransactionService.getTransactions().then((res) => {
      setTransactions(res?.data?.data);
    });
  }, [])

  const groups = groupBy(transactions, (entry) => {
    return format(new Date(entry.transactionDate), 'LLLL');
  });

  const months = Object.entries(groups).map((entry) => {
    const [key, values] = entry;

    return {
      name: key,
      total: sumBy(values, 'totalPrice'),
    };
  });

  console.log(months)

  const data = {
    labels: months.map((month) => month.name),
    datasets: [
      {
        label: 'Angka Penjualan',
        // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        data: months.map((month) => month.total),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <Line options={options} data={data} className="mb-5"/>
  );
};

export default Finance;
