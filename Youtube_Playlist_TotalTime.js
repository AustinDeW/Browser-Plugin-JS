AddTime();

function AddTime()
{
  var timesDiv = document.getElementsByClassName('timestamp');

  var totalMin = 0;
  var totalSec = 0;

  for(var i = 0; i < timesDiv.length; i++)
  {
      var time = timesDiv[i].firstChild.innerHTML;
      var min = time.substring(0, time.indexOf(':'));
      var sec = time.substring(time.indexOf(':') + 1);

      totalMin += parseInt(min);
      totalSec += parseInt(sec);
  }

  console.log(totalMin + (Math.round(totalSec / 60)) + " minutes");
}
