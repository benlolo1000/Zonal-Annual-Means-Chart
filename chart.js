chartIt();

async function chartIt() {
  const data = await getMeans();
  const ctx = document.getElementById("chart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.xs,
      datasets: [
        {
          label:
            "Combined Land-Surface Air and Sea-Surfaced Water Temperature in C°",
          data: data.ys,
          fill: false,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                return value + "°";
              }
            }
          }
        ]
      }
    }
  });
}

getMeans();

async function getMeans() {
  const xs = [];
  const ys = [];

  const response = await fetch("ZoAnnMeans.csv");
  //await promise to be fulfilled, store in const "response"
  const data = await response.text();
  // turn "response" into text file, store in const "data"

  const table = data.split("\n").slice(1);
  // '\n' means line break, splitting the csv file into an array based on
  //the where a new lines begins in the file, [140] total lines
  //slice(1) removes the first line from our data set because it's irrelevant
  table.forEach(row => {
    const columns = row.split(",");
    //turns each row into an array, which is split by
    //comma placement
    const year = columns[0];
    xs.push(year); //pushing year data to the xlabels array
    const temp = columns[1];
    ys.push(parseFloat(temp) + 14); //parsefloat stops the 14 from being added to a string, instead adding it to the initial value
  });
  return { xs, ys };
}
