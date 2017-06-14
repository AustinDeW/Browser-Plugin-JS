var addStep = document.getElementsByClassName('addStep')[0];
var textAreas;

TestRailMain();

function TestRailMain()
{
    if(window.location.href.indexOf('cases/add') > -1 ||
       window.location.href.indexOf('cases/edit') > -1)
    {
        AddStep();
        SwitchTemplate();
    }

    document.addEventListener('keyup',AddKeyUpListeners);
}

function AddStep()
{
    Reset(0);
    //BoldWords();
}

function SwitchTemplate()
{
  var given = document.getElementsByTagName('textarea')[0].innerHTML;
  var when = document.getElementsByTagName('textarea')[1].innerHTML;
  var then = document.getElementsByTagName('textarea')[2].innerHTML;

  var selectList = document.getElementById('template_id');
  selectList.addEventListener('change', function()
  {
      setTimeout(function()
      {
          document.getElementsByTagName('textarea')[0].innerHTML = given === "" ? "..." : given;
          document.getElementsByTagName('textarea')[1].innerHTML = when === "" ? "..." : when;
          document.getElementsByTagName('textarea')[2].innerHTML = then === "" ? "..." : then;

      }, 2000);
  });
}

function Reset(startIndex)
{
    textAreas = document.getElementsByTagName('textarea');

    for(var i = startIndex; i < textAreas.length; i++)
    {
        textAreas[i].addEventListener('keyup', Reset_EventHandler);
    }
}

function Reset_EventHandler(key)
{
  if(key.code === "AltLeft")
  {
    addStep.click();

    // takes a sec to load new text area
    // so the timeout gives it enough time
    setTimeout(function(){
        Reset(textAreas.length - 3);
        console.log(textAreas.length);
    }, 1000);
  }
}

//TODO: Try to add functionality for alt + [ key ]
function AddKeyUpListeners(key)
{
  switch(key.code)
  {
      case 'AltLeft':

          var resultComment = document.getElementById('addResultComment');
          if(resultComment !== null)
          {
            resultComment.value = (
                      "Environment: "
                    + "\nBrowsers: "
                    + "\nAccount: "
                    + "\nEvent: "
                    + "\n\nResult: I was able to successfully verify that"
                );
          }
          break;
  }
}

// function BoldWords()
// {
//     for(var i = 0; i < 3; i++)
//     {
//         textAreas[i].addEventListener('input', BoldWords_EventHandler);
//     }
// }
//
// function BoldWords_EventHandler()
// {
//     var values = [ 'given ', 'when ', 'then ', 'and ', ];
//
//     for(var i = 0; i < values.length; i++)
//     {
//         var newWord = values[i] === 'and '
//                       ? '\n**' + values[i].toUpperCase() + '** '
//                       : '**' + values[i].toUpperCase() + '** ';
//         this.value = this.value.replace(values[i] , newWord.replace(' ', ''));
//         this.value = this.value.replace(values[i].toUpperCase(), newWord.replace(' ', ''));
//     }
// }
