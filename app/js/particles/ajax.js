// form send process
const ajaxSend = (formData, url) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      if(data === 'true'){
        showPopupSuccess();
      }else {
        showPopupError();
      }
    })
    .catch(error => {
      console.error(error);
    })
};
// end