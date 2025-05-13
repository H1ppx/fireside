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
  
    sendBtn.addEventListener('click', () => {
      const text = chatInput.value.trim();
      if (text) {
        const msg = document.createElement('div');
        msg.className = 'message';
        msg.textContent = text;
        chatContainer.appendChild(msg);
        chatInput.value = '';
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    });
  
    connectBtn.addEventListener('click', () => {
      const ip = document.getElementById('ip-input')?.value.trim();
      const port = document.getElementById('port-input')?.value.trim();
      const isConnected = connectBtn.dataset.connected === "true";
  
      if (isConnected) {
        // Disconnect logic 192.168.0.25
                        //   Users Online: 3
                        //   Talk Group: Alpha
                        //   Uptime: 2h 14m
                        
        connectBtn.textContent = 'Connect';
        connectBtn.style.backgroundColor = '#28a745';
        connectBtn.dataset.connected = "false";
        statusLabel.textContent = 'Disconnected';
        statusLabel.style.color = '#f44336';
  
        sideMenuContent.innerHTML = `
          <div class="form-container">
            <label for="ip-input">IP Address</label>
            <input type="text" id="ip-input" placeholder="e.g. 192.168.0.10">
            <button id="connect-btn" data-connected="false">Connect</button>
          </div>
        `;
        document.getElementById('connect-btn').addEventListener('click', () => connectBtn.click());
      } else {
        if (ip) {
          // Connect logic
          connectBtn.textContent = 'Disconnect';
          connectBtn.style.backgroundColor = '#dc3545';
          connectBtn.dataset.connected = "true";
          statusLabel.textContent = 'Connected';
          statusLabel.style.color = '#5df29c';
  
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
  
          // Add disconnect button event
          document.getElementById('disconnect-btn').addEventListener('click', () => connectBtn.click());
        } else {
          alert('Please enter both IP');
        }
      }
    });
  });
  