 if (Meteor.isClient) {

     Meteor.startup(function () {
   
      //Helper to convert CSS seconds notation into ms for setTimout
      Template.registerHelper('s2ms', function(string) {
        //remove seconds notation
        seconds = string.replace('s', '');
        //convert
        ms = seconds * 1000;
        return ms;
      });

      Template.layout.rendered = function() {
        transitionIn = '';
        transitionOut = '';

        //Inspired by https://github.com/nickw/meteor-mailbox
        this.find('#layout')._uihooks = {
          insertElement: function(node, next) {

            $(node).addClass('transition transition-in ' + transitionIn);
            $(node).insertBefore(next);

            animationDuration = UI._globalHelpers['s2ms']( $(node).css('animation-duration') );
            animationDelay = UI._globalHelpers['s2ms']( $(node).css('animation-delay') );
            animationDuration = animationDuration + animationDelay;
            Meteor.setTimeout(function() {
              $(node).removeClass('transition transition-in ' + transitionIn);
              if (transitionIn) transitionIn = '';
            }, animationDuration);        
          },

          removeElement: function(node) {
            $(node).addClass('transition transition-out ' + transitionOut);

            animationDuration = UI._globalHelpers['s2ms']( $(node).css('animation-duration') );
            animationDelay = UI._globalHelpers['s2ms']( $(node).css('animation-delay') );
            animationDuration = animationDuration + animationDelay;
            Meteor.setTimeout(function() {
              $(node).remove();
              if (transitionOut) transitionOut = '';
            }, animationDuration);
          }
        }

      };

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
