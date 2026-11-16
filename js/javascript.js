function wholeMonthsBetween(startDate, endDate) {
    let months =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth());

    if (endDate.getDate() < startDate.getDate()) {
        months -= 1;
    }

    return Math.max(0, months);
}

function writeTenure(prefix, totalMonths) {
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    const yearsElement = document.getElementById(prefix + "Year");
    const monthsElement = document.getElementById(prefix + "Month");

    if (yearsElement) {
        yearsElement.textContent = String(years);
    }
    if (monthsElement) {
        monthsElement.textContent = String(months);
    }
}

function setExp() {
    const today = new Date();
    const tcsStart = new Date(2020, 9, 15);
    const tcsEnd = new Date(2022, 11, 25);
    const fyndStart = new Date(2022, 11, 26);

    const tcsMonths = wholeMonthsBetween(tcsStart, tcsEnd);
    const fyndMonths = wholeMonthsBetween(fyndStart, today);
    const totalMonths = wholeMonthsBetween(tcsStart, today);

    writeTenure("t", tcsMonths);
    writeTenure("f", fyndMonths);
    writeTenure("e", totalMonths);

    const experienceMonthLabel = document.getElementById("EXPMNTH");
    if (experienceMonthLabel) {
        experienceMonthLabel.hidden = totalMonths % 12 === 0;
    }

    const personalExperience = document.getElementById("pYear");
    if (personalExperience) {
        personalExperience.textContent = "2+";
    }
}

window.addEventListener("DOMContentLoaded", setExp);
