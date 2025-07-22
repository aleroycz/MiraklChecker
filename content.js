const MESSAGE_SELECTOR = 'textarea';
const SEND_BUTTON_SELECTOR = 'button[type="button"]';

function checkMessageAndToggleSend(messageElement, sendButton, spanInside) {
  const text = messageElement.value;
  const hasLiveaLink = text.includes('livea.fr');

  if (hasLiveaLink) {
    sendButton.disabled = true;
    sendButton.style.opacity = '0.5';
    sendButton.title = "L'envoi est désactivé : veuillez retirer les liens commençant par livea.fr.";
    if (spanInside) spanInside.classList.add('disabled');
  } else {
    sendButton.disabled = false;
    sendButton.style.opacity = '1';
    sendButton.title = "";
    if (spanInside) spanInside.classList.remove('disabled');
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

  const spanInside = sendButton.querySelector('span');

  checkMessageAndToggleSend(messageElement, sendButton, spanInside);

  messageElement.addEventListener('input', () => {
    checkMessageAndToggleSend(messageElement, sendButton, spanInside);
  });

  if (spanInside) {
    spanInside.addEventListener('click', (e) => {
      if (sendButton.disabled) {
        e.stopPropagation();
        e.preventDefault();
        console.log('Send button is disabled. Click on span blocked.');
      }
    });
  }
}

window.addEventListener('load', init);