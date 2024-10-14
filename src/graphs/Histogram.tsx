import React from "react";
import { ResponsiveBar } from "@nivo/bar";

interface HistogramProps {
  data: { day: string; score: number }[];
}

const Histogram: React.FC<HistogramProps> = ({ data }) => {
  return (
    <div style={{ height: "400px", minWidth: "100%" }}>
      <ResponsiveBar
        data={data}
        keys={["score"]}
        indexBy="day"
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        padding={0.3}
        colors={{ scheme: "nivo" }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Day",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Score",
          legendPosition: "middle",
          legendOffset: -40,
        }}
      />
    </div>
  );
};

export default Histogram;
