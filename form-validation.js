function markAsValid(element, valid) {
  if (!element) {
    return;
  }
  let rootElement = element.parentElement.parentElement
  if (valid) {
    rootElement.classList.remove("has-error");
  } else {
    rootElement.classList.add("has-error");
  }
  Array.from(rootElement.getElementsByClassName("help-block")).forEach((e) => {
    e.style.display = valid?'none':'block';
  });
}

function validateForm() {
  let invalidElement = null;

  fields.forEach((f) => {
    if (f.autoField || f.allowEmpty)
      return;

    if (f.doubleFormOnly && document.getElementsByName('double-form-radio')[0].checked) {
      return;
    }
    
    let wfID = getWebFormId(f.name);
    let element = document.getElementById(wfID);
    if (isEmpty(f, element)) {
      if (!invalidElement) {
        invalidElement = element;
      }
      markAsValid(element, false);
    }
  });

  if (invalidElement) {
    cursorFocus(invalidElement);
  }

  return (!invalidElement);
}

function initializeValidation() {
  fields.forEach((f) => {
    if (f.autoField || f.allowEmpty || f.partOfDate)
      return;
    
    let wfID = getWebFormId(f.name);
    let element = document.getElementById(wfID);

    element.oninput = function() {
      markAsValid(element, !isEmpty(f, element));
    };
    element.onpropertychange = element.oninput;
    element.onblur = element.oninput;
  });
}