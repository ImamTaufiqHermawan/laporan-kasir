// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentHeader } from '@components';
import { PfButton, PfImage } from '@profabric/react-components';
import styled from 'styled-components';
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
import { Container } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import _ from 'lodash';
// import { startOfWeek, addWeeks, getMonth } from 'date-fns';

import ActivityTab from '../../pages/profile/ActivityTab';
import TimelineTab from '../../pages/profile/TimelineTab';
import SettingsTab from '../../pages/profile/SettingsTab';
import { TransactionService } from '@app/services/transactionService';
import { formatDate } from '@app/utils/date';

const rupiah = (number: Number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(number);
}

const StyledUserImage = styled(PfImage)`
  --pf-border: 3px solid #adb5bd;
  --pf-padding: 3px;
`;

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
      text: 'Stok 2023',
      font: {
        weight: 'bold',
        size: 22
      }
    },
  },
};

const labels = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
const test = labels.map(() => faker.datatype.number({ min: 0, max: 100000 }))
console.log(test)

export const data = {
  labels,
  datasets: [
    {
      label: 'Transaksi',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

const Week = () => {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    TransactionService.getTransactions().then((res) => {
      setTransactions(res?.data?.data);
    });
  }, [])

  console.log(transactions)

  // Custom function to get the week number from a given date
  function getWeekNumber(dateStr) {
    const date = new Date(dateStr);
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((date - firstDayOfYear) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((dayOfYear + firstDayOfYear.getDay() + 1) / 7);
    return weekNumber;
  }

  // Group the data by week
  // const groupedByWeek = _.groupBy(transactions, (item) => getWeekNumber(item.transactionDate));

  // console.log(groupedByWeek);

  function getWeekInfo(dateStr, selectedMonth) {
    const date = new Date(dateStr);
    const startOfTheWeek = new Date(date);
    startOfTheWeek.setDate(date.getDate() - date.getDay());

    // Adjust week start date to the selected month
    while (startOfTheWeek.getMonth() !== selectedMonth - 1) {
      startOfTheWeek.setDate(startOfTheWeek.getDate() - 7);
    }

    const weekEndDate = new Date(startOfTheWeek);
    weekEndDate.setDate(startOfTheWeek.getDate() + 7);
    const month = startOfTheWeek.getMonth() + 1;
    return { weekStartDate: startOfTheWeek, weekEndDate, month };
  }

  const dataCoba = [
    { id: 1, date: '2023-07-15' },
    { id: 2, date: '2023-07-16' },
    { id: 3, date: '2023-07-21' },
    { id: 4, date: '2023-08-05' },
    { id: 5, date: '2023-08-06' },
    // Add more data here
  ];

  // Selected month (in this example, we use August as the selected month, represented by month number 7)
  const selectedMonth = 6;

  // Filter data to include only items from the selected month
  const filteredData = transactions.filter((item) => {
    const { month } = getWeekInfo(item.transactionDate, selectedMonth);
    return month === selectedMonth;
  });

  // Group the filtered data by week
  const groupedByWeek = _.groupBy(filteredData, (item) => {
    const { weekStartDate } = getWeekInfo(item.transactionDate, selectedMonth);
    return weekStartDate.toISOString();
  });

  console.log(groupedByWeek)

  const [activeTab, setActiveTab] = useState('ACTIVITY');
  const [t] = useTranslation();

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Container className="mt--7 card" fluid>
      <div>
        {Object.entries(groupedByWeek).map(([weekStartDateStr, items]) => {
          const weekStartDate = new Date(weekStartDateStr);
          return (
            <div key={weekStartDateStr}>
              <h3>
                Week starting on: {weekStartDate.toDateString()} (Month: {selectedMonth})
              </h3>
              <ul>
                {items.map((item) => (
                  <li key={item.id}>{formatDate(item.transactionDate)} = {rupiah(item.totalPrice)}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <Line options={options} data={data} />
    </Container>
  );
};

export default Week;
