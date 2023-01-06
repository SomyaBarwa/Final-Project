const passwordForm = document.getElementById('password-form');

passwordForm.addEventListener('submit', function(event) {
  event.preventDefault(); // prevent the form from reloading the page

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const description = document.getElementById('description').value;

  // store the password in the browser's local storage
  localStorage.setItem(username, JSON.stringify({
    password: password,
    description: description
  }));

  alert('Password saved successfully');
});



const retrieveForm = document.getElementById('retrieve-form');

retrieveForm.addEventListener('submit', function(event) {
  event.preventDefault(); // prevent the form from reloading the page

  const username = document.getElementById('retrieve-username').value;

  // retrieve the saved password from the browser's local storage
  const passwordObject = JSON.parse(localStorage.getItem(username));
  if (!passwordObject) {
    alert('No password found for the given username');
    return;
  }

  alert(`Password: ${passwordObject.password}\nDescription: ${passwordObject.description}`);
});