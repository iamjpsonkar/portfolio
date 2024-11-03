function setExp() 
{
	var exp = 0;

	var TCS_joining_date=new Date("2020-10-15");
	var TCS_resigniing_date=new Date("2022-12-25");
	var Fynd_joining_date=new Date("2022-12-26");
	var Fynd_resigniing_date=new Date();

	// Calculation for TCS Experience
	var J_date = TCS_joining_date;
	var R_date = TCS_resigniing_date;
	texp = (R_date.getFullYear()-J_date.getFullYear())*12+(R_date.getMonth	()-J_date.getMonth());
	
	// Calculation for Fynd Experience
	var J_date = Fynd_joining_date;
	var R_date = Fynd_resigniing_date;
	fexp = (R_date.getFullYear()-J_date.getFullYear())*12+(R_date.getMonth	()-J_date.getMonth());

	exp = texp + fexp
	

	// Experience Calculation
	var eYear = parseInt(exp/12);
	var eMonth = exp % 12;

	console.log(eYear+"-"+eMonth);
	document.getElementById("eYear").innerHTML = eYear;
	document.getElementById("eMonth").innerHTML = eMonth;

	if(eMonth===0){
		document.getElementById('EXPMNTH').style.display = 'none';
		document.getElementById("eYear").innerHTML = eYear+'.1';
	}

	document.getElementById("tYear").innerHTML = parseInt(texp/12);
	document.getElementById("tMonth").innerHTML = texp % 12;

	document.getElementById("fYear").innerHTML = parseInt(fexp/12);
	document.getElementById("fMonth").innerHTML = fexp % 12;

	// Personal Experience
	var pYear = "2+";
	//document.getElementById("pYear").innerHTML = pYear;

	// Last Working Day TCS
	var LWD = TCS_resigniing_date;
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	var today = new Date();
	var NPD = 1+Math.round(Math.abs((LWD - today) / oneDay));
	//document.getElementById("NPD").innerHTML = NPD;
}
window.onload = setExp;