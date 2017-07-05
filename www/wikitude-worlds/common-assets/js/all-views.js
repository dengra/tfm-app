var World = {
  closeScreen: function closeScreenFn() {
    document.location = "architectsdk://closeScreen";
  },

  showHelp: function showHelpFn() {
    var help = document.getElementById('help');
    if (help.style.display === 'none') {
      help.style.display = 'block';
    } else {
      help.style.display = 'none';
    }
  },

  nextStep: function nextStepFn() {
    var help = document.getElementById('help');
    if (help.style.display === 'none') {
      help.style.display = 'block';
    } else {
      help.style.display = 'none';
    }
  }
};
