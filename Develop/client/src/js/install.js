const butInstall = document.getElementById('buttonInstall');

// Event handler for 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (event) => {
  console.log('beforeinstallprompt event fired');
  // Prevent the default prompt
  event.preventDefault();
  // Store the event for later use
  window.deferredPrompt = event;
  // Show the install button
  butInstall.style.display = 'block';
});

// Click event handler for the install button
butInstall.addEventListener('click', async () => {
  console.log('Install button clicked');
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }
  // Show the browser's install prompt
  promptEvent.prompt();
  // Wait for the user to respond to the prompt
  const choiceResult = await promptEvent.userChoice;
  console.log('User choice:', choiceResult);
  // Hide the install button
  butInstall.style.display = 'none';
  // Reset the deferredPrompt variable
  window.deferredPrompt = null;
});

// Event handler for 'appinstalled' event
window.addEventListener('appinstalled', (event) => {
  console.log('App installed successfully');
  // Hide the install button
  butInstall.style.display = 'none';
});
