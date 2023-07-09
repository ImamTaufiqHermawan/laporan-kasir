import { SmallBox } from '@app/components';
import React from 'react';
import { ContentHeader, Finance, Stock } from '@components';


const Dashboard = () => {
  return (
    <>
      <ContentHeader title="Dashboard" />
      <Finance />
      <Stock />
    </>
  );
};

export default Dashboard;
