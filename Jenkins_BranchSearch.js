var branchSearchInput, cstmSearchInput, foundBranches, branch, cstmBranch, foundCustoms;
var foundSearches = [];

JenkinsMain();

function JenkinsMain()
{
  // only will run on the build with parameters page of jenkins
  if(window.location.href.indexOf('build?') > -1)
  {
    JenkinsBranchSearch();
  }
}

function JenkinsBranchSearch()
{
  var p = document.evaluate('//*[@id="main-panel-content"]/p', document.body, null, XPathResult.ANY_TYPE, null).iterateNext();
  var searchDiv = document.createElement('div');
  searchDiv.innerHTML =  "<style>"
                      +    "#srchDiv { margin-left: 20%; }"
                      +    ".label, #resultsCountCust, #resultsCountBrnch { display: inline-block; }"
                      +    "#search { margin-left: 8%; }"
                      +    "#clear { margin-left: .5%; }"
                      +    "#resultsDiv { margin-left: .5%; }"
                      +    ".foundBranch, .foundCustom { display: none; }"
                      +    "#resultsCountCust, #resultsCountBrnch { margin-left: 2%; }"
                      +  "</style>"
                      +  "<div id='srchDiv'>"
                      +    "<p class='label'>Branch Search: " + AddSpacing(4) + "</p>"
                      +    "<input id='branch' type='text' />"
                      +    "<p id='resultsCountBrnch'></p>"
                      +    "<br />"
                      +    "<p class='label'>Custom Search: " + AddSpacing(3) + "</p>"
                      +    "<input id='cstm' type='text' />"
                      +    "<p id='resultsCountCust'></p>"
                      +    "<br /> <br />"
                      +    "<span id='search' class='yui-button yui-submit-button submit-button primary'>"
                      +     "<span class='first-child'>"
                      +       "<button type='button' id='searchBtn' onclick='Search()'>Search</button>"
                      +     "</span>"
                      +    "</span>"
                      +    "<span id='clear' class='yui-button yui-submit-button submit-button primary'>"
                      +     "<span class='first-child'>"
                      +       "<button type='button' id='clearBtn' onclick='Clear()'>Clear</button>"
                      +     "</span>"
                      +    "</span>"
                      +  "</div>"
                      +  "<br />"
                      //+  "<p id='resultsCount'>Search Found: </p>"
                      +  "<div id='resultsDiv'>"
                      +    "<p class='label foundBranch'>Found Branches: " + AddSpacing(1) + "</p>"
                      +    "<select class='foundBranch' id='foundBranches' onchange='BranchList_Change(this)'></select>"
                      +    "<br />"
                      +    "<p class='label foundCustom'>Found Customs: " + AddSpacing(2) + "</p>"
                      +    "<select class='foundCustom' id='foundCustoms' onchange='CustomsList_OnChange(this)'></select>"
                      +  "</div><br /><br />";
  p.parentNode.insertBefore(searchDiv,p.nextSibling);

  branchSearchInput = document.getElementById('branch');
  branchSearchInput.focus();
  cstmSearchInput = document.getElementById('cstm');
  foundBranches = document.getElementById('foundBranches');
  foundCustoms = document.getElementById('foundCustoms');

  AddEventListeners();
}

function Search()
{
    branch = document.getElementsByTagName('select')[2];
    cstmBranch = document.getElementsByTagName('select')[3];

    // Sets background of previously found searches back to white
    if(foundSearches.length > 0)
      for(var i = 0; i < foundSearches.length; i++)
        foundSearches[i].style.backgroundColor = 'white';

    if(branchSearchInput.value.length > 0)
      SearchForBranch(branch, branchSearchInput.value, foundBranches, "resultsCountBrnch");

    if(cstmSearchInput.value.length > 0)
      SearchForBranch(cstmBranch, cstmSearchInput.value, foundCustoms, "resultsCountCust");
    else
        cstmBranch.selectedIndex = 3;

    if(foundBranches.length > 2)
      DisplayElement('foundBranch', 'inline-block');
    if(foundCustoms.length > 2)
      DisplayElement('foundCustom', 'inline-block');
}

//TODO: Maybe need to make logic better
// creates a secondary list of branches due to suspicions that jenkins builds branches by index of their list
function SearchForBranch(select, searchItem, foundList, resultId)
{
    var count = 0;
    var branches = select.childNodes;
    var firstIndex = 0;
    var foundOptions = "<option value='n'> -- List of found branches -- </option>";
    for(var i = 0; i < branches.length; i++)
    {
        if(branches[i].text.toLowerCase().includes(searchItem.toLowerCase()))
        {
            branches[i].style.backgroundColor = 'orange';
            foundSearches[count++] = branches[i];
            firstIndex = i;

            foundOptions += "<option value='" + i + "'>" + branches[i].text + "</option>"
        }
    }

    // if there is only one result, it will auto select it
    if(count === 1)
        select.selectedIndex = firstIndex;

    document.getElementById(resultId).innerHTML = "<span style='color:red; font-weight: bold;'>" + count + "</span> <b>result(s)</b>";

    foundList.innerHTML = foundOptions;
}

function Clear()
{
  branchSearchInput.value = '';
  cstmSearchInput.value = '';
  foundBranches.innerHTML = '';
  foundCustoms.innerHTML = '';
  branch.selectedIndex = 0;
  cstmBranch.selectedIndex = 3;
  document.getElementById('resultsCountBrnch').innerHTML = "";
  document.getElementById('resultsCountCust').innerHTML = "";
  DisplayElement('foundBranch', 'none');
  DisplayElement('foundCustom', 'none');
  branchSearchInput.focus();
}

// Returns a string of 'spaces'
function AddSpacing(spaces)
{
    var spacing = "";

    for(var i = 0; i < spaces; i++)
        spacing += "&nbsp;";

    return spacing;
}

function DisplayElement(cl, display)
{
  var elsToDisplay = document.getElementsByClassName(cl);
  for(var i = 0; i < elsToDisplay.length; i++)
    elsToDisplay[i].style.display = display;
}

function AddEventListeners()
{
  branchSearchInput.addEventListener('keyup', BranchSearchEventListener);
  cstmSearchInput.addEventListener('keyup', BranchSearchEventListener);
  window.addEventListener('keyup', BranchSearchEventListener);
}

function BranchSearchEventListener(key)
{
  switch(key.code)
  {
    case "Enter":
      document.getElementById('searchBtn').click();
      break;
    case "Escape":
      document.getElementById('clearBtn').click();
      break;
  }
}

function BranchList_Change(list)
{
  branch.selectedIndex = list.value;
}

function CustomsList_OnChange(list)
{
  cstmBranch.selectedIndex = list.value;
}
