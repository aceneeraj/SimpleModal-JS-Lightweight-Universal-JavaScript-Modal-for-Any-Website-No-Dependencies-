/*
SimpleModal - Lightweight Vanilla JS Modal (WordPress Friendly)
Features:
- No dependency (pure JS)
- Works with multiple modals
- Button trigger (data-modal-target)
- Auto open (data-open)
- Agree button with custom function (data-agree)
- ESC close
- Overlay close
- Animation (fade + slide)
- Global API (SM.show / SM.hide)
*/

class SimpleModal {
  constructor(selector = '.modal', options = {}) {
    this.modals = document.querySelectorAll(selector);

    this.options = Object.assign({
      closeOnOverlay: true,
      escClose: true,
      onAgree: null
    }, options);

    this.activeModal = null;
    this.init();
  }

  init() {
    this.modals.forEach(modal => {
      if (!modal.classList.contains('sm-init')) {
        modal.classList.add('sm-init');
        this.bindEvents(modal);

        if (modal.hasAttribute('data-open')) {
          this.show(modal);
        }
      }
    });

    // Open via button/link
    document.querySelectorAll('[data-modal-target]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(btn.getAttribute('data-modal-target'));
        if (target) this.show(target);
      });
    });

    // ESC key support
    if (this.options.escClose) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.activeModal) {
          this.hide(this.activeModal);
        }
      });
    }
  }

  bindEvents(modal) {
    // Close buttons
    modal.querySelectorAll('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', () => this.hide(modal));
    });

    // Agree buttons
    modal.querySelectorAll('[data-agree]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fnName = btn.getAttribute('data-agree');

        // Call global function if exists
        if (fnName && typeof window[fnName] === 'function') {
          window[fnName](modal);
        }
        // Callback from options
        else if (typeof this.options.onAgree === 'function') {
          this.options.onAgree(modal);
        }
        // Default: just close
        else {
          this.hide(modal);
        }
      });
    });

    // Overlay click
    if (this.options.closeOnOverlay) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.hide(modal);
        }
      });
    }
  }

  show(modal) {
    this.activeModal = modal;
    modal.classList.add('show');
    document.body.classList.add('modal-open');

    setTimeout(() => {
      modal.classList.add('fade-in');
    }, 10);
  }

  hide(modal) {
    modal.classList.remove('fade-in');

    setTimeout(() => {
      modal.classList.remove('show');
      document.body.classList.remove('modal-open');
      this.activeModal = null;
    }, 200);
  }
}

// Global init (WordPress ready)
window.addEventListener('DOMContentLoaded', () => {
  window.SM = new SimpleModal();
});

/* ================= CSS ================= */

const style = document.createElement('style');
style.innerHTML = `
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  background: rgba(0,0,0,0.5);
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.modal.show {
  display: flex;
}

.modal.fade-in {
  opacity: 1;
}

.modal-dialog {
  width: 90%;
  max-width: 500px;
  transform: translateY(-30px);
  transition: transform 0.2s ease;
}

.modal.fade-in .modal-dialog {
  transform: translateY(0);
}

.modal-content {
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  overflow: hidden;
  position: relative;
}

/* Header like SweetAlert */
.modal-header {
  padding: 20px 15px 10px;
  text-align: center;
  border-bottom: none;
  position: relative;
}

.modal-header h3 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
}

/* Close Cross - TOP LEFT CORNER */
.modal-header .close-x {
  position: absolute;
  left: 15px;
  top: 15px;
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #999;
}

.modal-header .close-x:hover {
  color: #333;
}

/* Close Cross (Left Corner like SweetAlert) */
.modal-header .close-x {
  position: absolute;
  left: 12px;
  top: 12px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  line-height: 1;
}

.modal-header .close-x:hover {
  opacity: 0.7;
}

.modal-footer {
  padding: 15px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.modal-body {
  padding: 15px;
  overflow-y: auto;
  flex: 1;
  text-align: center;
}

/* Buttons */
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-agree {
  background: #3085d6;
  color: #fff;
}

.btn-close {
  background: #aaa;
  color: #fff;
}

.modal-open {
  overflow: hidden;
}
`;

document.head.appendChild(style);

/* ================= USAGE =================

// 1. Button trigger
<button data-modal-target="#myModal">Open</button>

// 2. Modal HTML
<div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h3>Title</h3>
        <button class="btn btn-close" data-modal-close>×</button>
      </div>

      <div class="modal-body">
        Your content here...
      </div>

      <div class="modal-footer">
        <button class="btn btn-agree" data-agree="myAjaxFunction">Agree</button>
        <button class="btn btn-close" data-modal-close>Close</button>
      </div>

    </div>
  </div>
</div>

// 3. Custom function (WordPress AJAX compatible)
window.myAjaxFunction = function(modal) {
  console.log('Ajax call here');

  // Example (WordPress AJAX)
  fetch('/wp-admin/admin-ajax.php', {
    method: 'POST'
  });

  // Close modal
  SM.hide(modal);
}

// 4. Manual control
SM.show(document.querySelector('#myModal'));
SM.hide(document.querySelector('#myModal'));

*/
