        // Set current date in footer
        document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Enhanced security functions
        document.addEventListener("DOMContentLoaded", () => {
            const secureButton = document.getElementById("secureButton");
            const statusMessage = document.getElementById("statusMessage");
            const countdownElement = document.getElementById("countdown");
            const tamperModal = new bootstrap.Modal(document.getElementById('tamperModal'));
            let securityBreachAttempts = 0;
            let lastBreachTime = 0;
            
            // Initialize security systems
            initSecuritySystems();
            
            // Countdown Timer with random interval
            let countdown = getRandomInt(8, 12);
            setInterval(() => {
                countdown--;
                countdownElement.textContent = countdown;
                
                if (countdown <= 0) {
                    countdown = getRandomInt(8, 12);
                    if (securityBreachAttempts > 0) {
                        statusMessage.innerHTML = `<i class="fas fa-exclamation-triangle me-2"></i>${securityBreachAttempts} security events detected`;
                        document.querySelector('.status-indicator').style.backgroundColor = 'var(--danger-color)';
                        setTimeout(() => {
                            statusMessage.innerHTML = `<i class="fas fa-shield-alt me-2"></i>Monitoring system active...`;
                            document.querySelector('.status-indicator').style.backgroundColor = 'var(--secondary-color)';
                        }, 3000);
                    } else {
                        statusMessage.innerHTML = `<i class="fas fa-check-circle me-2"></i>Security check passed!`;
                        setTimeout(() => {
                            statusMessage.innerHTML = `<i class="fas fa-shield-alt me-2"></i>Monitoring system active...`;
                        }, 2000);
                    }
                    securityBreachAttempts = 0;
                }
            }, 1000);
            
            // Show Verification Modal
            secureButton.addEventListener("click", () => {
                new bootstrap.Modal(document.getElementById("infoModal")).show();
            });
            
            // Enhanced Right-Click Prevention
            document.addEventListener("contextmenu", (event) => {
                event.preventDefault();
                logSecurityEvent("Right-click attempt blocked");
            });
            
            // Comprehensive Key Combination Prevention
             document.addEventListener("keydown", (event) => {
                // Check for Ctrl/Command key combinations first
                if (event.ctrlKey || event.metaKey) {
                    // List of single-letter keys to block with Ctrl
                    const blockedSingleKeys = ['u', 's', 'p', 'o', 'r', 'n', 'w', 'q', 't', 'a', 'c', 'x', 'v', 'z', 'y', 'f', 'h'];
                    
                    if (blockedSingleKeys.includes(event.key.toLowerCase())) {
                        event.preventDefault();
                        event.stopPropagation();
                        logSecurityEvent(`Keyboard shortcut blocked: Ctrl+${event.key}`);
                        return false;
                    }

                    // Check for Ctrl+Shift combinations
                    if (event.shiftKey) {
                        const blockedShiftKeys = ['i', 'j', 'c', 'k', 'm', 'd'];
                        if (blockedShiftKeys.includes(event.key.toLowerCase())) {
                            event.preventDefault();
                            event.stopPropagation();
                            logSecurityEvent(`Keyboard shortcut blocked: Ctrl+Shift+${event.key}`);
                            return false;
                        }
                    }
                }

                // Block function keys
                if (event.key.startsWith("F") && !isNaN(event.key.slice(1))) {
                    // Block F1-F12
                    const fNumber = parseInt(event.key.slice(1));
                    if (fNumber >= 1 && fNumber <= 12) {
                        event.preventDefault();
                        event.stopPropagation();
                        logSecurityEvent(`Function key blocked: ${event.key}`);
                        return false;
                    }
                }

                // Block PrintScreen
                if (event.key === "PrintScreen") {
                    event.preventDefault();
                    event.stopPropagation();
                    logSecurityEvent("PrintScreen blocked");
                    return false;
                }

                // Block Alt+Arrow keys
                if (event.altKey && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
                    event.preventDefault();
                    event.stopPropagation();
                    logSecurityEvent(`Navigation blocked: Alt+${event.key}`);
                    return false;
                }

                // Block Alt+F4
                if (event.altKey && event.key === "F4") {
                    event.preventDefault();
                    event.stopPropagation();
                    logSecurityEvent("Alt+F4 blocked");
                    return false;
                }
            });
            
            // Advanced Debugger Detection with Tamper Evidence
            (function() {
                let lastDetection = 0;
                
                function detectDevTools() {
                    const now = Date.now();
                    if (now - lastDetection < 2000) return; // Skip if recently detected
                    
                    try {
                        const startTime = performance.now();
                        // Create a dummy debugger statement in eval to bypass simple detection avoidance
                        eval("debugger;");
                        const endTime = performance.now();
                        
                        if (endTime - startTime > 100) {
                            logSecurityEvent("Developer tools detected");
                            lastDetection = now;
                            showTamperAlert();
                        }
                    } catch (e) {
                        // Some browsers might block eval when devtools are open
                        logSecurityEvent("Potential devtools interference detected");
                        lastDetection = now;
                        showTamperAlert();
                    }
                }
                
                // Run at random intervals to make detection harder to bypass
                setInterval(detectDevTools, getRandomInt(800, 1500));
            })();
            
            // Iframe Detection (prevent framing)
            if (window !== window.top) {
                logSecurityEvent("Framing attempt detected");
                window.top.location = window.location;
            }
            
            // Prevent Drag-and-Drop and Text Selection
            document.addEventListener("dragstart", (event) => {
                event.preventDefault();
                logSecurityEvent("Drag attempt blocked");
            });
            
            document.addEventListener("selectstart", (event) => {
                event.preventDefault();
                logSecurityEvent("Text selection attempt blocked");
            });
            
            // Mutation Observer to detect DOM changes (tampering)
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.addedNodes.length || mutation.removedNodes.length) {
                        logSecurityEvent("DOM modification detected");
                        showTamperAlert();
                    }
                });
            });
            
            observer.observe(document, {
                childList: true,
                subtree: true,
                attributes: true
            });
            
            // Function to show tamper alert
            function showTamperAlert() {
                securityBreachAttempts++;
                tamperModal.show();
                
                let recoveryTime = 5;
                const recoveryInterval = setInterval(() => {
                    recoveryTime--;
                    document.getElementById('recoveryCountdown').textContent = recoveryTime;
                    
                    if (recoveryTime <= 0) {
                        clearInterval(recoveryInterval);
                        window.location.reload();
                    }
                }, 1000);
            }
            
            // Function to log security events (in a real app, this would send to server)
            function logSecurityEvent(message) {
                const now = new Date();
                console.log(`[Security Event] ${now.toISOString()} - ${message}`);
                // In production, you would send this to your server:
                // fetch('/log-security-event', { method: 'POST', body: JSON.stringify({message}) });
            }
            
            // Function to get random integer
            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            
            // Initialize all security systems
            function initSecuritySystems() {
                // Disable caching to prevent access via back button
                window.onpageshow = function(event) {
                    if (event.persisted) {
                        window.location.reload();
                    }
                };
                
                // Prevent web archive
                if (window.location.hostname.includes('archive.org') || 
                    window.location.hostname.includes('web.archive.org')) {
                    window.location.href = "about:blank";
                }
                
                // Disable image dragging (even with draggable="true")
                document.querySelectorAll('img').forEach(img => {
                    img.setAttribute('draggable', 'false');
                });
                
                // Add noise to console.log to make debugging harder
                const originalConsoleLog = console.log;
                console.log = function() {
                    originalConsoleLog.apply(console, ["%cSecurity System: Unauthorized console access detected", "color: red; font-weight: bold;"]);
                    originalConsoleLog.apply(console, arguments);
                };
                
                // Disable view source via empty menu
                document.onmenu = function() { return false; };
                
                // Disable status bar text changes
                window.onbeforeunload = function() { return false; };
            }
        });
