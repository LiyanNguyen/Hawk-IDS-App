let rand = () => {
  return Math.round(Math.random() * 100 + 100);
};

let rand2 = () => {
  return Math.round(Math.random() * 50 + 20);
};

let rand3 = () => {
  return Math.round(Math.random() * 100);
};

//call this function again when the timer goes to 0
renderTrafficVolumeChart();
renderTrafficTypesChart();

function renderTrafficVolumeChart() {
  let TFVC = document.querySelector("#TFVC");
  let ConfigTFVC = new Chart(TFVC, {
    type: "bar",
    data: {
      labels: [
        "1 Min ago",
        "2 Mins ago",
        "3 Mins ago",
        "4 Mins ago",
        "5 Mins ago",
      ],
      datasets: [
        {
          label: "Total",
          data: [rand(), rand(), rand(), rand(), rand()],
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

function renderTrafficTypesChart() {
  let fmtrc = document.querySelector("#myChart2");
  let Configfmtrc = new Chart(fmtrc, {
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
          label: "1 Min Ago",
          data: [rand3(), rand3(), rand3(), rand3(), rand3(), rand3()],
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.1)",
          borderColor: "rgba(255, 99, 132, 0.5)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          borderWidth: 2,
        },
        {
          label: "2 Mins Ago",
          data: [rand3(), rand3(), rand3(), rand3(), rand3(), rand3()],
          fill: true,
          backgroundColor: "rgba(51, 204, 51, 0.1)",
          borderColor: "rgba(51, 204, 51, 0.5)",
          pointBackgroundColor: "rgb(51, 204, 51)",
          borderWidth: 2,
        },
        {
          label: "3 Mins Ago",
          data: [rand3(), rand3(), rand3(), rand3(), rand3(), rand3()],
          fill: true,
          backgroundColor: "rgba(54, 162, 235, 0.1)",
          borderColor: "rgba(54, 162, 235, 0.5)",
          pointBackgroundColor: "rgb(54, 162, 235)",
          borderWidth: 2,
        },
        {
          label: "4 Mins Ago",
          data: [rand3(), rand3(), rand3(), rand3(), rand3(), rand3()],
          fill: true,
          backgroundColor: "rgba(153, 51, 255, 0.1)",
          borderColor: "rgba(153, 51, 255, 0.5)",
          pointBackgroundColor: "rgb(153, 51, 255)",
          borderWidth: 2,
        },
        {
          label: "5 Mins Ago",
          data: [rand3(), rand3(), rand3(), rand3(), rand3(), rand3()],
          fill: true,
          backgroundColor: "rgba(255, 153, 51, 0.1)",
          borderColor: "rgba(255, 153, 51, 0.5)",
          pointBackgroundColor: "rgb(255, 153, 51)",
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
