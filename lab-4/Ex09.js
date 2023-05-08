function checkAll(checked) {
  var checkboxes = document.getElementsByTagName('input');
  for (let index = 0; index < checkboxes.length; index++) {
    checkboxes[index].checked = checked;
  }
}