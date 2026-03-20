# SimpleModal JS 🚀

A lightweight, dependency-free **vanilla JavaScript modal library** inspired by Bootstrap and SweetAlert UI.

Built for simplicity, flexibility, and especially **WordPress compatibility**.

---

## 🔥 Why I Built This

Most modal libraries are either:

* Too heavy (Bootstrap requires full framework)
* Require jQuery
* Not flexible for WordPress users

👉 So I created **SimpleModal**:

* Plug & play
* No dependencies
* Works anywhere (WordPress, HTML, Elementor, custom themes, any custom build)

---

## ✨ Features

* ✅ Pure Vanilla JavaScript (No jQuery)
* ✅ Multiple modals support
* ✅ Bootstrap-like structure
* ✅ SweetAlert-style clean UI
* ✅ Open modal via button or link
* ✅ Auto open on page load
* ✅ ESC key to close
* ✅ Overlay click close
* ✅ Smooth animations (fade + slide)
* ✅ Custom actions (AJAX ready)
* ✅ Global API control

---

## 📦 Installation

Just include the JS file:

```html
<script src="modal.js"></script>
```

That’s it. No CSS file needed (included inside JS).

---

## 🧩 Basic Usage

### 1. Button Trigger

```html
<button data-modal-target="#myModal">Open Modal</button>
```

---

### 2. Modal Structure

```html
<div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <button class="close-x" data-modal-close>&times;</button>
        <h3>Title</h3>
      </div>

      <div class="modal-body">
        Your content here...
      </div>

      <div class="modal-footer">
        <button class="btn btn-agree" data-agree="myFunction">Agree</button>
        <button class="btn btn-close" data-modal-close>Close</button>
      </div>

    </div>
  </div>
</div>
```

---

## ⚡ Open Modal on Load

### Option 1 (HTML)

```html
<div class="modal" data-open>
```

### Option 2 (JS)

```js
window.addEventListener('load', () => {
  SM.show(document.querySelector('#myModal'));
});
```

---

## 🎯 Custom Function (AJAX / Actions)

```js
window.myFunction = function(modal) {

  // Example AJAX
  fetch('/api/save', {
    method: 'POST'
  });

  // Close modal
  SM.hide(modal);
}
```

---

## 🧠 Global API

```js
SM.show(document.querySelector('#myModal'));
SM.hide(document.querySelector('#myModal'));
```

---

## 💻 WordPress Usage

### Enqueue Script

```php
wp_enqueue_script('simple-modal', get_stylesheet_directory_uri().'/modal.js', [], null, true);
```

Works perfectly with:

* Elementor
* Gutenberg
* Custom themes

---

## 🌐 Live Demo

👉 View Example: **https://www.wpdebugfix.com/simplemodal/**

(Replace this with your actual demo link)

---

## 🚀 Future Improvements

* Modal sizes (small, large)
* Icon support (success, error)
* Better animation presets
* NPM package support

---

## 🤝 Contributing

Feel free to fork, improve, and suggest features.

---

## 👨‍💻 Author

**Neeraj (aceneeraj)**  
Full Stack Developer & Freelancer  

- 💻 WordPress Specialist (Custom Themes & Plugins)  
- ⚙️ PHP Developer  
- ⚛️ React.js Developer  
- 🌐 Node.js Backend Development  
- 🧩 Building reusable UI components & tools  

🔗 Portfolio: https://www.wpdebugfix.com/  
🔗 LinkedIn: https://www.linkedin.com/in/dev-neeraj-chaturvedi/  

---

## ⭐ Support

If you like this project, please ⭐ the repo and share it!
