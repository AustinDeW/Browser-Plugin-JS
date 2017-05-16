var taskMappings = document.getElementById('taskMapTableBody')
var taskMappingsCB = taskMappings.getElementsByTagName('input');
for(var i = 0; i < taskMappingsCB.length; i++)
	taskMappingsCB[i].checked = true;
