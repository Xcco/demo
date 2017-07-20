var $img=$('.page>li>img')
var $index=$('.index>li')
var isTransform=false
var index=0


function clickLeft(){
  if(isTransform){
    return
  }
  isTransform=true
  $img.eq(index).fadeOut('slow')
  $index.eq(index).removeClass('show')
  index-=1
  if(index===-1){
    index=$img.length-1
  }
  $img.eq(index).fadeIn('slow',function(){
    isTransform=false
  })
  $index.eq(index).addClass('show')
}
function clickRight(){
  if(isTransform){
    return
  }
  $img.eq(index).fadeOut('slow')
  $index.eq(index).removeClass('show')
  index+=1
  if(index===$img.length){
    index=0
  }
  $img.eq(index).fadeIn('slow',function(){
    isTransform=false
  })
  $index.eq(index).addClass('show')
}
function clickIndex(e){
  if(isTransform){
    return
  }
  $img.eq(index).fadeOut('slow')
  $index.eq(index).removeClass('show')
  index=$(e.target).index()
  $img.eq(index).fadeIn('slow',function(){
    isTransform=false
  })
  $index.eq(index).addClass('show')
}

$('.left.button').click(function(){
  clickLeft()
})
$('.right.button').click(function(){
  clickRight()
})
$('.index').click(function(e){
  clickIndex(e)
})
setInterval(function(){
  clickRight()
},2000)
