Main();

function Main()
{
  AddTotalTimeElement();
}

function AddTotalTimeElement()
{
  var totalTime = document.createElement('div');
  totalTime.setAttribute('id', 'totalTimeWrapper')
  totalTime.innerHTML = "<style>"
                      +   "#totalTimeWrapper { display: inline-block; font-family: 'YouTube Noto',Roboto,arial,sans-serif; }"
                      + "</style>"
                      + "<div id='totalTime'>"
                      +   "<p>" + AddSpacing(2) + "Total Time: " + AddSpacing(2) + AddTime() + " minutes</p>"
                      + "</div>";

  document.getElementsByClassName('playlist-actions')[0].appendChild(totalTime);
}

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

  return (totalMin + (Math.round(totalSec / 60)));
}

function AddSpacing(spaces)
{
    var spacing = "";

    for(var i = 0; i < spaces; i++)
        spacing += "&nbsp;";

    return spacing;
}
