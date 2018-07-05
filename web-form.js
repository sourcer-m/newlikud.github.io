function getWebFormId(fieldName) {
  return "web_form_" + fieldName;
}

var POSSIBLE_PENS = ["rgb(66, 133, 244)", "rgb(0, 0, 0)"];
var penColor = POSSIBLE_PENS[Math.floor(Math.random() * POSSIBLE_PENS.length)];

function initializePads() {
  var webFormCanvases = document.getElementsByClassName('web-form-canvas');
  Array.from(webFormCanvases).forEach((c) => {
    var signaturePad = new SignaturePad(c, {
        minWidth: .1,
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
    input =  `<canvas class="field-form web-form-canvas" id="` + fId + `" width="` + f.width + `" height="` + f.size + `"></canvas>`;
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