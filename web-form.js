function getWebFormId(fieldName) {
  return "web_form_" + fieldName;
}

function initializePads() {
  let webFormCanvases = document.getElementsByClassName('web-form-canvas');
  Array.from(webFormCanvases).forEach((c) => {
    var signaturePad = new SignaturePad(c, {
        minWidth: .01,
        maxWidth: .8,
        penColor: penColor,
        onEnd: function() {
          markAsValid(c, (!c.pad.isEmpty()));
        }
    });
    let clearBtn = document.querySelector("input[data-target='" + c.id + "']");
    c.pad = signaturePad;
    clearBtn.pad = signaturePad;
    clearBtn.onclick = () => {
      clearBtn.pad.clear();
    }
  });
}

function buildInputField(f, index) {
  let fId = getWebFormId(f.name);
  let input = null;
  if (f.type === "input") {
    let tabindex = index;
    if (f.part === 'emailProvider') {
      tabindex += 1;
    } else if (f.part === 'emailUsername') {
      tabindex -= 1;
    }
    input = '<input type="text" class="form-control" id="' + fId + '" placeholder="" tabindex="' + tabindex + '">';
      //<small id="emailHelp" class="form-text text-muted">הערה לגבי השדה הנ״ל</small>
  } else if (f.type === "signature") {
    let style = "border:1px dashed #cccccc; background: url('register-to-likud.png'); background-size: 1140px 2052.34px; background-position: -" + f.x + "px -" + f.y + "px";
    input =  `<canvas class="field-form web-form-canvas" id="` + fId + `" width="` + f.width + `" height="` + f.size + `" style="` + style + `"></canvas>`;
    input += '<input type="button" class="btn btn-warning btn-sm" value="X" data-target="' + fId + '"/>';
  }
  if (f.part === 'emailProvider') {
    return `<div class="form-group row ` + (f.doubleFormOnly?"double-form-only":"") + `">
    <label for="` + fId + `" class="col-xs-11 col-sm-3 col-form-label">` + f.heb + (f.allowEmpty?"":" <font color=red>*</font>") + `</label>
        <div class="col-xs-11 col-sm-8">
          <div class="input-group">
            ` + input + `
            <span class="input-group-addon" id="basic-addon1">@</span>`;
  }
  if (f.part === 'emailUsername') {
    return input + `
          </div>
          <span class="help-block">נא להזין ` + f.heb + `</span>
        </div>
      </div>`;
  }
  return `<div class="form-group row ` + (f.doubleFormOnly?"double-form-only":"") + `">
        <label for="` + fId + `" class="col-xs-3 col-form-label">` + f.heb + (f.allowEmpty?"":" <font color=red>*</font>") + `</label>
        <div class="col-xs-8 align-middle">
          ` + input + `
          <span class="help-block">נא להזין ` + f.heb + `</span>
        </div>
      </div>`;
}

function initializeDoubleForm() {
  Array.from(document.getElementsByName('double-form-radio')).forEach((radio) => {
    radio.onclick = function () {
      Array.from(document.querySelectorAll(".double-form-only")).forEach((c) => {
        c.style.display = (document.getElementsByName('double-form-radio')[1].checked)?"block":"none";
      });
    }
  });
}

function isEmpty(field, element) {
  if (field.type === 'input') {
    return (!element.value);
  } else if (field.type === 'signature') {
    return (element.pad.isEmpty());
  }
}

function buildWebForm() {
  let html = '<font color=red>*</font>שדות חובה';
  fields.forEach((field, index) => {
    if (field.hasOwnProperty('autoField')) {
      return;
    }
    if (field.title) {
      html += '<h2 class="' + (field.doubleFormOnly?"double-form-only":"") + '">' + field.title + '</h2>';
    }
    html += buildInputField(field, index);
  });
  html += `<div class="form-group row"><div class="col-xs-8">
    <button type="button" class="btn btn-default navbar-btn btn-primary" id="save-button">שלח</button>
  </div></div>`;
  document.getElementById("web-form").innerHTML = html;

  initializePads();
  initializeDoubleForm();
  initializeValidation();
}

function fillCanvasForm() {
  fields.forEach((f) => {
    let wfID = getWebFormId(f.name);
    console.log(wfID, f.name)
    if (f.autoField) {
      document.getElementById(f.name).value = f.autoField;
    } else if (f.type === "input") {
      document.getElementById(f.name).value = document.getElementById(wfID).value;
    } else if (f.type === "signature") {
      document.getElementById(f.name).getContext('2d').drawImage(document.getElementById(wfID), 0, 0);
    }
  });
}

function cursorFocus(elem) {
  var x = window.scrollX, y = window.scrollY;
  window.scrollTo(x, y);
  elem.focus();
}


