function setExp() 
{
	var exp = 0;

	var TCS_joining_date=new Date("2020-10-15");
	var TCS_resigning_date=new Date("2022-12-25");
	var Fynd_joining_date=new Date("2022-12-26");
	var Fynd_resigning_date=new Date();

	// Calculation for TCS Experience
	var J_date = TCS_joining_date;
	var R_date = TCS_resigning_date;
	var texp = (R_date.getFullYear()-J_date.getFullYear())*12+(R_date.getMonth()-J_date.getMonth());

	// Calculation for Fynd Experience
	J_date = Fynd_joining_date;
	R_date = Fynd_resigning_date;
	var fexp = (R_date.getFullYear()-J_date.getFullYear())*12+(R_date.getMonth()-J_date.getMonth());

	exp = texp + fexp;
	

	// Experience Calculation
	var eYear = parseInt(exp/12);
	var eMonth = exp % 12;

	console.log(eYear+"-"+eMonth);

	if (document.getElementById("eYear")) {
		document.getElementById("eYear").innerHTML = eYear;
	}
	if (document.getElementById("eYearAbout")) {
		document.getElementById("eYearAbout").innerHTML = eYear;
	}
	if (document.getElementById("eMonth")) {
		document.getElementById("eMonth").innerHTML = eMonth;
	}

	if(eMonth===0){
		if (document.getElementById('EXPMNTH')) {
			document.getElementById('EXPMNTH').style.display = 'none';
		}
		if (document.getElementById("eYear")) {
			document.getElementById("eYear").innerHTML = eYear+'.1';
		}
	}

	if (document.getElementById("tYear")) {
		document.getElementById("tYear").innerHTML = parseInt(texp/12);
	}
	if (document.getElementById("tMonth")) {
		document.getElementById("tMonth").innerHTML = texp % 12;
	}

	if (document.getElementById("fYear")) {
		document.getElementById("fYear").innerHTML = parseInt(fexp/12);
	}
	if (document.getElementById("fMonth")) {
		document.getElementById("fMonth").innerHTML = fexp % 12;
	}

	// Personal Experience
	var pYear = "2+";
	if (document.getElementById("pYear")) {
		document.getElementById("pYear").innerHTML = pYear;
	}

	// Last Working Day TCS
	var LWD = TCS_resigning_date;
	var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	var today = new Date();
	var NPD = 1+Math.round(Math.abs((LWD - today) / oneDay));
	if (document.getElementById("NPD")) {
		document.getElementById("NPD").innerHTML = NPD;
	}
}
window.onload = setExp;