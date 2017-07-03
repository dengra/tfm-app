var World = {
  loaded: false,

  init: function initFn() {
    this.createOverlays();
  },


  createOverlays: function createOverlaysFn() {
    /*

     The button is created similar to the overlay feature. An AR.ImageResource defines the look of the button and is reused for both buttons.

     The next step is to create the augmentation. In this example an image resource is created and passed to the AR.ImageDrawable. A drawable is a visual component that can be connected to an IR target (AR.ImageTrackable) or a geolocated object (AR.GeoObject). The AR.ImageDrawable is initialized by the image and its size. Optional parameters allow for position it relative to the recognized target.

     For each target an AR.ImageDrawable for the button is created by utilizing the helper function createWwwButton(url, options). The returned drawable is then added to the drawables.cam array on creation of the AR.ImageTrackable.

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
    this.imgButton = new AR.ImageResource("assets/wwwButton.jpg");
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
        viewportWidth:  412, //540,//630, //360, //needs to be same than in html meta viewport attribute in order to show the whole page
        viewportHeight: 582, //764,//890, //509,
        backgroundColor: "#00000000",
        translate: {x: 0}, //translate: {x: 0.15},
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


    //*****************POSTER TWO LEGO**************************//
    /*
     Similar to the first part, the image resource and the AR.ImageDrawable for the second overlay are created. The AR.ImageTrackable for the second page uses the same tracker but with a different target name.
     */
    var imgTwo = new AR.ImageResource("assets/jellybeans.jpg");
    var overlayTwo = new AR.ImageDrawable(imgTwo, 1, {
      translate: {
        x: 0,
        y: 0
      },
    });


    //********** POSTER TRACKER 2 */
    /* Similar to the first part, the image resource and the AR.ImageDrawable for the second overlay are created.
    The AR.ImageTrackable for the second page uses the same tracker but with a different target name and the second overlay. */

    var pageTwo = new AR.ImageTrackable(this.tracker, "A1-02", {
      drawables: {
        cam: [overlayTwo]
      }
    });
    /*, pageTwoButton, this.modelCaffeine*/
    //********** POSTER TRACKER 2 END*/
    //*****************POSTER TWO END**************************//


    //*****************POSTER THREE **** PUZZLE **************************//
    /*
     Similar to the first part, the image resource and the AR.ImageDrawable for the second overlay are created. The AR.ImageTrackable for the second page uses the same tracker but with a different target name.
     */
    var imgThree = new AR.ImageResource("assets/food.png");
    var overlayThree = new AR.ImageDrawable(imgThree, 1, {
      translate: {
        x: 0,
        y: 0
      },
    });

    /*
     Similar to the first part, the image resource and the AR.ImageDrawable for the second overlay are created. The AR.ImageTrackable for the second page uses the same tracker but with a different target name and the second overlay.
     */
    //********** POSTER TRACKER 3 */
    var pageThree = new AR.ImageTrackable(this.tracker, "A1-01", {
      drawables: {
        cam: [overlayThree]
      }
    });
    //*****************POSTER THREE END**************************//

    //*****************POSTER FOUR **** PUZZLE **************************//
    /*
     Similar to the first part, the image resource and the AR.ImageDrawable for the second overlay are created. The AR.ImageTrackable for the second page uses the same tracker but with a different target name.
     */

    var imgFour = new AR.ImageResource("assets/coffee.png");
    var overlayFour = new AR.ImageDrawable(imgFour, 1, {
      offsetX: 0,
      offsetY: 0
    });


    /*  Similar to the first part, the image resource and the AR.ImageDrawable for the second overlay are created. The AR.ImageTrackable for the second page uses the same tracker but with a different target name and the second overlay.  */
    //********** POSTER TRACKER 3 */
    var pageFour = new AR.ImageTrackable(this.tracker, "crossword", {
      drawables: {
        cam: [overlayFour]
      },
      onEnterFieldOfVision: function onEnterFieldOfVisionFn() {
        video.resume();
      },
      onExitFieldOfVision: function onExitFieldOfVisionFn() {
        video.pause();
      }
    });
    //*****************POSTER FOUR END**************************//

  },

  createWwwButton: function createWwwButtonFn(url, size, options) {
    /*  As the button should be clickable the onClick trigger is defined in the options passed to the AR.ImageDrawable. In general each drawable can be made clickable by defining its onClick trigger. The function assigned to the click trigger calls AR.context.openInBrowser with the specified URL, which opens the URL in the browser.  */
    options.onClick = function () {
      AR.context.openInBrowser(url);
    };
    return new AR.ImageDrawable(this.imgButton, size, options);
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

World.init();
