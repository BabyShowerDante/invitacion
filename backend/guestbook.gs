/**
 * Muro de amor — backend en Google Apps Script.
 *
 * Como instalarlo (una sola vez):
 *  1. Crear una planilla nueva en https://sheets.new
 *  2. Menu Extensiones > Apps Script. Borrar lo que haya y pegar TODO este archivo.
 *  3. Boton Implementar > Nueva implementacion > tipo "Aplicacion web".
 *       Ejecutar como:      Yo
 *       Quien tiene acceso: Cualquier persona
 *  4. Autorizar cuando lo pida y copiar la "URL de la aplicacion web"
 *     (termina en /exec). Esa URL va en src/lib/guestbook.ts.
 *
 * Cada confirmacion aparece como una fila en la hoja "Mensajes".
 * Para sacar un mensaje del muro alcanza con borrar su fila.
 */

var SHEET_NAME = 'Mensajes';
var MAX_NAME = 80;
var MAX_MESSAGE = 600;
var MAX_ROWS = 3000;

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['Fecha', 'Nombre', 'Mensaje', 'ID']);
    sh.setFrozenRows(1);
    sh.setColumnWidth(1, 150);
    sh.setColumnWidth(2, 200);
    sh.setColumnWidth(3, 480);
  }
  return sh;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/* Recorta y neutraliza textos que Sheets interpretaria como formula. */
function clean_(value, max) {
  var s = String(value == null ? '' : value).trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function doGet() {
  var rows = getSheet_().getDataRange().getValues().slice(1);
  var out = [];
  for (var i = rows.length - 1; i >= 0; i--) {
    var r = rows[i];
    if (!r[3] || !r[1]) continue;
    out.push({
      id: String(r[3]),
      name: String(r[1]),
      message: String(r[2]),
      createdAt: r[0] instanceof Date ? r[0].toISOString() : String(r[0])
    });
  }
  return json_(out);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var d = JSON.parse(e.postData.contents);
    var id = clean_(d.id, 60);
    var name = clean_(d.name, MAX_NAME);
    var message = clean_(d.message, MAX_MESSAGE);
    if (!id || !name || !message) return json_({ ok: false, error: 'incompleto' });

    var sh = getSheet_();
    var last = sh.getLastRow();
    if (last > MAX_ROWS) return json_({ ok: false, error: 'lleno' });
    if (last > 1) {
      var ids = sh.getRange(2, 4, last - 1, 1).getValues();
      for (var i = 0; i < ids.length; i++) {
        if (String(ids[i][0]) === id) return json_({ ok: true, duplicate: true });
      }
    }

    var when = new Date(d.createdAt);
    if (isNaN(when.getTime())) when = new Date();
    sh.appendRow([when, name, message, id]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
