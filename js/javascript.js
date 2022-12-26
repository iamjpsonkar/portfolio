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
	exp += (R_date.getFullYear()-J_date.getFullYear())*12+(R_date.getMonth	()-J_date.getMonth());
	
	// Calculation for TCS Experience
	var J_date = Fynd_joining_date;
	var R_date = Fynd_resigniing_date;
	exp += (R_date.getFullYear()-J_date.getFullYear())*12+(R_date.getMonth	()-J_date.getMonth());
	

	// Experience Calculation
	var eYear = parseInt(exp/12);
	var eMonth = exp % 12;

	document.getElementById("eYear").innerHTML = eYear;
	document.getElementById("eMonth").innerHTML = eMonth;

	// Personal Experience
	var pYear = "2+";
	document.getElementById("pYear").innerHTML = PYear;

	// Last Working Day TCS
	var LWD = TCS_resigniing_date;
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	var today = new Date();
	var NPD = 1+Math.round(Math.abs((LWD - today) / oneDay));
	document.getElementById("NPD").innerHTML = NPD;
}
window.onload = setExp;