let rand = () => {
  return Math.round(Math.random() * 1000 + 1000);
};

let rand2 = () => {
  return Math.round(Math.random() * 300 + 200);
};

let rand3 = () => {
  return Math.round(Math.random() * 1000);
};

renderHistoricalTrafficVolumeChart();
renderHistoricalTrafficTypesChart();

function renderHistoricalTrafficVolumeChart() {
  let HTVC = document.querySelector("#HTVC");
  let ConfigHTVC = new Chart(HTVC, {
    type: "bar",
    data: {
      labels: ["1 Month ago", "2 Months ago", "3 Months ago"],
      datasets: [
        {
          label: "Total",
          data: [rand(), rand(), rand()],
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgba(54, 162, 235, 1)"],
          borderWidth: 0.5,
          borderRadius: 3,
        },

        {
          label: "Medium Priority",
          data: [rand2(), rand2(), rand2(), rand2(), rand2()],

          //other designing methods
          backgroundColor: ["rgba(255, 206, 86, 0.2)"],
          borderColor: ["rgba(255, 206, 86, 1)"],
          borderWidth: 0.5,
          borderRadius: 3,
        },

        {
          label: "High Priority",
          data: [rand2(), rand2(), rand2(), rand2(), rand2()],
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 0.5,
          borderRadius: 3,
        },
      ],
    },

    //other chartJS options for drawing the chart
    options: {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 2,
      scales: {
        x: {
          title: {
            display: true,
            text: "Time",
          },
        },

        y: {
          title: {
            display: true,
            text: "Amount of Traffic",
          },
        },
      },
    },
  });
}

function renderHistoricalTrafficTypesChart() {
  let HTTC = document.querySelector("#HTTC");
  let ConfigHTTC = new Chart(HTTC, {
    type: "radar",
    data: {
      labels: [
        "With Signature",
        "UDP",
        "Risky Port",
        "No Signature",
        "Safe Port",
        "TCP",
      ],
      datasets: [
        {
          label: "1 Month Ago",
          data: [rand3(), rand3(), rand3(), rand3(), rand3(), rand3()],
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.1)",
          borderColor: "rgba(255, 99, 132, 0.5)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          borderWidth: 2,
        },
        {
          label: "2 Months Ago",
          data: [rand3(), rand3(), rand3(), rand3(), rand3(), rand3()],
          fill: true,
          backgroundColor: "rgba(51, 204, 51, 0.1)",
          borderColor: "rgba(51, 204, 51, 0.5)",
          pointBackgroundColor: "rgb(51, 204, 51)",
          borderWidth: 2,
        },
        {
          label: "3 Months Ago",
          data: [rand3(), rand3(), rand3(), rand3(), rand3(), rand3()],
          fill: true,
          backgroundColor: "rgba(54, 162, 235, 0.1)",
          borderColor: "rgba(54, 162, 235, 0.5)",
          pointBackgroundColor: "rgb(54, 162, 235)",
          borderWidth: 2,
        },
      ],
    },

    //other chartJS options for drawing the chart
    options: {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 2,
      scales: { y: { beginAtZero: true } },
    },
  });
}
