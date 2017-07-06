var World = {
  loaded: false,

  init: function initFn() {
    this.createOverlays();
  },

  createOverlays: function createOverlaysFn() {
    /*
     First an AR.ClientTracker needs to be created in order to start the recognition engine. It is initialized with a URL specific to the target collection. Optional parameters are passed as object in the last argument. In this case a callback function for the onLoaded trigger is set. Once the tracker is fully loaded the function worldLoaded() is called.

     Important: If you replace the tracker file with your own, make sure to change the target name accordingly.
     Use a specific target name to respond only to a certain target or use a wildcard to respond to any or a certain group of targets.

     Adding multiple targets to a target collection is straightforward. Simply follow our Target Management Tool documentation. Each target in the target collection is identified by its target name. By using this target name, it is possible to create an AR.ImageTrackable for every target in the target collection.
     */
    this.tracker = new AR.ClientTracker("assets/tracker.wtc", {
      onLoaded: this.worldLoaded
    });

    //*****************POSTER ONE ************* TETRIS**************************//
    var agendaWidget = new AR.HtmlDrawable(
      {uri: "assets/dynamicAgenda.html"},
      0.7,//0.6,
      {
        /*Server*/
        onLoaded: function () {
          uri: "http://178.62.10.141:4000/dynamicAgenda.html"
        },
        zOrder: 2,
        viewportWidth: 412,
        viewportHeight: 582,
        backgroundColor: "#00000000",
        translate: {x: 0},
        opacity: 1,
        horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.CENTER,
        verticalAnchor: AR.CONST.VERTICAL_ANCHOR.MIDDLE,
        clickThroughEnabled: false,
        allowDocumentLocationChanges: false
      });
    agendaWidget.uri = "http://178.62.10.141:4000/";

    /*  This combines everything by creating an AR.ImageTrackable with the previously created tracker, the name of the image target as defined in the target collection and the drawable that should augment the recognized image.
     //
     //**********POSTER TRACKER 1*/
    var pageOne = new AR.ImageTrackable(this.tracker, "puzzle", {
      drawables: {
        cam: [agendaWidget]
      }
    });
    //*****************POSTER ONE END**************************//


  },

  worldLoaded: function worldLoadedFn() {
    var cssDivInstructions = " style='display: table-cell;vertical-align: middle; text-align: right; width: 50%; padding-right: 15px;'";
    document.getElementById('loadingMessage').innerHTML =
      "<div" + cssDivInstructions + "></div>";

    // Remove Scan target message after 10 sec.
    setTimeout(function () {
      var e = document.getElementById('loadingMessage');
      e.parentElement.removeChild(e);
    }, 10);
  }
};

World.init(); // Die World Variable muss am Ende jeder inkludierten JavaScript Datei initiiert werden, sodass alle Funktionen im Scope verfügbar sind.
