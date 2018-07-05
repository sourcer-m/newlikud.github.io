function getWebFormId(fieldName) {
  return "web_form_" + fieldName;
}

function initializePads() {
  var webFormCanvases = document.getElementsByClassName('web-form-canvas');
  Array.from(webFormCanvases).forEach((c) => {
    var signaturePad = new SignaturePad(c, {
        minWidth: .01,
        maxWidth: .8,
        penColor: penColor
    });
    // signaturePad.init();
  })
}

function buildInputField(f) {
  var fId = getWebFormId(f.name);
  var input = null;
  if (f.type === "input") {
    input = '<input type="text" class="form-control" id="' + fId + '" aria-describedby="emailHelp" placeholder="">';
      //<small id="emailHelp" class="form-text text-muted">הערה לגבי השדה הנ״ל</small>
  } else if (f.type === "signature") {
    let style = "border:1px dashed #cccccc; background: url('register-to-likud.png'); background-size: 1140px 2052.34px; background-position: -" + f.x + "px -" + f.y + "px";
    input =  `<br/><canvas class="field-form web-form-canvas" id="` + fId + `" width="` + f.width + `" height="` + f.size + `" style="` + style + `"></canvas>`;
  }
  return `<div class="form-group">
        <label for="` + fId + `">` + f.heb + `</label>
        ` + input + `
      </div>`;
}

function buildWebForm() {
  var html = '';
  fields.forEach((field) => {
    html += buildInputField(field);
  });
  html += '<button type="button" class="btn btn-default navbar-btn btn-primary" id="save-button">שלח</button>';
  document.getElementById("web-form").innerHTML = html;

  initializePads();
}

function fillCanvasForm() {
  fields.forEach((f) => {
    var wfID = getWebFormId(f.name);
    console.log(wfID, f.name)
    if (f.type === "input") {
      document.getElementById(f.name).value = document.getElementById(wfID).value;
    } else if (f.type === "signature") {
      document.getElementById(f.name).getContext('2d').drawImage(document.getElementById(wfID), 0, 0);
    }
  });
}