import { SmallBox } from '@app/components';
import React from 'react';
import { ContentHeader, Finance, Stock } from '@components';
import Week from '@app/components/charts/Week';


const Dashboard = () => {
  return (
    <>
      <ContentHeader title="Dashboard" />
      <Week />
      <Finance />
      <Stock />
    </>
  );
};

export default Dashboard;
