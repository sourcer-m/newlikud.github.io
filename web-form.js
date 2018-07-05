function getWebFormId(fieldName) {
  return "web_form_" + fieldName;
}

function initializePads() {
  let webFormCanvases = document.getElementsByClassName('web-form-canvas');
  Array.from(webFormCanvases).forEach((c) => {
    var signaturePad = new SignaturePad(c, {
        minWidth: .01,
        maxWidth: .8,
        penColor: penColor
    });
    let clearBtn = document.querySelector("input[data-target='" + c.id + "']");
    clearBtn.pad = signaturePad;
    clearBtn.onclick = () => {
      clearBtn.pad.clear();
    }
  });
}

function buildInputField(f) {
  let fId = getWebFormId(f.name);
  let input = null;
  if (f.type === "input") {
    input = '<input type="text" class="form-control" id="' + fId + '" aria-describedby="emailHelp" placeholder="">';
      //<small id="emailHelp" class="form-text text-muted">הערה לגבי השדה הנ״ל</small>
  } else if (f.type === "signature") {
    let style = "border:1px dashed #cccccc; background: url('register-to-likud.png'); background-size: 1140px 2052.34px; background-position: -" + f.x + "px -" + f.y + "px";
    input =  `<canvas class="field-form web-form-canvas" id="` + fId + `" width="` + f.width + `" height="` + f.size + `" style="` + style + `"></canvas>`;
    input += '<input type="button" class="btn btn-warning btn-sm" value="X" data-target="' + fId + '"/>';
  }
  return `<div class="form-group row">
        <div class="col-xs-8 align-middle">
          ` + input + `
        </div>
        <label for="` + fId + `" class="col-xs-3 col-form-label">` + f.heb + `</label>
      </div>`;
}

function buildWebForm() {
  let html = '';
  fields.forEach((field) => {
    html += buildInputField(field);
  });
  html += '<button type="button" class="btn btn-default navbar-btn btn-primary" id="save-button">שלח</button>';
  document.getElementById("web-form").innerHTML = html;

  initializePads();
}

function fillCanvasForm() {
  fields.forEach((f) => {
    let wfID = getWebFormId(f.name);
    console.log(wfID, f.name)
    if (f.type === "input") {
      document.getElementById(f.name).value = document.getElementById(wfID).value;
    } else if (f.type === "signature") {
      document.getElementById(f.name).getContext('2d').drawImage(document.getElementById(wfID), 0, 0);
    }
  });
}