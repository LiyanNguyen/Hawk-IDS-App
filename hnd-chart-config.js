let rand = () => {
  return Math.round(Math.random() * 1000 + 1000);
};

let rand2 = () => {
  return Math.round(Math.random() * 300 + 200);
};

let rand3 = () => {
  return Math.round(Math.random() * 1000);
};

let rand4 = () => {
  return Math.round(Math.random() * 100000 + 100000);
};

let progressValue = 0;
let IntervalTimer;

// renderHTVC();
// renderHTTC();

// renderNewHTVC();
// setTimeout(renderNewHTTC, 3000);

let tabledata = document.querySelector("#table-data");
for (let i = 0; i < 10; i++) {
  tabledata.innerHTML += `<tr>
    										<td class="placeholder-glow"><span class="placeholder col-12"></span></td>
    										<td class="placeholder-glow"><span class="placeholder col-12"></span></td>
    										<td class="placeholder-glow"><span class="placeholder col-12"></span></td>
    										<td class="placeholder-glow"><span class="placeholder col-12"></span></td>
    										<td class="placeholder-glow"><span class="placeholder col-12"></span></td>
    										<td class="placeholder-glow"><span class="placeholder col-12"></span></td>
    										<td class="placeholder-glow"><span class="placeholder col-12"></span></td>
    										<td class="placeholder-glow"><span class="placeholder col-12"></span></td>
    										<td class="placeholder-glow"><span class="placeholder col-12"></span></td>
    										<td class="placeholder-glow"><span class="placeholder col-12"></span></td>
    										<td class="placeholder-glow"><span class="placeholder col-12"></span></td>
    										<td class="placeholder-glow"><span class="placeholder col-12"></span></td>
    									</tr>`;
}

loadDatabaseAnimation();

IntervalTimer = setInterval(loadDatabaseAnimation, 20);

function loadDatabaseAnimation() {
  let progressBar = document.querySelector("#prog-bar");
  let dbsize = document.querySelector("#dbsize-info");
  let totalrecords = document.querySelector("#totalrecords-info");
  let recordsfound = document.querySelector("#recordsfound-info");
  let recordspan = document.querySelector("#recordspan-info");

  progressBar.style.width = `${progressValue}%`;

  progressValue++;

  if (progressValue > 50) {
    progressBar.innerHTML = `${progressValue - 50}%`;
  }

  //when the loading finished animation
  if (progressValue >= 150) {
    clearInterval(IntervalTimer);
    renderHTVC();
    renderHTTC();
    progressValue = 0;

    document.querySelector(
      "#DBLoadAnimation"
    ).innerHTML = `<div class="d-flex justify-content-center my-2">Database Succesfully Loaded!</div>
				<div class="progress">
					<div id="prog-bar" class="progress-bar bg-success"
						style="width: 100%;">
						<div class="d-flex justify-content-center">Done!</div>
					</div>
				</div>`;

    dbsize.classList.remove("placeholder");
    dbsize.innerHTML = `${rand()} MB`;

    totalrecords.classList.remove("placeholder");
    totalrecords.innerHTML = `${rand4()}`;

    recordspan.classList.remove("placeholder");
    recordspan.innerHTML = `3 Months`;

    recordsfound.classList.remove("placeholder");
    recordsfound.innerHTML = `${totalrecords.innerHTML} Records Found`;
  }
}

function renderHTVC() {
  document.querySelector(
    "#HTVCContainer"
  ).innerHTML = `<canvas id="HTVC"></canvas>`;

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

function renderHTTC() {
  document.querySelector(
    "#HTTCContainer"
  ).innerHTML = `<canvas id="HTTC"></canvas>`;

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
