import Chart from "react-apexcharts";

interface Props {
  data: { time: string; count: number }[];
}

export default function ClicksTimeChart({ data }: Props) {
  const series = [
    {
      name: "Clicks",
      data: data.map(d => d.count),
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
    },
    xaxis: {
      categories: data.map(d => d.time),
      labels: { rotate: -45 },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.1,
      },
    },
    dataLabels: { enabled: false },
    title: {
      text: "Clicks Over Time",
      align: "center",
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <Chart options={options} series={series} type="area" height={300} />
    </div>
  );
}
