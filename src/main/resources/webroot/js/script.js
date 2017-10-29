document.addEventListener('DOMContentLoaded', function () {

  var predicates = [];

  function setArgumentsHelpMessage(message) {
    var argumentsHelpMessage = document.getElementById('arguments-help-message');
    var argumentsHelpMessageBody = document.getElementById('arguments-help-message-body');
    if (message !== '') {
      argumentsHelpMessage.classList.remove("is-hidden");
      argumentsHelpMessageBody.innerHTML = message;
    } else {
      argumentsHelpMessage.classList.push("is-hidden");
      argumentsHelpMessageBody.innerHTML = '';
    }
  }

  function addPredicateToTable(predicate)  {
    var predicatesTable = document.getElementById('predicates-table');
    var newLine = predicatesTable.insertRow();
    newLine.insertCell(0).appendChild(document.createTextNode(predicate.typeText));
    newLine.insertCell(1).appendChild(document.createTextNode(predicate.arguments));
  }

  function addPredicate(event) {
    event.preventDefault();
    var argumentsInput = document.getElementById('predicate-arguments-input');
    var predicateTypeSelect = document.getElementById('predicate-type-select');
    var predicateType = predicateTypeSelect.options[predicateTypeSelect.selectedIndex].value;
    var predicateTypeText = predicateTypeSelect.options[predicateTypeSelect.selectedIndex].text;
    var predicateArguments = argumentsInput.value;
    var predicate = {type: predicateType, typeText: predicateTypeText, arguments: predicateArguments};
    console.log('Add predicate', predicate);
    addPredicateToTable(predicate);
    predicates.push(predicate);
    document.getElementById('predicate-form').reset();
  }

  function saveRule(rule) {
    // TODO: save rule!
  }

  function addRule(event) {
    event.preventDefault();
    var ruleActionInput = document.getElementById('rule-action-name-input');
    var ruleAction = ruleActionInput.value;
    var rule = {action: ruleAction, predicates: predicates};
    saveRule(rule);
    document.getElementById('rule-form').reset();
  }

  var addPredicateButton = document.getElementById('predicate-add-button');
  addPredicateButton.onclick = addPredicate;

  var addRuleButton = document.getElementById('rule-add-button');
  addRuleButton.onclick = addRule;

  var predicateTypeSelect = document.getElementById('predicate-type-select');
  predicateTypeSelect.addEventListener("change", function (event) {
    if (event.target.value === 'equals') {
      setArgumentsHelpMessage('Takes a key used to get the value in the event and a value.<br/>For example, if the service value must be equals to "cpu", you should use:<br/>service,cpu');
    } else if (event.target.value === 'regex') {
      setArgumentsHelpMessage('Takes a key used to get the value in the event and a regex.<br/>For example, if the service value must start with "cpu_", you should use:<br/>service,^cpu_');
    } else if (event.target.value === 'greater') {
      setArgumentsHelpMessage('Takes a key used to get the value in the event and a value.<br/>For example, if the metric value must be greater than 80, you should use:<br/>metric,80');
    } else if (event.target.value === 'lower') {
      setArgumentsHelpMessage('Takes a key used to get the value in the event and a value.<br/>For example, if the metric value must be lower than 10, you should use:<br/>metric,10');
    } else if (event.target.value === 'above') {
      setArgumentsHelpMessage('Takes a number threshold and a time period in seconds dt.');
    } else if (event.target.value === 'below') {
      setArgumentsHelpMessage('Takes a number threshold and a time period in seconds dt.');
    } else if (event.target.value === 'between') {
      setArgumentsHelpMessage('Takes two numbers, low and high, and a time period in seconds, dt.');
    } else if (event.target.value === 'outside') {
      setArgumentsHelpMessage('Takes two numbers, low and high, and a time period in seconds, dt.');
    } else if (event.target.value === 'critical') {
      setArgumentsHelpMessage('Takes a time period in seconds dt.');
    } else {
      setArgumentsHelpMessage('');
    }
  });
}, false);


