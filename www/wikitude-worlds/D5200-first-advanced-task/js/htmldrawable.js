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

     Adding multiple targets to a target collection is straightforward. Simply follow our Target Management Tool documentation. Each target in the target collection is identified by its target name. By using this target name, it is possible to create an AR.Trackable2DObject for every target in the target collection.
     */
    this.tracker = new AR.ClientTracker("assets/cameras-tracker.wtc", {
      onLoaded: this.worldLoaded
    });

    //*****************POSTER ONE**************************//

    /*
     The button is created similar to the overlay feature. An AR.ImageResource defines the look of the button and is reused for both buttons.
     */
    this.imgButton = new AR.ImageResource("assets/wwwButton.jpg");

    /*
     The next step is to create the augmentation. In this example an image resource is created and passed to the AR.ImageDrawable. A drawable is a visual component that can be connected to an IR target (AR.Trackable2DObject) or a geolocated object (AR.GeoObject). The AR.ImageDrawable is initialized by the image and its size. Optional parameters allow for position it relative to the recognized target.
     */ /*SURFBRETT IMAGE*/
    var imgOne = new AR.ImageResource("assets/imageOne.png");
    var overlayOne = new AR.ImageDrawable(imgOne, 1, {
      offsetX: -0.15,
      offsetY: 0,
      enabled:false
    });

    /*
     For each target an AR.ImageDrawable for the button is created by utilizing the helper function createWwwButton(url, options). The returned drawable is then added to the drawables.cam array on creation of the AR.Trackable2DObject.
     */
    var pageOneButton = this.createWwwButton("http://www.lauradengra.com/agenda.html", 0.1, {
      offsetX: -0,
      offsetY: 0.25,
      zOrder: 1,
      enabled:true
    });

    /*
     Using an AR.HtmlDrawable it is possible to display HTML content inside the AR scene, the same way images are displayed. In this example a weather widget is added on top of the image target to present the real-time weather in Maui, Hawaii.

     In general any HTML content can be loaded by passing a relative or absolute URL. Additionally HTML content can also be passed as a string; please see the API reference for more details on how to specify the content when creating the drawable. This example uses a relative URL to the weather widget that is stored as .html file in the example's assets subfolder.

     Once the content has been chosen it is important to think about the viewport the content will need in order to be laid out correctly. The viewport is the area that is available to the HTML content when it is rendered. It is independent of the actual area the AR.HtmlDrawable will need on screen when placed in the AR scene.

     The viewport width and height needs to be set when constructing the AR.HtmlDrawable and should also be set as meta tag inside the HTML content that is used. This tells the HTML rendering engine to use the specified viewport size during layouting.

     Check out the viewport meta-tag in the weather.html:
     <meta name="viewport" content="target-densitydpi=device-dpi, width = 320, user-scalable = 0">

     Make sure that the value of width is set according to the size (in pixel) the HTML content needs. It should also correspond to the viewportWidth value specified during the creation of the AR.HtmlDrawable.

     Similar to viewportWidth the viewportHeight is specified to define the available pixel height during rendering of the content. If you are unsure of the pixel size of the HTML content at hand, you can use the developer tools built into modern browsers (e.g. WebInspector) to take measure.

     In the code example below we are putting that all together to a working AR.HtmlDrawable. The created drawable is added to the list of Trackable2D drawables just like any other drawable.

     Interaction with an AR.HtmlDrawable is controlled with the clickThroughEnabled and allowDocumentLocationChanges properties. Setting clickThroughEnabled will forward click events to the HTML content making it possible to follow links or click buttons. If the content of the HTML drawable should not change allowDocumentLocationChanges can be set to false so links are not followed. It is still possible to react on clicked links by using the onDocumentLocationChanged trigger. The example uses this trigger to open clicked links fullscreen in a browser.
     */
    var technicalInfoWidget = new AR.HtmlDrawable(
      {uri: "http://www.lauradengra.com/agenda.html"},
      0.8,
      {
        viewportWidth: 256,
        viewportHeight: 220,
        backgroundColor: "#FFFFFF",
        translate : { x: 0 },
        opacity: 0.8,
        horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.CENTER,
        verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP,
        clickThroughEnabled: true,
        allowDocumentLocationChanges: true
      });

    /*
     This combines everything by creating an AR.Trackable2DObject with the previously created tracker, the name of the image target as defined in the target collection and the drawable that should augment the recognized image.
     // */ /*POSTER TRACKER 1*/
    var pageOne = new AR.Trackable2DObject(this.tracker, "product_d5200", {
      drawables: {
        cam: [overlayOne, pageOneButton, technicalInfoWidget]
      }
    });
//*****************POSTER ONE END**************************//


  },




  createWwwButton: function createWwwButtonFn(url, size, options) {
    /*
     As the button should be clickable the onClick trigger is defined in the options passed to the AR.ImageDrawable. In general each drawable can be made clickable by defining its onClick trigger. The function assigned to the click trigger calls AR.context.openInBrowser with the specified URL, which opens the URL in the browser.
     */
    options.onClick = function() {
      AR.context.openInBrowser(url);
    };
    return new AR.ImageDrawable(this.imgButton, size, options);
  },

  worldLoaded: function worldLoadedFn() {
    var cssDivInstructions = " style='display: table-cell;vertical-align: middle; text-align: right; width: 50%; padding-right: 15px;'";
    var cssDivSurfer = " style='display: table-cell;vertical-align: middle; text-align: left; padding-right: 15px; width: 38px'";
    var cssDivBiker = " style='display: table-cell;vertical-align: middle; text-align: left; padding-right: 15px;'";
    document.getElementById('loadingMessage').innerHTML =
      "<div" + cssDivInstructions + ">First advanced task with D5200 </div>" +
      "<div" + cssDivSurfer + "><img src='../AR-assets/d5200-tn.png' style='max-height: 48px'/></div>";

    // Remove Scan target message after 10 sec.
    setTimeout(function() {
      var e = document.getElementById('loadingMessage');
      e.parentElement.removeChild(e);
    }, 10000);
  }
};

World.init();
