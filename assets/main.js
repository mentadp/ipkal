/*JAVASCRIPT IS AWESOME*/

console.log('%c made with <3 by afarhansib', 'font-weight: bold; font-size: 30px;color: #063; text-shadow: 1px 1px 0px black , -1px -1px 0px white')
console.log('%c visit me on https://mentadp.github.io/', 'font-weight: bold; font-size: 20px;color: black; text-shadow: 1px 1px 0px #fc0 , -1px -1px 0px white')



// service worker
if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("sw.js")
		.then(function() {
		})
		.catch(function(err) {
		});
} else {
}


// cache
const tombolHitung = document.querySelector("button#hitung");
const card = document.querySelector("div.card");
const formInput = document.querySelector("form.input");
const ip = document.querySelector("input#ip");
const prefix = document.querySelector("input#prefix");
const netmask = document.querySelector("td#netmask");
const jumlahIp = document.querySelector("td#jumlahIp");
const jumlahHost = document.querySelector("td#jumlahHost");
const jumlahBlok = document.querySelector("td#jumlahBlok");
const iplist = document.querySelector("div.iplist");
const bloknav = document.querySelector("div.blok-nav");

// functions
validate = (evt, regex) => {
	let key;
	let e = evt || window.event;

	if (e.type === "paste") {
		key = event.clipboardData.getData("text/plain");
	} else {
		key = e.keyCode || e.which;
		key = String.fromCharCode(key);
	}

	if (!regex.test(key)) {
		e.returnValue = false;
		if (e.preventDefault) e.preventDefault();
	}
}

// events
tombolHitung.onclick = (e) => {
	e.preventDefault();
	let prefixVal = Number(prefix.value);
	let nZero = 32 - prefixVal;
	let netmaskBin = "";
	let netmaskDecTemp = "";
	let netmaskDec = "";
	let lastOktet = 0;
	let jumlahIpVal = 0;
	let jumlahHostVal = 0;
	let jumlahBlokVal = 0;
	let iplistVal = ``;
	let bloknavVal = ``;
	let ipVal = ip.value;
	let ipPart = ipVal.split(".");
	let ipEnd = Number(ipPart[3]);

	ipPart.pop()

	let ipStart = ipPart.join(".");

	for (i = 1; i <= 32; i++) {
		if (i <= prefixVal) {
			netmaskBin += "1";
		} else {
			netmaskBin += "0";
		}
		if (i !== 32 && i % 8 === 0) {
			netmaskBin += ".";
		}
	}

	netmaskDecTemp = netmaskBin.split(".");
	netmaskDecTemp.forEach((e, i) => {
		if (i < 3) {
			netmaskDec += `${parseInt(Number(e), 2)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.`;
		} else {
			lastOktet = parseInt(Number(e), 2);
			netmaskDec += `${parseInt(Number(e), 2)}`;
		}
	})

	// console.log(ipEnd)
	// console.log(ipPart)
	// console.log(ipStart)

	jumlahIpVal = 256 - lastOktet;
	jumlahHostVal = jumlahIpVal - 2;
	jumlahBlokVal = 256 / jumlahIpVal;

	netmask.innerHTML = `${netmaskBin}<br>${netmaskDec}`;
	jumlahIp.innerHTML = `256 - ${lastOktet} = <b>${jumlahIpVal}</b>`;
	jumlahHost.innerHTML = `${jumlahIpVal} - 2 = <b>${jumlahHostVal}</b>`;
	jumlahBlok.innerHTML = `256 / ${jumlahIpVal} = <b>${jumlahBlokVal}</b>`;

	bloknavVal += `
		<p>Blok:</p>
	`;

	for (i = 1; i <= jumlahBlokVal; i++) {
		bloknavVal += `
			<a title="Pergi ke Blok ke-${i}" href="#blok${i}">${i}</a>
		`;
	}

	bloknav.innerHTML = bloknavVal;

	for (i = 1; i <= jumlahBlokVal; i++) {
		iplistVal += `
			<div class="ipblock" id="blok${i}">
					<p>Daftar IP Blok ke-${i}</p>
					<p class="iprange"><b>${ipStart + "." + (i - 1) * jumlahIpVal} s/d ${ipStart + "." + ((i * jumlahIpVal) - 1)}</b></p>
					<table>
		`;

		let k = 0;
		let b = true;
		while (b) {
			k++;
			// iplistVal += k + i;

			if (k === 1) {
				iplistVal += `
							<tr>
								<th>IP ke-${k}</th>
								<td>${ipStart + "." + (((i - 1) * jumlahIpVal) + (k - 1))}</td>
								<th>NETWORK</th>
							</tr>
				`;
			} else if (k === jumlahIpVal) {
				iplistVal += `
							<tr>
								<th>IP ke-${k}</th>
								<td>${ipStart + "." + (((i - 1) * jumlahIpVal) + (k - 1))}</td>
								<th>BROADCAST</th>
							</tr>
				`;
			} else {
				iplistVal += `
							<tr>
								<th>IP ke-${k}</th>
								<td>${ipStart + "." + (((i - 1) * jumlahIpVal) + (k - 1))}</td>
								<th>HOST Ke-${k - 1}</th>
							</tr>
				`;
			}

			b = k < jumlahIpVal;
		}
		// iplistVal += tabelIp[i];

		iplistVal += `
					</table>
				</div>
		`;

	}

	iplist.innerHTML = iplistVal;
}

ip.onkeypress = (e) => validate(e, /[0-9]|\./);
prefix.onkeypress = (e) => validate(e, /[0-9]/);