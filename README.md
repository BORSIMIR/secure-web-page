# Secure Web Page

A secure web page with built-in JavaScript-based security measures to prevent unauthorized access to developer tools, copying, and content inspection. This project helps maintain page integrity and protect sensitive content from being easily accessed or downloaded.

## Features

- **Right-Click Disabled:** Prevents users from accessing the context menu.
- **Blocked Developer Tools Access:** Prevents actions such as:
  - `F12` (DevTools)
  - `Ctrl + Shift + I` (Inspect Element)
  - `Ctrl + Shift + J` (Console)
  - `Ctrl + U` (View Source)
  - `Ctrl + S` (Save Page As)
- **Debugger Detection:** Automatically reloads the page if DevTools are detected.
- **Text Selection & Dragging Disabled:** Prevents copying content by selecting or dragging elements.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/secure-web-page.git
