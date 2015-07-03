import OverlayManager from './overlay_manager';

export default {
  overlayName: null,
  updatePassword: null,
  reason: null,
  passwordField: null,
  passwordText: null,
  passwordSubmit: null,
  passwordCancel: null,

  initialize: function secondaryToolbarInitialize(options) {
    this.overlayName = options.overlayName;
    this.passwordField = options.passwordField;
    this.passwordText = options.passwordText;
    this.passwordSubmit = options.passwordSubmit;
    this.passwordCancel = options.passwordCancel;

    // Attach the event listeners.
    this.passwordSubmit.addEventListener('click',
      this.verifyPassword.bind(this));

    this.passwordCancel.addEventListener('click', this.close.bind(this));

    this.passwordField.addEventListener('keydown', function (e) {
      if (e.keyCode === 13) { // Enter key
        this.verifyPassword();
      }
    }.bind(this));

    OverlayManager.register(this.overlayName, this.close.bind(this), true);
  },

  open: function passwordPromptOpen() {
    OverlayManager.open(this.overlayName).then(function () {
      this.passwordField.focus();

      var promptString = mozL10n.get('password_label', null,
        'Enter the password to open this PDF file.');

      if (this.reason === PDFJS.PasswordResponses.INCORRECT_PASSWORD) {
        promptString = mozL10n.get('password_invalid', null,
          'Invalid password. Please try again.');
      }

      this.passwordText.textContent = promptString;
    }.bind(this));
  },

  close: function passwordPromptClose() {
    OverlayManager.close(this.overlayName).then(function () {
      this.passwordField.value = '';
    }.bind(this));
  },

  verifyPassword: function passwordPromptVerifyPassword() {
    var password = this.passwordField.value;
    if (password && password.length > 0) {
      this.close();
      return this.updatePassword(password);
    }
  }
};

