define(['jquery'],function($){

  var $prePage = $('.page>li')
  $('.page').append($prePage.first().clone())
  $('.page').prepend($prePage.last().clone())

  var $page = $('.page')
  var $img = $('.page>li')
  var $tags = $('.index>li')
  var imgAmount = $img.length
  var imgWidth = $img.width()
  var index = 0
  var isAnimate = false
  $page.width(imgAmount*imgWidth)
  $page.css('left',-imgWidth)
  $tags.eq(0).css('background-color','rgba(255,255,255,0.8)')

  function clickLeft(){
    if(!isAnimate){
      isAnimate=true
      $page.animate({
        left: '+='+imgWidth
      },function(){
        isAnimate=false
        index-=1
        if(index=== -1){
          $page.css('left',-(imgAmount-2)*imgWidth)
          index=(imgAmount-3)
        }
        $tags.eq(index).css('background-color','rgba(255,255,255,0.8)')
        $tags.eq(index).siblings().css('background-color','')
      })
    }else{
      return
    }
  }
  function clickRight(){
    if(!isAnimate){
      isAnimate=true
      $page.animate({
        left: '-='+imgWidth
      },function(){
        isAnimate=false
        index+=1
        if(index=== 5){
          $page.css('left',-imgWidth)
          index=0
        }
        $tags.eq(index).css('background-color','rgba(255,255,255,0.8)')
        $tags.eq(index).siblings().css('background-color','')
      })
    }else{
      return
    }
  }

  setInterval(function(){
    clickRight()
  },3000)

  $('.left.button').click(function(){
    clickLeft()
  })
  $('.right.button').click(function(){
    clickRight()
  })
  $('.index').click(function(e){
    $page.animate({
      left:-($(e.target).index()+1)*imgWidth
    },function(){
      index=$(e.target).index()
      $tags.eq(index).css('background-color','rgba(255,255,255,0.8)')
      $tags.eq(index).siblings().css('background-color','')
    })
  })

})
