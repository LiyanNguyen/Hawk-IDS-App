let ClassifValues = [
  "Unknown Traffic",
  "Normal Traffic",
  "Supicious Traffic",
  "Harmful Traffic",
];

let CountryValues = ["USA", "India", "Russia", "China"];

let AuthValues = [
  "PPP",
  "PAP",
  "CHAP",
  "EAP",
  "EAP-MD5",
  "EAP-TLS",
  "EAP-TTLS",
  "EAP-FAST",
  "EAP-PEAP",
  "AAA",
  "TACACS+",
  "RADIUS",
  "DIAMETER",
  "AKA",
  "CRAM-MD5",
  "CAVE",
  "NTLM",
  "SAML",
];

let ProtocolValues = [
  "TCP",
  "UDP",
  "IP",
  "POP",
  "SMTP",
  "FTP",
  "HTTP",
  "HTTPS",
  "ARP",
  "DHCP",
  "IMAP4",
  "SIP",
  "RTP",
  "RLP",
  "RAP",
  "L2TP",
  "PPTP",
  "SNMP",
  "TFTP",
];

let liveRand = () => {
  return Math.round(Math.random() * 100 + 100);
};

let liveRand2 = () => {
  return Math.round(Math.random() * 50 + 20);
};

let liveRand3 = () => {
  return Math.round(Math.random() * 100);
};

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

let rand5 = () => {
  return Math.round(Math.random() * 10000 + 10000);
};

let randDay = () => {
  return Math.round(Math.random() * 30 + 1);
};

let randMonth = () => {
  return Math.round(Math.random() * 12 + 1);
};

let randYear = () => {
  return Math.round(Math.random() * 20 + 2000);
};

let randHour = () => {
  return Math.round(Math.random() * 23);
};

let randMinute = () => {
  return Math.round(Math.random() * 59);
};

let rand120 = () => {
  return Math.round(Math.random() * 119 + 1);
};

let rand50 = () => {
  return Math.round(Math.random() * 49 + 1);
};

let rand10 = () => {
  return Math.round(Math.random() * 9 + 1);
};

let rand255 = () => {
  return Math.round(Math.random() * 254 + 1);
};

let rand100to600 = () => {
  return Math.round(Math.random() * 499 + 100);
};

let rand1to1024 = () => {
  return Math.round(Math.random() * 1023 + 1);
};

let randClassifPicker = () => {
  return Math.round(Math.random() * (ClassifValues.length - 1));
};

let randAuthPicker = () => {
  return Math.round(Math.random() * (AuthValues.length - 1));
};

let randProtocolPicker = () => {
  return Math.round(Math.random() * (ProtocolValues.length - 1));
};

let randCountryPicker = () => {
  return Math.round(Math.random() * (CountryValues.length - 1));
};
