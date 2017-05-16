var branchSearchInput;
var cstmSearchInput;
var foundSearches = [];

//TODO: Maybe need to make logic better
function SearchForBranch(select, searchItem)
{
    var count = 0;
    var branches = select.childNodes;
    var firstIndex = 0;
    for(var i = 0; i < branches.length; i++)
    {
        if(branches[i].text.toLowerCase().includes(searchItem.toLowerCase()))
        {
            branches[i].style.backgroundColor = 'orange';
            foundSearches[count++] = branches[i];
            firstIndex = i;
        }
    }

    if(count === 1)
        select.selectedIndex = firstIndex;

    document.getElementById('results')
            .innerHTML = "Search Found: <span style='color:red; font-weight: bold;'>" + AddSpacing(6) + count + " result(s)</span>";
}

function JenkinsBranchSearch()
{
  var p = document.evaluate('//*[@id="main-panel-content"]/p', document.body, null, XPathResult.ANY_TYPE, null).iterateNext();
  var searchDiv = document.createElement('div');
  searchDiv.innerHTML =  "<style>"
                      +    "#srchDiv, #results { margin-left: 20%; }"
                      +    ".label { display: inline-block; }"
                      +    "#search { margin-left: 8%; }"
                      +    "#clear { margin-left: 4%; }"
                      +  "</style>"
                      +  "<div id='srchDiv'>"
                      +    "<p class='label'>Branch Search: " + AddSpacing(4) + "</p>"
                      +    "<input id='branch' type='text' />"
                      +    "<br />"
                      +    "<p class='label'>Custom Search: " + AddSpacing(3) + "</p>"
                      +    "<input id='cstm' type='text' />"
                      +    "<br /> <br />"
                      +    "<button id='search' onclick='Search()'>Search</button>"
                      +    "<button id='clear' onclick='Clear()'>Clear</button>"
                      +  "</div>"
                      +  "<br />"
                      +  "<p id='results'>Search Found: </p>";
  p.parentNode.insertBefore(searchDiv,p.nextSibling);

  branchSearchInput = document.getElementById('branch');
  branchSearchInput.focus();
  cstmSearchInput = document.getElementById('cstm');
}

function Search()
{
    var branch = document.getElementsByTagName('select')[0];
    var cstmBranch = document.getElementsByTagName('select')[1];

    // Sets background of previously found searches back to white
    if(foundSearches.length > 0)
      for(var i = 0; i < foundSearches.length; i++)
        foundSearches[i].style.backgroundColor = 'white';

    if(branchSearchInput.value.length > 0)
      SearchForBranch(branch, branchSearchInput.value);

    if(cstmSearchInput.value.length > 0)
      SearchForBranch(cstmBranch, cstmSearchInput.value);
    else
        cstmBranch.selectedIndex = 3;
}

function Clear()
{
  branchSearchInput.value = '';
  cstmSearchInput.value = '';
}

// Returns a string of 'spaces'
function AddSpacing(spaces)
{
    var spacing = "";

    for(var i = 0; i < spaces; i++)
        spacing += "&nbsp;";

    return spacing;
}

function JenkinsMain()
{
  if(window.location.href.indexOf('build?') > -1)
  {
    JenkinsBranchSearch();
  }
}

JenkinsMain();
