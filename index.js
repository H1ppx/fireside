document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu');
    const sideMenu = document.getElementById('side-menu');
    const backdrop = document.getElementById('backdrop');
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const chatContainer = document.getElementById('chat-container');
    const connectBtn = document.getElementById('connect-btn');
    const statusLabel = document.getElementById('status');
    const sideMenuContent = document.getElementById('side-menu-content');
  
    function toggleMenu() {
        const isOpen = sideMenu.classList.toggle('open');
        backdrop.classList.toggle('visible', isOpen);
    }
  
    menuButton.addEventListener('click', toggleMenu);
    backdrop.addEventListener('click', () => {
        sideMenu.classList.remove('open');
        backdrop.classList.remove('visible');
    });
  
    function appendMessage(text, type = 'sent') {
        const msg = document.createElement('div');
        msg.className = `message ${type}`;
        msg.textContent = text;
        chatContainer.appendChild(msg);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    sendBtn.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (text) {
            appendMessage(text, 'sent');
            chatInput.value = '';

            // Simulate a reply after 1 second
            setTimeout(() => {
                appendMessage('Received: ' + text, 'received');
            }, 1000);
        }
    });

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !chatInput.disabled) {
          sendBtn.click();
        }
      });
      

    connectBtn.addEventListener('click', () => {
        const ip = document.getElementById('ip-input')?.value.trim();
        const port = document.getElementById('port-input')?.value.trim();
        const isConnected = connectBtn.dataset.connected === "true";
  
        if (isConnected) {
            // Disconnect logic
            connectBtn.textContent = 'Connect';
            connectBtn.style.backgroundColor = '#28a745';
            connectBtn.dataset.connected = "false";
            statusLabel.textContent = 'Disconnected';
            statusLabel.style.color = '#f44336';

            // Disable chat input and send button
            document.getElementById('chat-input').disabled = true;
            document.getElementById('send-btn').disabled = true;
  
            sideMenuContent.innerHTML = `
                <div class="form-container">
                    <label for="ip-input">IP Address</label>
                    <input type="text" id="ip-input" placeholder="e.g. 192.168.0.10">
                    <button id="connect-btn" data-connected="false">Connect</button>
                </div>
            `;
            // Reattach click event after dynamic content update
            reattachConnectBtn();
        } else {
            if (ip) {
                // Connect logic
                connectBtn.textContent = 'Disconnect';
                connectBtn.style.backgroundColor = '#dc3545';
                connectBtn.dataset.connected = "true";
                statusLabel.textContent = 'Connected';
                statusLabel.style.color = '#5df29c';
  
                // Enable chat input and send button
                document.getElementById('chat-input').disabled = false;
                document.getElementById('send-btn').disabled = false;
    
                sideMenuContent.innerHTML = `
                    <label for="runtime-info" class="runtime-label">
                        Runtime Info:
                        <div class="runtime-style" id="runtime-info">
                            IP Address: ${ip}<br>
                            Your IP: 192.168.0.25<br>
                            Uptime: 2h 14m
                        </div>
                    </label>
                    <button id="disconnect-btn">Disconnect</button>
                `;
  
                // Reattach disconnect button event after dynamic content update
                document.getElementById('disconnect-btn').addEventListener('click', () => connectBtn.click());
            } else {
                // Only show the alert if the IP address is missing
                showCustomAlert("IP address is required to connect.");
            }
        }
    });

    // Function to reattach connect button event after dynamic HTML update
    function reattachConnectBtn() {
        const connectButton = document.getElementById('connect-btn');
        if (connectButton) {
            connectButton.addEventListener('click', () => connectBtn.click());
        }
    }

    // Custom Alert Functions
    function showCustomAlert(message) {
        const alertBox = document.getElementById('custom-alert');
        const alertMsg = document.getElementById('alert-message');
        alertMsg.textContent = message;
        alertBox.classList.remove('hidden');
        // Prevent input from breaking while alert is shown
        setTimeout(() => {
            document.getElementById('chat-input').disabled = false;
        }, 300);
    }

    document.getElementById('alert-close').addEventListener('click', () => {
        document.getElementById('custom-alert').classList.add('hidden');
        // Enable the input field again after closing the alert
        chatInput.disabled = false;
    });
});
