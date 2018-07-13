function getToday() {
  var hebrewMonthsNames = new Array("דצמבר","נובמבר", "אוקטובר", "ספטמבר", "אוגוסט", "יולי", "יוני","מאי","אפריל","מרץ","פברואר","ינואר");
  let date = new Date();
  let dateStr = (date).toLocaleDateString('he-IL');

  if (Math.random() < .2) {
    dateStr = hebrewMonthsNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  }
  
  if (Math.random() > 0.5) {
    dateStr = dateStr.replace(/\.20/g, '.');
  }

  if (Math.random() < 0.2) {
    dateStr = dateStr.replace(/\./g, '/');
  } else if (Math.random() < 0.2) {
    dateStr = dateStr.replace(/\./g, '-');
  }
  return dateStr;
}

var TODAY_STR = getToday();