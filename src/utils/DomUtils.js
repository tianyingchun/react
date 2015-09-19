class DomUtil {

  static getSelectText(el) {
    return typeof el.selectionStart == 'number' ? el.value.substring(el.selectionStart, el.selectionEnd) : document.selection.createRange().text;
  }

}
