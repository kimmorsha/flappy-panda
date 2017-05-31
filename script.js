
$(function () {

    //saving dom objects to variables
    //so we dont have to use the dollar sign $
    //cause we are poor huhuhu
    var container = $('#container');
    var panda = $('#panda');
    var pole1 = $('.pole1');
    var pole2 = $('.pole2');
    var pole3 = $('.pole3');
    var pole4 = $('.pole4');
    var pole_1 = $('#pole_1');
    var pole_2 = $('#pole_2');
    var pole_3 = $('#pole_3');
    var pole_4 = $('#pole_4');
    var pole_5 = $('#pole_6');
    var pole_6 = $('#pole_5');
    var pole_7 = $('#pole_7');
    var pole_8 = $('#pole_8');
    var score = $('#score');
    var speed_span = $('#speed');
    var restart_btn = $('#restart_btn');


    //saving some initial setup
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole1_initial_position = parseInt(pole1.css('right'));
    var pole2_initial_position = parseInt(pole2.css('right'));
    var pole3_initial_position = parseInt(pole3.css('right'));
    var pole4_initial_position = parseInt(pole4.css('right'));
    var pole_initial_height = parseInt(pole1.css('height'));
    var pole3_top = parseInt(pole_5.css('top'));
    var pole3_bottom = parseInt(pole_6.css('bottom'));
      var pole4_top = parseInt(pole_7.css('top'));
    var pole4_bottom = parseInt(pole_8.css('bottom'));
    var panda_left = parseInt(panda.css('left'));
    var panda_height = parseInt(panda.height());
    var speed = 10;

    //some other declarations
    var go_up = false;
    var score_updated = false;
    var score2_updated = false;
    var passed3 = false;
    var passed4 = false;
    var game_over = false;


    var the_game = setInterval(function(){

        if (collision(panda, pole_1) || collision(panda, pole_2) || collision(panda, pole_3) ||collision(panda, pole_4) || collision(panda, pole_5)||
          collision(panda, pole_6) || collision(panda, pole_7) ||collision(panda, pole_8)||
          parseInt(panda.css('top')) <= 0 ||
          (parseInt(panda.css('top')) > (container_height - panda_height))) {

          stop_the_game();

        } else {
          var pole1_current_position = parseInt(pole1.css('right'));
          var pole2_current_position = parseInt(pole2.css('right'));
          var pole3_current_position = parseInt(pole3.css('right'));
          var pole4_current_position = parseInt(pole4.css('right'));

          // update the score when the poles have been passed by the panda
          if (pole1_current_position > (container_width - panda_left)) {
              if (score_updated === false) {
                score.text(parseInt(score.text()) + 1);
                score_updated = true;
              }
          }
          if(pole2_current_position > (container_width - panda_left)){
            if (score2_updated === false) {
                score.text(parseInt(score.text()) + 1);
                score2_updated = true;
            }
          }
          if(pole3_current_position > (container_width - panda_left)) {
            if(!passed3) {
              score.text(parseInt(score.text()) + 1);
              passed3 = true;
            }
          }
            if(pole4_current_position > (container_width - panda_left)) {
            if(!passed3) {
              score.text(parseInt(score.text()) + 1);
              passed4 = true;
            }
          }


          //check whether the poles went out of the container
          if (pole1_current_position > container_width) {
              //we need to change the pole's height as well
              var new_height = parseInt((Math.random() * 100) + 50);

              pole_1.css('height', pole_initial_height + new_height);
              pole_2.css('height', pole_initial_height - new_height)

              //increase the speed
              //speed = speed + 1;
              speed_span.text(speed);

              score_updated = false;

              //just before the pole is rest the height of the poles is changed
              //if it is out of the container then we need to..
              //bring it back to its first position
              pole1_current_position = pole1_initial_position;

              if (go_up === false) {
                  go_down();
              };
          };
           if (pole2_current_position > container_width) {
              //we need to change the pole's height as well
              var new_height = parseInt((Math.random() * 100) + (-50));

              pole_3.css('height', pole_initial_height + new_height);
              pole_4.css('height', pole_initial_height - new_height)

              //increase the speed
              speed = speed + 1;
              speed_span.text(speed);

              score2_updated = false;

              //just before the pole is rest the height of the poles is changed
              //if it is out of the container then we need to..
              //bring it back to its first position
              pole2_current_position = pole2_initial_position;

              if (go_up === false) {
                  go_down();
              };
          };

          if( pole3_current_position > container_width) {
            var new_height = parseInt((Math.random() * 100) + (-100));

            pole_5.css('top', pole3_top - new_height);
            pole_6.css('bottom', pole3_bottom + new_height);

            passed3 = false;
            pole3_current_position= pole3_initial_position;

            if(go_up ===false) {
              go_down();
            }
          }
           if( pole4_current_position > container_width) {
            var new_height = parseInt((Math.random() * 100) + (-100));

            pole_7.css('top', pole4_top - new_height);
            pole_8.css('bottom', pole4_bottom + new_height);

            passed4 = false;
            pole4_current_position= pole4_initial_position;

            if(go_up ===false) {
              go_down();
            }
          }


          //move the poles
          pole1.css('right', pole1_current_position + speed);
          pole2.css('right', pole2_current_position + speed);
          pole3.css('right', pole3_current_position + speed);
          pole4.css('right', pole4_current_position + speed);

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
//     var panda_Image = new Image();
//     panda_Image.src = "pandasprite.png";

//     var canvas = document.getElementById("pandaAnimation");
//     canvas.width = 100;
//     canvas.height = 100;

//     var panda_ = sprite({
//         context : canvas.getContext("2d");
//         width:100,
//         height:100,
//         image: panda_Image
//     });
//     panda_.render();
//     function sprite (options) {
                    
//     var that = {},
//         that.context = options.context;
//         that.width = options.width;
//         that.height = options.height;
//         that.image = options.image;
//         frameIndex = 0,
//         tickCount = 0,
//         ticksPerFrame = 0,
//         numberOfFrames = options.numberOfFrames || 1;

//           that.loop = options.loop;
//           that.render = function () {
          
//     // Clear the canvas
//            context.clearRect(0, 0, that.width, that.height);

//         // Draw the animation
//            that.context.drawImage(
//            that.image,
//            frameIndex * that.width / numberOfFrames,
//            0,
//            that.width,
//            that.height,
//            0,
//            0,
//            that.width,
//            that.height);
//        };   
// };

   
    


// }

// function gameLoop () {

//   window.requestAnimationFrame(gameLoop);
  
//   coin.update();
//   coin.render();
// }

// // Start the game loop as soon as the sprite sheet is loaded
// coinImage.addEventListener("load", gameLoop);
    function go_down () {
        //it is going to move the panda down
        //by increasing the top
        panda.css('top', parseInt(panda.css('top')) + 9);
    }

    function up() {
        //it is going to move the panda up
        //by decreasing the top
        panda.css('top', parseInt(panda.css('top')) - 15);
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
