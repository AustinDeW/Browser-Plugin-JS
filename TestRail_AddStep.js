var addStep = document.getElementsByClassName('addStep')[0];
var textAreas;

function AddStep()
{
    Reset(0);
    BoldWords();
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

function BoldWords()
{
    for(var i = 0; i < 3; i++)
    {
        textAreas[i].addEventListener('input', BoldWords_EventHandler);
    }
}

function BoldWords_EventHandler()
{
    var values = [ 'given ', 'when ', 'then ', 'and ', ];

    for(var i = 0; i < values.length; i++)
    {
        var newWord = values[i] === 'and '
                      ? '\n**' + values[i].toUpperCase() + '** '
                      : '**' + values[i].toUpperCase() + '** ';
        this.value = this.value.replace(values[i] , newWord.replace(' ', ''));
        this.value = this.value.replace(values[i].toUpperCase(), newWord.replace(' ', ''));
    }
}

function AddKeyUpListeners(key)
{
    var resultModal = document.getElementsByClassName('ui-draggable')[0];
    if(resultModal !== null)
    {
        switch(key.code)
        {
            case 'AltLeft':
                document.getElementById('addResultComment').value = (
                          "Event: "
                        + "\nBrowsers: "
                        + "\nAccount: "
                        + "\nEvent: "
                        + "\n\nResult: I was able to successfully verify that"
                    );
                break;
        }
    }
}

function TestRailMain()
{
    if(window.location.href.indexOf('cases/add') > -1 ||
       window.location.href.indexOf('cases/edit') > -1)
    {
        AddStep();
    }

    document.addEventListener('keyup',AddKeyUpListeners);
}

TestRailMain();