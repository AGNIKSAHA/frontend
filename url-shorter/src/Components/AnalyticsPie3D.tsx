import Chart from "react-apexcharts";

interface Props {
  title: string;
  labels: string[];
  values: number[];
}

export default function AnalyticsPie3D({ title, labels, values }: Props) {

  if (!labels.length || !values.length) {
    return null;
  }
  
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-center font-medium mb-3">{title}</h3>

      <Chart
        type="donut"
        height={280}
        series={values}
        options={{
          labels,
          legend: {
            position: "bottom",
          },
          plotOptions: {
            pie: {
              donut: {
                size: "55%",
              },
            },
          },
          stroke: {
            width: 0,
          },
          dataLabels: {
            enabled: true,
          },
          tooltip: {
            y: {
              formatter: (val: number) => `${val} clicks`,
            },
          },
        }}
      />
    </div>
  );
}
