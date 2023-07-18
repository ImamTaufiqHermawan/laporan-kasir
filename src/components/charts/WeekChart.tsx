// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import _ from 'lodash';

const WeekChart = ({ data }) => {
    console.log(data)
    const chartRef = useRef(null);

    useEffect(() => {
        if (data && data.length > 0) {
            // Filter data by week using lodash
            const filteredData = _.filter(data, (item) => {
                // console.log(item)
                const itemDate = new Date(item.transactionDate);
                console.log(itemDate)
                const currentDate = new Date();
                console.log(currentDate)
                const daysSinceItemDate = Math.ceil(
                    (currentDate - itemDate) / (1000 * 60 * 60 * 24)
                );
                console.log(daysSinceItemDate)
                return daysSinceItemDate <= 7;
            });

            console.log(filteredData)

            // Prepare data for the chart
            const labels = filteredData.map((item) => item.transactionDate);
            const values = filteredData.map((item) => item.totalPrice);

            // Chart.js configuration
            const config = {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Value',
                            data: values,
                            borderColor: 'blue',
                            fill: false,
                        },
                    ],
                },
                options: {
                    // Chart options
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
                },
            };

            // Create the chart
            const chartInstance = new Chart(chartRef.current.getContext('2d'), config);

            // Clean up chart instance on component unmount
            return () => {
                chartInstance.destroy();
            };
        }
    }, [data]);

    return <canvas ref={chartRef} />;
};

export default WeekChart;
