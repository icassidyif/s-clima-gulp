// Materialize initializations
let selectElements = document.querySelectorAll('select');
let selectInstances = M.FormSelect.init(selectElements);
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