var World = {
  closeScreen: function closeScreenFn() {
    document.location = "architectsdk://closeScreen";
  },

  showHelp: function showHelpFn() {
    var helpDiv = document.getElementById('helpDiv');
    if (helpDiv.style.display === 'none') {
      helpDiv.style.display = 'block';
    } else {
      helpDiv.style.display = 'none';
    }
  },

  showARNavBar: function showARNavBarFn() {
    var helpDiv = document.getElementById('arnavbar');
    if (helpDiv.style.display === 'none') {
      helpDiv.style.display = 'block';
    } else {
      helpDiv.style.display = 'none';
    }
  },

  formerStep: function formerStepFn() {
    var step = document.getElementById('step');
    if (step.style.display === 'none') {
      step.style.display = 'block';
    } else {
      step.style.display = 'none';
    }
  },

  nextStep: function nextStepFn() {
    var step = document.getElementById('step');
    if (step.style.display === 'none') {
      step.style.display = 'block';
    } else {
      step.style.display = 'none';
    }
  },

  startAnimation: function startAnimationFn() {
    var step = document.getElementById('step');
    if (step.style.display === 'none') {
      step.style.display = 'block';
    } else {
      step.style.display = 'none';
    }
  }
};

World.init(); // Die World Variable muss am Ende jeder inkludierten JavaScript Datei initiiert werden, sodass alle Funktionen im Scope verfügbar sind.
