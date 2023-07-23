// @ts-nocheck
// Extend the lodash type definitions with the custom method
declare module 'lodash' {
  interface LoDashStatic {
    addDays(date: Date, days: number): Date;
  }
}

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
import { Container, Form, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import _, { groupBy } from 'lodash';
// import { startOfWeek, addWeeks, getMonth } from 'date-fns';
import sumBy from 'lodash/sumBy';

import ActivityTab from '../../pages/profile/ActivityTab';
import TimelineTab from '../../pages/profile/TimelineTab';
import SettingsTab from '../../pages/profile/SettingsTab';
import { TransactionService } from '@app/services/transactionService';
import { formatDate } from '@app/utils/date';
import { format } from 'date-fns';

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
      text: 'Mingguan NIH',
      font: {
        weight: 'bold',
        size: 22
      }
    },
  },
};

const Week = () => {
  const [transactions, setTransactions] = useState([])
  const [month, setMonth] = useState()
  const [week, setWeek] = useState()

  useEffect(() => {
    TransactionService.getTransactions({ name: "", date: "", page: 1, limit: 100 }).then((res) => {
      setTransactions(res?.data?.data);
    });
  }, [])

  console.log(transactions)

  // Function to filter data per month
  function filterDataByMonth(data, targetMonth) {
    return data.filter(item => new Date(item.transactionDate).getMonth() === targetMonth - 1);
  }

  // Function to filter data per week using lodash
  function filterDataByWeek(data: any[], targetWeek: number) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return _.filter(data, item => {
      const targetDate = new Date(item.transactionDate);
      const firstDayOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);

      // Find the first day of the target week
      const targetWeekStart = _.addDays(firstDayOfMonth, (targetWeek - 1) * 7);
      const targetWeekEnd = _.addDays(targetWeekStart, 6);

      // Find the last day of the month
      const lastDayOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);

      // Check if the targetDate falls within the week boundaries
      const isWithinWeek = (
        targetDate.getTime() >= targetWeekStart.getTime() &&
        targetDate.getTime() <= targetWeekEnd.getTime() &&
        targetWeekEnd.getTime() <= lastDayOfMonth.getTime()
      );

      if (isWithinWeek) {
        item.dayOfWeek = daysOfWeek[targetDate.getDay()];
        return true;
      }
      return false;
    });
  }

  // Custom method to add days to a date
  _.addDays = function (date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  // Example usage:
  const filteredByMonthData = filterDataByMonth(transactions, month); // Filter data for July (month 7)
  const filteredByWeekData = filterDataByWeek(filteredByMonthData, week); // Filter data for the 4th week of July

  console.log("Filtered Data by Month:", filteredByMonthData);
  console.log("Filtered Data by Week:", filteredByWeekData);

  const groups = _.groupBy(filteredByWeekData, 'dayOfWeek');

  const days = Object.entries(groups).map((entry) => {
    const [key, values] = entry;

    return {
      name: key,
      total: sumBy(values, 'totalPrice'),
    };
  });

  const data = {
    labels: days.map((day) => day.name),
    datasets: [
      {
        label: 'Transaksi',
        data: days.map((day) => day.total),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <Container className="mt--7 card" fluid>
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <Form className="navbar-search navbar-search-dark form-inline d-none d-md-flex justify-content-end">
              <InputGroup className="input-group-alternative">
                <Input
                  placeholder="Bulan ke"
                  type="text"
                  className='mr-3'
                  onChange={(e) => setMonth(e.target.value)}
                />
                <Input
                  placeholder="Minggu ke"
                  type="text"
                  onChange={(e) => setWeek(e.target.value)}
                />
              </InputGroup>
            </Form>
          </div>
        </div>
      </div>
      <Line options={options} data={data} />
    </Container>
  );
};

export default Week;
