const MESSAGE_SELECTOR = 'textarea';
const SEND_BUTTON_SELECTOR = 'button[type="button"]'; // Make sure the button matches...

function checkMessageAndToggleSend(messageElement, sendButton) {
  const text = messageElement.value;
  const hasLiveaLink = text.includes('livea.fr');

  if (hasLiveaLink) {
    sendButton.disabled = true;
    sendButton.style.opacity = '0.5';
    sendButton.title = "L'envoi est désactivé : veuillez retirer les liens commençant par livea.fr.";
  } else {
    sendButton.disabled = false;
    sendButton.style.opacity = '1';
    sendButton.title = "";
  }
}

function init() {
  const messageElement = document.querySelector(MESSAGE_SELECTOR);
  const sendButton = document.querySelector(SEND_BUTTON_SELECTOR);

  if (!messageElement || !sendButton) {
    console.log('Could not find message input or send button. Retrying...');
    setTimeout(init, 1000);
    return;
  }

  checkMessageAndToggleSend(messageElement, sendButton);

  messageElement.addEventListener('input', () => {
    checkMessageAndToggleSend(messageElement, sendButton);
  });
}

window.addEventListener('load', init);
