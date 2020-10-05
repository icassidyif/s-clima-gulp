// Materialize initializations
function initMaterializeSelect() {
  let selectElements = document.querySelectorAll('select');
  let selectInstances = M.FormSelect.init(selectElements);
}

let modals = document.querySelectorAll('.modal');
const modalInstance = M.Modal.init(modals, {
  dismissible: true,
  opacity: .4,
  startingTop: '-10%',
  endingTop: '5%',
  inDuration: 350,
  outDuration: 350
});
//modalInstance.open();

initMaterializeSelect();

//
// const selectList = document.querySelector('form select');
// console.log(selectList);
// let sddsd = M.FormSelect.getInstance(selectList).getSelectedValues();
// console.log(sddsd);