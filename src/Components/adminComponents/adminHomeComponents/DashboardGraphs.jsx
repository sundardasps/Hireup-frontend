import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Typography } from "@material-tailwind/react";
import { getDashboard } from "../../../Api/adminApi";
import { useQuery } from "@tanstack/react-query";
import MainLoading from "../../../Components/commonComponents/Loadings/MainLoding";
export default function DashboardGraphs() {
  const { data, isLoading } = useQuery({
    queryKey: ["admindashboard"],
    queryFn: async () => {
      const response = await getDashboard();
      return response;
    },
  });

  useEffect(() => {
    if (data) {
      setChartData({
        series: [
          data.data.activecompaniesCount,
          data.data.activeJobs,
          data.data.applications,
          data.data.activeUsers,
        ],
        options: {},
      });

      setamountData({
        series: [data.data.basic, data.data.standard, data.data.premium],
        options: {},
      });
    }
  }, [data]);

  const [chartData, setChartData] = useState({
    series: [
      data?.data?.activecompaniesCount,
      data?.data?.activeJobs,
      data?.data?.applications,
      data?.data?.activeUsers,
    ],
    options: {
      chart: {
        width: 380,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      legend: {
        formatter: function (val, opts) {
          const categories = [
            "active companies",
            "Total users",
            "active jobs",
            "activeUsers",
          ];
          return (
            categories[opts.seriesIndex] +
            " - " +
            opts.w.globals.series[opts.seriesIndex]
          );
        },
      }, // Correct placement of the closing curly brace
      title: {
        text: "Total view",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  const [amountData, setamountData] = useState({
    series: [data?.data?.basic, data?.data?.standard, data?.data?.premium],
    options: {
      chart: {
        width: 380,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      legend: {
        formatter: function (val, opts) {
          const categories = ["basic", "standard", "premium"];
          return (
            categories[opts.seriesIndex] +
            " - " +
            opts.w.globals.series[opts.seriesIndex]
          );
        },
      }, 
      title: {
        text: "Total amount",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  if (isLoading) {
    return <MainLoading />;
  }

  return (
    <div className="">
      <div className="flex justify-between  mb-14 ">
        <div className="border  p-1 w-[12rem] text-white  h-[6rem] shadow-md shadow-blue-gray-200  bg-light-blue-300">
          <div className="flex flex-col items-center ">
            <Typography variant="h5">Active companies</Typography>
            <Typography variant="h2">{data&&data.data&&data.data.activeUsers}</Typography>
          </div>
        </div>
        <div className="border  p-1 w-[12rem] text-white  h-[6rem] shadow-md shadow-blue-gray-200  bg-green-500">
          <div className="flex flex-col items-center ">
            <Typography variant="h5">Total Users</Typography>
            <Typography variant="h2">{data&&data.data&&data.data.activeJobs}</Typography>
          </div>
        </div>
        <div className="border  p-1 w-[12rem] text-white  h-[6rem] shadow-md shadow-blue-gray-200  bg-amber-800">
          <div className="flex flex-col items-center ">
            <Typography variant="h5">Active jobs</Typography>
            <Typography variant="h2">{data&&data.data&&data.data.applications}</Typography>
          </div>
        </div>
        <div className="border  p-1 w-[12rem] text-white  h-[6rem] shadow-md shadow-blue-gray-200  bg-yellow-600">
          <div className="flex flex-col items-center ">
            <Typography variant="h5">Total amount</Typography>
            <Typography variant="h2">{data&&data.data&&data.data.grandTotal}</Typography>
          </div>
        </div>
      </div>

      <div className="flex ">
        <div className=" row">
          <div className="mixed-chart">
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="donut"
              width="400"
            />
          </div>
        </div>

        <div className=" row">
          <div className="mixed-chart">
            <Chart
              options={amountData.options}
              series={amountData.series}
              type="donut"
              width="390"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
