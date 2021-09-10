// initially generate charts
renderLTVC();
renderLTTC();

let countDownTimer = 59;
let IntervalTimer;
let TableDataIntervalTimer;

let realTimeTrafficIsRunning = true;

let LTVCtime = document.querySelector("#ltvc-timer");
let LTTCtime = document.querySelector("#lttc-timer");
let liveTable = document.querySelector("#live-table");

let liveTableData = [];

function generateRandomLiveData() {
  let networkClassif = ClassifValues[randClassifPicker()];
  let rowColor;

  let date = new Date();
  let Tday = date.getDate();
  let Tmonth = date.getMonth();
  let Tyear = date.getFullYear();
  let Thour = date.getHours();
  let Tmins = date.getMinutes();
  let Tsecs = date.getSeconds();

  if (networkClassif === "Normal Traffic") {
    rowColor = `<tr style="background-color: rgba(54, 162, 235, 0.03);">`;
  } else if (networkClassif === "Supicious Traffic") {
    rowColor = `<tr style="background-color: rgba(255, 206, 86, 0.5);">`;
  } else if (networkClassif === "Harmful Traffic") {
    rowColor = `<tr style="background-color: rgba(255, 99, 132, 0.5);">`;
  } else if (networkClassif === "Unknown Traffic") {
    rowColor = `<tr style="background-color: rgba(163, 163, 194, 0.5);">`;
  } else {
    rowColor = `<tr>`;
  }

  liveTableData.unshift(`${rowColor}
			<td>${Tday}/${Tmonth}/${Tyear} - ${Thour}:${Tmins}:${Tsecs}</td>
			<td>${rand120()}:${rand50()}:${rand10()}</td>
			<td>${rand100to600()}</td>
			<td>${networkClassif}</td>
			<td>${AuthValues[randAuthPicker()]}</td>
			<td>${rand10()}</td>
			<td>${ProtocolValues[randProtocolPicker()]}</td>
			<td>${rand255()}.${rand255()}.${rand255()}.${rand255()}</td>
			<td>${rand1to1024()}</td>
			<td>${rand255()}.${rand255()}.${rand255()}.${rand255()}</td>
			<td>${rand1to1024()}</td>
			<td>${CountryValues[randCountryPicker()]}</td>
		</tr>`);
}

//initially generate 10 rows of random live network data
for (let i = 0; i < 10; i++) {
  generateRandomLiveData();
}

function renderLiveTableData() {
  liveTable.innerHTML = ``;
  liveTableData.forEach((liveData) => {
    liveTable.innerHTML += liveData;
  });
}

//initially render 10 random table data
renderLiveTableData();

//initially run the real-time traffic
runRealTimeTraffic();

function pauseRealTimeTraffic() {
  clearInterval(TableDataIntervalTimer);
}

function runRealTimeTraffic() {
  //re-generate table data every 0.3 seconds
  //simulating a real-time live network traffic
  TableDataIntervalTimer = setInterval(() => {
    liveTableData.pop();
    generateRandomLiveData();
    renderLiveTableData();
  }, 250);
}

function PauseResumeToggle() {
  realTimeTrafficIsRunning = !realTimeTrafficIsRunning;
  console.log(realTimeTrafficIsRunning);

  if (realTimeTrafficIsRunning) {
    document.querySelector(
      "#pause-resume-container"
    ).innerHTML = `<button type="button" class="btn sky-blue mb-3" onclick="PauseResumeToggle();pauseRealTimeTraffic()"><i
						class="far fa-pause-circle"></i>
					Pause</button>`;
  }

  if (!realTimeTrafficIsRunning) {
    document.querySelector(
      "#pause-resume-container"
    ).innerHTML = `<button type="button" class="btn sky-blue mb-3" onclick="PauseResumeToggle();runRealTimeTraffic()"><i
						class="far fa-play-circle"></i>
					Resume</button>`;
  }
}

IntervalTimer = setInterval(beginCountDown, 1000);

function beginCountDown() {
  countDownTimer--;
  LTVCtime.innerHTML = ` Chart will update in ${countDownTimer} second(s)`;
  LTTCtime.innerHTML = ` Chart will update in ${countDownTimer} second(s)`;

  if (countDownTimer === 0) {
    LTVCtime.innerHTML = ` Updating...`;
    LTTCtime.innerHTML = ` Updating...`;
    renderLTVC();
    renderLTTC();
    countDownTimer = 60;
  }
}

function renderLTVC() {
  document.querySelector(
    "#LTVCContainer"
  ).innerHTML = `<canvas id="LTVC"></canvas>`;

  let LTVC = document.querySelector("#LTVC");
  let ConfigLTVC = new Chart(LTVC, {
    type: "bar",
    data: {
      labels: ["1 Min Ago", "2 Mins Ago", "3 Mins Ago"],
      datasets: [
        {
          label: "Normal Traffic",
          data: [liveRand(), liveRand(), liveRand()],
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgba(54, 162, 235, 1)"],
          borderWidth: 0.5,
          borderRadius: 3,
        },

        {
          label: "Suspicious Traffic",
          data: [
            liveRand2(),
            liveRand2(),
            liveRand2(),
            liveRand2(),
            liveRand2(),
          ],

          //other designing methods
          backgroundColor: ["rgba(255, 206, 86, 0.2)"],
          borderColor: ["rgba(255, 206, 86, 1)"],
          borderWidth: 0.5,
          borderRadius: 3,
        },

        {
          label: "Harmful Traffic",
          data: [liveRand2(), liveRand2(), liveRand2()],
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 0.5,
          borderRadius: 3,
        },

        {
          label: "Unknown Traffic",
          data: [liveRand2(), liveRand2(), liveRand2()],
          backgroundColor: ["rgba(163, 163, 194, 0.2)"],
          borderColor: ["rgba(163, 163, 194, 1)"],
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

function renderLTTC() {
  document.querySelector(
    "#LTTCContainer"
  ).innerHTML = `<canvas id="LTTC"></canvas>`;

  let LTTC = document.querySelector("#LTTC");
  let ConfigLTTC = new Chart(LTTC, {
    type: "radar",
    data: {
      labels: [
        "Safe Authentication",
        "Risky Port",
        "Safe Protocol",
        "Risky Authentication",
        "Safe Port",
        "Risky Protocol",
      ],
      datasets: [
        {
          label: "1 Min Ago",
          data: [
            liveRand3(),
            liveRand3(),
            liveRand3(),
            liveRand3(),
            liveRand3(),
            liveRand3(),
          ],
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.1)",
          borderColor: "rgba(255, 99, 132, 0.5)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          borderWidth: 2,
        },
        {
          label: "2 Mins Ago",
          data: [
            liveRand3(),
            liveRand3(),
            liveRand3(),
            liveRand3(),
            liveRand3(),
            liveRand3(),
          ],
          fill: true,
          backgroundColor: "rgba(51, 204, 51, 0.1)",
          borderColor: "rgba(51, 204, 51, 0.5)",
          pointBackgroundColor: "rgb(51, 204, 51)",
          borderWidth: 2,
        },
        {
          label: "3 Mins Ago",
          data: [
            liveRand3(),
            liveRand3(),
            liveRand3(),
            liveRand3(),
            liveRand3(),
            liveRand3(),
          ],
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
