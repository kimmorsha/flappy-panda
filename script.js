$(function () {

    //saving dom objects to variables
    //so we dont have to use the dollar sign $
    //cause we are poor huhuhu
    var container = $('#container');
    var panda = $('#panda');
    var pole = $('.pole');
    var pole_1 = $('#pole_1');
    var pole_2 = $('#pole_2');
    var score = $('#score');
    var speed_span = $('#speed');
    var restart_btn = $('#restart_btn');

    //saving some initial setup
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_initial_position = parseInt(pole.css('right'));
    var pole_initial_height = parseInt(pole.css('height'));
    var panda_left = parseInt(panda.css('left'));
    var panda_height = parseInt(panda.height());
    var speed = 10;

    //some other declarations
    var go_up = false;
    var score_updated = false;
    var game_over = false;


    var the_game = setInterval(function(){

        if (collision(panda, pole_1) || collision(panda, pole_2) ||
          parseInt(panda.css('top')) <= 0 ||
          (parseInt(panda.css('top')) > (container_height - panda_height))) {

          stop_the_game();

        } else {
          var pole_current_position = parseInt(pole.css('right'));

          // update the score when the poles have been passed by the panda
          if (pole_current_position > (container_width - panda_left)) {
              if (score_updated === false) {
                score.text(parseInt(score.text()) + 1);
                score_updated = true;
              }
          }


          //check whether the poles went out of the container
          if (pole_current_position > container_width) {
              //we need to change the pole's height as well
              var new_height = parseInt(Math.random() * 100);

              pole_1.css('height', pole_initial_height + new_height);
              pole_2.css('height', pole_initial_height - new_height)

              //increase the speed
              speed = speed + 1;
              speed_span.text(speed);

              score_updated = false;

              //just before the pole is rest the height of the poles is changed
              //if it is out of the container then we need to..
              //bring it back to its first position
              pole_current_position = pole_initial_position;

              if (go_up === false) {
                  go_down();
              };
          };

          //move the poles
          pole.css('right', pole_current_position + speed);

          // to make the default move go down if even space is not pressed
          if (go_up === false) {
              go_down();
          }

        }
    }, 40);

    $(document).on('keydown', function (e) {
        var key = e.keyCode;
        if (key === 32 && go_up === false && game_over === false) {
            go_up = setInterval(up, 50);
        };
    });

    $(document).on('keyup', function (e) {
        var key = e.keyCode;
        if (key === 32) {
            clearInterval(go_up);
            go_up = false;
        };
    });

    function go_down () {
        //it is going to move the panda down
        //by increasing the top
        panda.css('top', parseInt(panda.css('top')) + 5);
    }

    function up() {
        //it is going to move the panda up
        //by decreasing the top
        panda.css('top', parseInt(panda.css('top')) - 10);
    }

    function stop_the_game(){
      clearInterval(the_game);
      game_over = true;
      //display the restart button
      restart_btn.slideDown();
    }

    restart_btn.click(function () {
      location.reload();
    });

    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

});
