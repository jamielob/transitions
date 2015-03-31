//Set up transitions object for export, so user can customise container and content variables
Transitions = {};

 if (Meteor.isClient) {

     Meteor.startup(function () {

      //console.log(Transitions.test); 
   
      //Helper to convert CSS seconds notation into ms for setTimout
      Template.registerHelper('s2ms', function(string) {
        //remove seconds notation
        var seconds = string.replace('s', '');
        //convert
        var ms = seconds * 1000;
        return ms;
      });

      var test = {};
      test = Template;


      Template.layout.onRendered(function() {
        transitionIn = '';
        transitionOut = '';

        var containerName = Transitions.container || "#transitions-container";
        var contentName = Transitions.content || ".transitions-content";

        $("<style>")
            .prop("type", "text/css")
            .html("\
                    " + containerName + " {\
                        position: relative;\
                        width: 100%;\
                        height: 100%;\
                        -webkit-perspective: 1200px;\
                        -moz-perspective: 1200px;\
                        perspective: 1200px;\
                    }\
                    " + contentName + " {\
                      width: 100%;\
                      height: 100%;\
                      position: absolute;\
                      top: 0;\
                      left: 0;\
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
                    }")
            .appendTo("head");



      
        //Inspired by https://github.com/nickw/meteor-mailbox
        this.find(containerName)._uihooks = {
          insertElement: function(node, next) {
            // console.log('data-transition-in: ' + transitionIn);
            $(node).addClass('transition-in ' + transitionIn);
            $(node).insertBefore(next);

            animationDuration = UI._globalHelpers['s2ms']( $(node).css('animation-duration') );
            animationDelay = UI._globalHelpers['s2ms']( $(node).css('animation-delay') );
            animationDuration = animationDuration + animationDelay;

            Meteor.setTimeout(function() {
              $(node).removeClass('transition-in ' + transitionIn);
              if (transitionIn) transitionIn = '';
            }, animationDuration);        
          },

          removeElement: function(node) {
            //console.log('data-transition-out: ' + transitionOut);
            $(node).addClass('transition-out ' + transitionOut);

            animationDuration = UI._globalHelpers['s2ms']( $(node).css('animation-duration') );
            animationDelay = UI._globalHelpers['s2ms']( $(node).css('animation-delay') );
            animationDuration = animationDuration + animationDelay;
            Meteor.setTimeout(function() {
              $(node).remove();
              if (transitionOut) transitionOut = '';
            }, animationDuration);
          }
        }

      });

      Template.layout.events({

        'click [data-transition-in]': function(event) {
          transitionIn = $(event.currentTarget).data('transition-in');
        },

         'click [data-transition-out]': function(event) {
          transitionOut = $(event.currentTarget).data('transition-out');
        }

      });


   });

}
