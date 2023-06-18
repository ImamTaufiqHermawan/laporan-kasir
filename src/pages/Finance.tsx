import React, { useState } from 'react';
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
import { Line, Chart } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

import ActivityTab from './profile/ActivityTab';
import TimelineTab from './profile/TimelineTab';
import SettingsTab from './profile/SettingsTab';

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
      text: 'Penjualan 2023',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const test = labels.map(() => faker.datatype.number({ min: -1000, max: 1000 }))
console.log(test)
export const data = {
  labels,
  datasets: [
    {
      label: 'Angka Penjualan',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

const Stock = () => {
  const [t] = useTranslation();

  return (
    <>
      <ContentHeader title="Penjualan" />
      <Line options={options} data={data} />
    </>
  );
};

export default Stock;
