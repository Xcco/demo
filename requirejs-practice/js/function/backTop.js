define(['jquery'], function($) {
  let clock
  let $backTop=$('#backTop')
  $(window).scroll(function() {
    if (clock) {
      clearTimeout(clock)
    }
    clock = setTimeout(function() {
      queryHeight($(window))
    }, 200)
  })
  $backTop.on('click',function(){
    $(window).scrollTop(0)
  })


  function queryHeight($target) {
    if ($target.scrollTop() > 400) {
      //$('#backTop').css({display:'block'},300)
      $backTop.fadeIn(800)
    }
    if ($target.scrollTop() <= 400) {
      $backTop.fadeOut(800)
    }
  }




})
