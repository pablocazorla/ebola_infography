(function() {


  var ebolaContainer = document.getElementById('ebola-container'),
    preClassName = ebolaContainer.className || '';


  // Swiffy
  var stage = new swiffy.Stage(ebolaContainer, ebolaData, {});
  stage.start();


  // Fullscreen
  var btnFullScreen = document.getElementById('ebola-container-btn-full');

  // detect enabled Fullscreen
  if (ebolaContainer.requestFullScreen || ebolaContainer.webkitRequestFullScreen || ebolaContainer.mozRequestFullScreen || ebolaContainer.msRequestFullscreen) {
    btnFullScreen.className = 'enabled';
  } 

  function listenEvent(eventTarget, eventType, eventHandler) {
    if (eventTarget.addEventListener) {
      eventTarget.addEventListener(eventType, eventHandler, false);
    } else if (eventTarget.attachEvent) {
      eventType = "on" + eventType;
      eventTarget.attachEvent(eventType, eventHandler);
    } else {
      eventTarget["on" + eventType] = eventHandler;
    }
  };

  function setFullScreen() {
    if (ebolaContainer.requestFullScreen) {
      ebolaContainer.requestFullScreen();
    }
    if (ebolaContainer.webkitRequestFullScreen) {
      ebolaContainer.webkitRequestFullScreen();
    }
    if (ebolaContainer.mozRequestFullScreen) {
      ebolaContainer.mozRequestFullScreen();
    }
    if (ebolaContainer.msRequestFullscreen) {
      ebolaContainer.msRequestFullscreen();
    }
  };

  var fullscreenStatus = document.mozFullScreen || document.webkitIsFullScreen || false;

  function onFullscreenChange() {
    if (!fullscreenStatus) {
      ebolaContainer.className = preClassName + ' fullscreen';
      fullscreenStatus = true;
    } else {
      ebolaContainer.className = preClassName;
      fullscreenStatus = false;
    }
  };
  listenEvent(document, 'fullscreenchange', onFullscreenChange);
  listenEvent(document, 'mozfullscreenchange', onFullscreenChange);
  listenEvent(document, 'webkitfullscreenchange', onFullscreenChange);
  listenEvent(document, 'MSFullscreenChange', onFullscreenChange);
  listenEvent(btnFullScreen, 'click', setFullScreen);
})();