let progressValue = 0;
let IntervalTimer;
let Tyear = new Date().getFullYear();

let QuarantineRules = [
	{
		QRuleName: "Backdoor Malware",
		AmountTriggered: rand5(),
		DateLastTriggered: `${randDay()}/${randMonth()}/${Tyear}`,
		Priority: "Medium",
		Activated: true,
		QRuleConfig: `alert tcp $HOME_NET 666 -> $EXTERNAL_NET any ( msg:"MALWARE-BACKDOOR BackConstruction 2.1 Server FTP Open Reply"; flow:to_client,established; content:"FTP Port open"; metadata:ruleset community; classtype:misc-activity; sid:158; rev:10; )`,
	},

	{
		QRuleName: "Other Malware",
		AmountTriggered: rand5(),
		DateLastTriggered: `${randDay()}/${randMonth()}/${Tyear}`,
		Priority: "Medium",
		Activated: true,
		QRuleConfig: `alert udp $EXTERNAL_NET any -> $HOME_NET [31335,35555] ( msg:"MALWARE-OTHER Trin00 Daemon to Master PONG message detected"; flow:to_server; content:"PONG",fast_pattern,nocase; metadata:ruleset community; reference:cve,2000-0138; classtype:attempted-dos; sid:223; rev:13; )`,
	},

	{
		QRuleName: "Alert ICMP",
		AmountTriggered: rand5(),
		DateLastTriggered: `${randDay()}/${randMonth()}/${Tyear}`,
		Priority: "Medium",
		Activated: true,
		QRuleConfig: `alert icmp $EXTERNAL_NET any -> $HOME_NET any ( msg:"PROTOCOL-ICMP Stacheldraht client check gag"; icmp_id:668; itype:0; content:"gesundheit!"; metadata:ruleset community; reference:cve,2000-0138; classtype:attempted-dos; sid:236; rev:13; )`,
	},

	{
		QRuleName: "Suspicious Login",
		AmountTriggered: rand5(),
		DateLastTriggered: `${randDay()}/${randMonth()}/${Tyear}`,
		Priority: "High",
		Activated: true,
		QRuleConfig: `alert tcp $EXTERNAL_NET any -> $TELNET_SERVERS 23 ( msg:"PROTOCOL-TELNET 4Dgifts SGI account attempt"; flow:to_server,established; content:"4Dgifts"; metadata:ruleset community; service:telnet; reference:cve,1999-0501; reference:nessus,11243; classtype:suspicious-login; sid:709; rev:17; )`,
	},

	{
		QRuleName: "SQL Injection Attempt",
		AmountTriggered: rand5(),
		DateLastTriggered: `${randDay()}/${randMonth()}/${Tyear}`,
		Priority: "High",
		Activated: true,
		QRuleConfig: `alert tcp $EXTERNAL_NET any -> $HOME_NET $HTTP_PORTS ( msg:"SERVER-WEBAPP Demarc SQL injection attempt"; flow:to_server,established; http_uri; content:"/dm/demarc"; pkt_data; content:"s_key="; content:"'",distance 0; content:"'",distance 1; content:"'",distance 0; metadata:ruleset community; service:http; reference:bugtraq,4520; reference:cve,2002-0539; classtype:web-application-activity; sid:2063; rev:13; )`,
	},
];

let progressBar = document.querySelector("#prog-bar");
let qrulesInfo = document.querySelector("#qrules-info");
let qtrafficsInfo = document.querySelector("#qtraffics-info");
let recordspan = document.querySelector("#recordspan-info");

let qrulesList = document.querySelector("#quarantine-rules-list");
let qstats = document.querySelector("#quarantine-stats");
let qprio = document.querySelector("#priorities-container");
let qnotif = document.querySelector("#notifications-container");

let errorNotif = document.querySelector("#error-toast");

for (let i = 0; i < 6; i++) {
	qstats.innerHTML += `
	<tr>
		<td class="placeholder-glow"><span class="placeholder col-12"></span></td>
		<td class="placeholder-glow"><span class="placeholder col-12"></span></td>
		<td class="placeholder-glow"><span class="placeholder col-12"></span></td>
	</tr>`;
}

onPageLoadAnimation();

IntervalTimer = setInterval(onPageLoadAnimation, 20);

function onPageLoadAnimation() {
	progressBar.style.width = `${progressValue}%`;

	progressValue++;

	if (progressValue > 50) {
		progressBar.innerHTML = `${progressValue - 50}%`;
	}

	//when the loading finished animation
	if (progressValue >= 150) {
		clearInterval(IntervalTimer);
		progressValue = 0;

		document.querySelector(
			"#IDSSettingLoadAnimation"
		).innerHTML = `<div class="d-flex justify-content-center my-2">IDS Settings Succesfully Loaded!</div>
				<div class="progress">
					<div id="prog-bar" class="progress-bar bg-success"
						style="width: 100%;">
						<div class="d-flex justify-content-center">Done!</div>
					</div>
				</div>`;

		//re-enable all disabled buttons
		let disabledButtons = document.querySelectorAll(".btn.disabled");
		disabledButtons.forEach((buttons) => {
			buttons.classList.remove("disabled");
		});

		//remove placeholders and plugin random data
		qrulesInfo.classList.remove("placeholder");
		qrulesInfo.innerHTML = `${5}`;

		qtrafficsInfo.classList.remove("placeholder");
		qtrafficsInfo.innerHTML = `${rand4()}`;

		recordspan.classList.remove("placeholder");
		recordspan.innerHTML = `3 Months`;

		renderQuarantineStats();
		renderQuarantineRules();
		renderPriorities();
		renderNotifications();
	}
}

function renderQuarantineStats() {
	qstats.innerHTML = ``;

	for (let i = 0; i < QuarantineRules.length; i++) {
		qstats.innerHTML += `
		<tr>
			<td>${QuarantineRules[i].QRuleName}</td>
			<td>${QuarantineRules[i].AmountTriggered}</td>
			<td>${QuarantineRules[i].DateLastTriggered}</td>
		</tr>`;
	}
}

function renderQuarantineRules() {
	qrulesList.innerHTML = ``;
	let checkedMarkup = ``;
	let textStyleMarkup = ``;

	for (let i = 0; i < QuarantineRules.length; i++) {
		if (QuarantineRules[i].Activated == true) {
			checkedMarkup = `checked`;
			textStyleMarkup = ``;
		} else {
			checkedMarkup = ``;
			textStyleMarkup = `fw-lighter text-muted`;
		}
		qrulesList.innerHTML += `
		<li id="qrule${i}" class="list-group-item d-flex ${textStyleMarkup}">
			<div class="ms-2 me-auto">
				${QuarantineRules[i].QRuleName}
			</div>
			<div class="form-check form-switch">
				<input id="qruleCheckbox${i}" class="form-check-input" type="checkbox" onclick="toggleQuarantineRule(${i})" ${checkedMarkup}>
			</div>
			<button type="button" class="btn sky-blue btn-sm mx-2" onclick="editQuarantineRule(${i})" data-bs-toggle="modal" data-bs-target="#QRModal"><i class="far fa-edit"></i></button>
			<button type="button" class="btn sky-blue btn-sm" onclick="deleteQuarantineRule(${i})"><i class="far fa-trash-alt"></i></button>
		</li>`;
	}
}

function renderPriorities() {
	let mediumPrios = [];
	let highPrios = [];
	let MPLmarkup = ``;
	let HPLmarkup = ``;

	for (let i = 0; i < QuarantineRules.length; i++) {
		if (QuarantineRules[i].Priority === "Medium") {
			mediumPrios.push(QuarantineRules[i]);
		} else if (QuarantineRules[i].Priority === "High") {
			highPrios.push(QuarantineRules[i]);
		}
	}

	for (let i = 0; i < mediumPrios.length; i++) {
		MPLmarkup += `<li class="list-group-item">${mediumPrios[i].QRuleName}</li>`;
	}

	for (let i = 0; i < highPrios.length; i++) {
		HPLmarkup += `<li class="list-group-item">${highPrios[i].QRuleName}</li>`;
	}

	qprio.innerHTML = `
	<div class="accordion" id="PrioritiesAccordion">
		<div class="accordion-item">
			<h2 class="accordion-header" id="headingOne">
				<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
					aria-expanded="true" aria-controls="collapseOne">
					<i class="fas fa-skull-crossbones"></i>&nbsp;High Priority
				</button>
			</h2>
			<div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
				data-bs-parent="#PrioritiesAccordion">
				<div class="accordion-body">
					<ul class="list-group">
						${HPLmarkup}
					</ul>
				</div>
			</div>
		</div>
		<div class="accordion-item">
			<h2 class="accordion-header" id="headingTwo">
				<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
					data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
					<i class="fas fa-exclamation-triangle"></i>&nbsp;Medium Priority
				</button>
			</h2>
			<div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
				data-bs-parent="#PrioritiesAccordion">
				<div class="accordion-body">
					<ul class="list-group">
						${MPLmarkup}
					</ul>
				</div>
			</div>
		</div>
		<div class="accordion-item">
			<h2 class="accordion-header" id="headingThree">
				<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
					data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
					<i class="far fa-question-circle"></i>&nbsp;Others
				</button>
			</h2>
			<div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
				data-bs-parent="#PrioritiesAccordion">
				<div class="accordion-body">
					<ul class="list-group">
						
					</ul>
				</div>
			</div>
		</div>
	</div>`;
}

function renderNotifications() {
	qnotif.innerHTML = `
	<ul class="list-group">
		<li class="list-group-item"><i class="fas fa-skull-crossbones"></i> High Priority</li>
		<li class="list-group-item d-flex justify-content-between">
			<div class="form-check ms-5">
				<input class="form-check-input" type="checkbox" id="HP-push" onclick="toggleNotifications(this.id)" onclick="toggleNotifications(this.id)" checked>
				<label class="form-check-label" for="HP-push">
					<i class="far fa-window-restore"></i> Push
				</label>
			</div>
			<div class="form-check">
				<input class="form-check-input" type="checkbox" id="HP-mail" onclick="toggleNotifications(this.id)" checked>
				<label class="form-check-label" for="HP-mail">
					<i class="far fa-envelope"></i> Mail
				</label>
			</div>
			<div class="form-check">
				<input class="form-check-input" type="checkbox" id="HP-SMS" onclick="toggleNotifications(this.id)" checked>
				<label class="form-check-label" for="HP-SMS">
					<i class="far fa-comment-alt"></i> SMS
				</label>
			</div>
		</li>
		<li class="list-group-item"><i class="fas fa-exclamation-triangle"></i> Medium
			Priority</li>
		<li class="list-group-item d-flex justify-content-between">
			<div class="form-check ms-5">
				<input class="form-check-input" type="checkbox" id="MP-push" onclick="toggleNotifications(this.id)" checked>
				<label class="form-check-label" for="MP-push">
					<i class="far fa-window-restore"></i> Push
				</label>
			</div>
			<div class="form-check">
				<input class="form-check-input" type="checkbox" id="MP-mail" onclick="toggleNotifications(this.id)" checked>
				<label class="form-check-label" for="MP-mail">
					<i class="far fa-envelope"></i> Mail
				</label>
			</div>
			<div class="form-check">
				<input class="form-check-input" type="checkbox" id="MP-sms" onclick="toggleNotifications(this.id)" checked>
				<label class="form-check-label" for="MP-sms">
					<i class="far fa-comment-alt"></i> SMS
				</label>
			</div>
		</li>
		<li class="list-group-item"><i class="far fa-question-circle"></i> Others</li>
		<li class="list-group-item d-flex justify-content-between">
			<div class="form-check ms-5">
				<input class="form-check-input" type="checkbox" id="OTH-push" onclick="toggleNotifications(this.id)" checked>
				<label class="form-check-label" for="OTH-push">
					<i class="far fa-window-restore"></i> Push
				</label>
			</div>
			<div class="form-check">
				<input class="form-check-input" type="checkbox" id="OTH-mail" onclick="toggleNotifications(this.id)" checked>
				<label class="form-check-label" for="OTH-mail">
					<i class="far fa-envelope"></i> Mail
				</label>
			</div>
			<div class="form-check">
				<input class="form-check-input" type="checkbox" id="OTH-sms" onclick="toggleNotifications(this.id)" checked>
				<label class="form-check-label" for="OTH-sms">
					<i class="far fa-comment-alt"></i> SMS
				</label>
			</div>
		</li>
	</ul>`;
}

function toggleNotifications(ElementID) {
	let notifCheckbox = document.getElementById(ElementID);

	if (notifCheckbox.checked) {
		notifCheckbox.nextElementSibling.classList.remove("text-muted");
	} else {
		notifCheckbox.nextElementSibling.classList.add("text-muted");
	}
}

function deleteQuarantineRule(ruleIndex) {
	QuarantineRules.splice(ruleIndex, 1);
	renderQuarantineRules();
	renderQuarantineStats();
	renderPriorities();
}

function toggleQuarantineRule(ruleIndex) {
	let checkboxLocation = document.querySelector(`#qruleCheckbox${[ruleIndex]}`);
	let ruleNameLocation = document.querySelector(`#qrule${[ruleIndex]}`);

	if (checkboxLocation.checked) {
		ruleNameLocation.classList.remove("fw-lighter", "text-muted");
		QuarantineRules[ruleIndex].Activated = true;
	} else {
		ruleNameLocation.classList.add("fw-lighter", "text-muted");
		QuarantineRules[ruleIndex].Activated = false;
	}
}

function createNewQuarantineRule() {
	document.querySelector("#QRNameInput").value = ``;
	document.querySelector("#QRConfigInput").value = ``;
	document.querySelector(
		".modal-title"
	).innerHTML = `Create New Quarantine Rule`;
	document.querySelector(
		".modal-footer"
	).innerHTML = `<button type="button" class="btn col sky-blue" data-bs-toggle="modal" data-bs-target="#QRModal" onclick="addNewRule()">Create</button>`;
}

function addNewRule() {
	let newQRName = document.querySelector("#QRNameInput").value;
	let newQRConfig = document.querySelector("#QRConfigInput").value;

	if (newQRName != "" && newQRConfig != "") {
		QuarantineRules.push({
			QRuleName: newQRName,
			AmountTriggered: rand5(),
			DateLastTriggered: `${randDay()}/${randMonth()}/${Tyear}`,
			Priority: "Medium",
			Activated: true,
			QRuleConfig: newQRConfig,
		});

		renderQuarantineRules();
		renderQuarantineStats();
		renderPriorities();
	} else {
		let errorToast = new bootstrap.Toast(errorNotif);
		errorToast.show();
	}
}

function editQuarantineRule(ruleIndex) {
	let QRName = document.querySelector("#QRNameInput");
	QRName.value = QuarantineRules[ruleIndex].QRuleName;

	let QRConfg = document.querySelector("#QRConfigInput");
	QRConfg.value = QuarantineRules[ruleIndex].QRuleConfig;

	document.querySelector(".modal-title").innerHTML = `Edit Quarantine Rule`;
	document.querySelector(
		".modal-footer"
	).innerHTML = `<button type="button" class="btn col sky-blue" data-bs-toggle="modal" data-bs-target="#QRModal" onclick="editRule(${ruleIndex})">Save</button>`;
}

function editRule(ruleIndex) {
	let newQRName = document.querySelector("#QRNameInput").value;
	let newQRConfig = document.querySelector("#QRConfigInput").value;

	if (newQRName != "" && newQRConfig != "") {
		QuarantineRules[ruleIndex].QRuleName = newQRName;
		QuarantineRules[ruleIndex].QRuleConfig = newQRConfig;

		renderQuarantineRules();
		renderQuarantineStats();
		renderPriorities();
	} else {
		let errorToast = new bootstrap.Toast(errorNotif);
		errorToast.show();
	}
}
