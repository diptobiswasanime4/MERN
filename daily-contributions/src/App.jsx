import { useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";

function App() {
  return (
    <div className="">
      <Contributions />
    </div>
  );
}

function Contributions() {
  // const data = [
  //   { date: "2023-09-01", count: 2 },
  //   { date: "2023-09-02", count: 3 },
  //   { date: "2023-09-03", count: 0 },
  // ];
  return (
    <div>
      <CalendarHeatmap
        startDate={new Date("2016-01-01")}
        endDate={new Date("2016-04-01")}
        values={[
          { date: "2016-01-01", count: 12 },
          { date: "2016-01-22", count: 122 },
          { date: "2016-01-30", count: 38 },
        ]}
      />
    </div>
  );
}

export default App;
