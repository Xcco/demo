var $prePage = $('.page>li')
$('.page').append($prePage.first().clone())
$('.page').prepend($prePage.last().clone())

var $page = $('.page')
var $img = $('.page>li')
var imgAmount = $img.length
var imgWidth = $img.width()
var index = 0
var isAnimate = false
$page.width(imgAmount*imgWidth)
$page.css('left',-imgWidth)

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
    })
  }else{
    return
  }
}

$('.left.button').click(function(){
  clickLeft()
})
$('.right.button').click(function(){
  clickRight()
})
$('.index').click(function(e){
  $page.animate({
    left:-($(e.target).index()+1)*imgWidth
  })
})
