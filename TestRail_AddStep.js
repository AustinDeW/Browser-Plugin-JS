var REVIEW_BY = 'Austin DeWitt';

Main();

function Main() {
    if(window.location.href.indexOf('cases/add') > -1 ||
       window.location.href.indexOf('cases/edit') > -1) {
           document.addEventListener('keyup', function(key) {
              switch(key.code) {
                  case 'AltRight':
                      ApproveTC();
                      break;
              }
           });
       }
}

function ApproveTC() {
  document.getElementById('title').value = document.getElementById('title').value.replace('#', '');
  document.getElementById('custom_review_pass').value = GetDateString();

  var reviewByList = document.getElementById('custom_revby').options;
  var reviewByIndex = 0;
  for(var i = 0; i < reviewByList.length; i++) {
      if(reviewByList[i].innerHTML === REVIEW_BY) {
          reviewByIndex = i;
          break;
      }
  }
  document.getElementById('custom_revby').selectedIndex = reviewByIndex;
  document.getElementById('accept').click();
}

function GetDateString() {
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    return month + '/' + day + '/' + year;
}




// var addStep = document.getElementsByClassName('addStep')[0];
// var textAreas;
//
// TestRailMain();
//
// function TestRailMain()
// {
//     if(window.location.href.indexOf('cases/add') > -1 ||
//        window.location.href.indexOf('cases/edit') > -1)
//     {
//         AddStep();
//         document.addEventListener('keyup', function(key)
//         {
//           switch(key.code)
//           {
//             case 'AltRight':
//               SwitchTemplate();
//             break;
//           }
//         });
//     }
//
//     document.addEventListener('keyup',AddKeyUpListeners);
// }
//
// function AddStep()
// {
//     Reset(0);
//     //BoldWords();
// }
//
// function SwitchTemplate()
// {
//   var given = document.getElementsByTagName('textarea')[0].innerHTML;
//   var when = document.getElementsByTagName('textarea')[1].innerHTML;
//   var then = document.getElementsByTagName('textarea')[2].innerHTML;
//
//   var templateField = document.getElementById('template_id');
//   templateField.addEventListener('change', function()
//   {
//       setTimeout(function()
//       {
//           document.getElementsByTagName('textarea')[0].innerHTML = given === "" ? "**GIVEN**" : given;
//           document.getElementsByTagName('textarea')[1].innerHTML = when === "" ? "**WHEN**" : when;
//           document.getElementsByTagName('textarea')[2].innerHTML = then === "" ? "**THEN**" : then;
//
//           var automationField = document.getElementById('custom_automated');
//           if(automationField.selectedIndex === 0)
//             automationField.selectedIndex = 1;
//
//       }, 2000);
//   });
//
//   // Fires event if the template is wrong
//   if(templateField.selectedIndex === 1)
//   {
//     templateField.selectedIndex = 0;
//
//     if ("createEvent" in document)
//     {
//         var evt = document.createEvent("HTMLEvents");
//         evt.initEvent("change", false, true);
//         templateField.dispatchEvent(evt);
//     }
//     else
//         templateField.fireEvent("onchange");
//   }
// }
//
// function Reset(startIndex)
// {
//     textAreas = document.getElementsByTagName('textarea');
//
//     for(var i = startIndex; i < textAreas.length; i++)
//         textAreas[i].addEventListener('keyup', Reset_EventHandler);
// }
//
// function Reset_EventHandler(key)
// {
//   if(key.code === "AltLeft")
//   {
//     addStep.click();
//
//     // takes a sec to load new text area
//     // so the timeout gives it enough time
//     setTimeout(function(){
//         Reset(textAreas.length - 3);
//         console.log(textAreas.length);
//     }, 1000);
//   }
// }
//
// //TODO: Try to add functionality for alt + [ key ]
// function AddKeyUpListeners(key)
// {
//   switch(key.code)
//   {
//       case 'AltLeft':
//
//           var resultComment = document.getElementById('addResultComment');
//           if(resultComment !== null)
//           {
//             resultComment.value = (
//                       "Environment: "
//                     + "\nBrowsers: "
//                     + "\nAccount: "
//                     + "\nEvent: "
//                     + "\n\nResult: I was able to successfully verify that"
//                 );
//           }
//           break;
//   }
// }
//
// // function BoldWords()
// // {
// //     for(var i = 0; i < 3; i++)
// //     {
// //         textAreas[i].addEventListener('input', BoldWords_EventHandler);
// //     }
// // }
// //
// // function BoldWords_EventHandler()
// // {
// //     var values = [ 'given ', 'when ', 'then ', 'and ', ];
// //
// //     for(var i = 0; i < values.length; i++)
// //     {
// //         var newWord = values[i] === 'and '
// //                       ? '\n**' + values[i].toUpperCase() + '** '
// //                       : '**' + values[i].toUpperCase() + '** ';
// //         this.value = this.value.replace(values[i] , newWord.replace(' ', ''));
// //         this.value = this.value.replace(values[i].toUpperCase(), newWord.replace(' ', ''));
// //     }
// // }
