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
import { Container, Form, Input, InputGroup, InputGroupText, Col, Row } from 'reactstrap';
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
      text: 'Transaksi 2023',
      font: {
        weight: 'bold',
        size: 30
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

  const months = [
    {
      id: 1,
      value: 'Januari'
    },
    {
      id: 2,
      value: 'Februari'
    },
    {
      id: 3,
      value: 'Maret'
    },
    {
      id: 4,
      value: 'April'
    },
    {
      id: 5,
      value: 'Mei'
    },
    {
      id: 6,
      value: 'Juni'
    },
    {
      id: 7,
      value: 'Juli'
    },
    {
      id: 8,
      value: 'Agustus'
    },
    {
      id: 9,
      value: 'September'
    },
    {
      id: 10,
      value: 'Oktober'
    },
    {
      id: 11,
      value: 'November'
    },
    {
      id: 12,
      value: 'Desember'
    }
  ]

  const weeks = [
    {
      id: 1,
      value: 1
    },
    {
      id: 2,
      value: 2
    },
    {
      id: 3,
      value: 3
    },
    {
      id: 4,
      value: 4
    }
  ]

  return (
    <Container className="mt--7 card" fluid>
      <div className="container-fluid">
        <div className="row mb-2 mt-3">
          <div className="col-sm-6">
            <Row>
              <Col lg="3">
                <div className="form-group">
                  <label className="form-control-label">Bulan</label>
                  <select className="form-control" id="exampleFormControlSelect1" onChange={(e) => setMonth(e.target.value)}>
                    <option value={0}>-- Pilih bulan --</option>
                    {months?.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>{item.value}</option>
                      )
                    })}
                  </select>
                </div>
              </Col>
              <Col lg="3">
                <div className="form-group">
                  <label className="form-control-label">Minggu Ke</label>
                  <select className="form-control" id="exampleFormControlSelect1" onChange={(e) => setWeek(e.target.value)}>
                    <option value={0}>-- Pilih Minggu Ke --</option>
                    {weeks?.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>{item.value}</option>
                      )
                    })}
                  </select>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <Line options={options} data={data} />
    </Container>
  );
};

export default Week;
