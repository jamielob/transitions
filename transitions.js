//Set up transitions object for export, so user can customise container and content variables
Transitions = {};

 if (Meteor.isClient) {

     Meteor.startup(function () {

      //Helper to convert CSS seconds notation into ms for setTimout
      Template.registerHelper('s2ms', function(string) {
        //remove seconds notation
        var seconds = string.replace('s', '');
        //convert
        var ms = seconds * 1000;
        return ms;
      });

      var containerName = Transitions.container || ".transitions-container";
      var contentName = Transitions.content || ".transitions-content";
      var defaultTransitionIn = Transitions.transitionIn || "";
      var defaultTransitionOut = Transitions.transitionOut || "";

      //Set transition states to default
      transitionIn = defaultTransitionIn;
      transitionOut = defaultTransitionOut;

      //Set styles dynamically
      $("<style>")
        .prop("type", "text/css")
        .html("\
                " + containerName + " {\
                    position: relative;\
                    -webkit-perspective: 1200px;\
                    -moz-perspective: 1200px;\
                    perspective: 1200px;\
                    overflow-x: hidden;\
                }\
                " + contentName + " {\
                    width: 100%;\
                    overflow-y: scroll; \
                    -webkit-overflow-scrolling: touch; \
                    -webkit-backface-visibility: hidden;\
                    -moz-backface-visibility: hidden;\
                    backface-visibility: hidden;\
                    -webkit-transform: translate3d(0, 0, 0);\
                    -moz-transform: translate3d(0, 0, 0);\
                    transform: translate3d(0, 0, 0);\
                    -webkit-transform-style: preserve-3d;\
                    -moz-transform-style: preserve-3d;\
                    transform-style: preserve-3d;\
                    height: 100%;\
                }\
                }")
        .appendTo("head");

      //Add click handlers to grab data-transitions
      $(document)
      .on('click', '[data-transition-in]', function(event) {
        transitionIn = $(event.currentTarget).data('transition-in');
      })
      .on('click', '[data-transition-out]', function(event) {
        transitionOut = $(event.currentTarget).data('transition-out');
      });


      //Runs once on each template
      //Uses aldeed:template-extension
      Template.onRendered(function() {

        transitionsContainer = this.find(containerName);

        if (transitionsContainer) {

            transitionsContainer._uihooks = {

            removeElement: function(node) {
              //Disable any transition buttons until transition is complete
              $('[data-transition-in],[data-transition-out]').addClass('transition-button-disable');
              //Delay1 class fixes a lot of timing issues on iphone
              $(node).addClass('transition-out delay1 ' + transitionOut);

              animationDuration = UI._globalHelpers['s2ms']( $(node).css('animation-duration') );
              animationDelay = UI._globalHelpers['s2ms']( $(node).css('animation-delay') );
              animationDuration = animationDuration + animationDelay;

              Meteor.setTimeout(function() {
                $(node).remove();
                transitionOut = defaultTransitionOut;
              }, animationDuration);
            },

            insertElement: function(node, next) {
              //Delay1 class fixes a lot of timing issues on iphone
              $(node).addClass('transition-in delay1 ' + transitionIn);
              //FadeIn stops CSS flash on iPhone
              $(node).insertBefore(next).fadeIn(1);
              $('[data-transition-in],[data-transition-out]').addClass('transition-button-disable');

              if (transitionIn) {

                //Get the incoming height
                tempHeight = $('.transition-in').outerHeight();
                //Get the current height
                prevHeight = $(node).parent(containerName).css('height');
                //As long as its not zero, set the new height
                if (prevHeight != "0px") $(node).parent(containerName).css('height', tempHeight);

                animationDuration = UI._globalHelpers['s2ms']( $(node).css('animation-duration') );
                animationDelay = UI._globalHelpers['s2ms']( $(node).css('animation-delay') );
                animationDuration = animationDuration + animationDelay;
              }

              Meteor.setTimeout(function() {
                $(node).removeClass('transition-in delay1 ' + transitionIn);
                  //Restore previous height
                  if (prevHeight != "0px") $(node).parent(containerName).css('height', prevHeight);
                  transitionIn = defaultTransitionIn;
                  //Re-enable transition
                  $('[data-transition-in],[data-transition-out]').removeClass('transition-button-disable');
                  $(document).trigger('data-transition-done');
              }, animationDuration);

            }
          }
        }


      });


   });

}


//UI Hooks usage Inspired by https://github.com/nickw/meteor-mailbox

//Finish event possibility?  Although cleaner, it seemed to cause more problems than the simpletimer function as above
//http://www.webtempest.com/meteorjs-animation
