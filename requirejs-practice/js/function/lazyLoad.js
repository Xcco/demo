define(['jquery'],function(){
//懒加载的简单实现 适合图片较多情况
let clock
let imgCount=0
let imgAmount=26
const $imgCt=$('#imgCt')
const $bar=$('#imgCt>div')
const $loadAll=$('#loadAll')
//预加载提前高度
const preHeight=20
//加载网页判断一次
$bar.each(function(){
    addImg($(this))
})
$(window).scroll(function(){
  if(clock){
    clearTimeout(clock)
  }
  clock=setTimeout(function(){
    $bar.each(function(){
      addImg($(this))
    })
  },200)
})
function addImg($ct){
  if(imgCount===imgAmount){
    if($loadAll.css('display')==='none'){
      $loadAll.css('display','block')
    }
    else{
      return
    }
  }
  else if(inSight($ct)){
    let $img=$(`<img src="main-img/${imgCount+1}.jpg">`)
    imgCount+=1
    $img.on('load',function(){
      $ct.append($img)
      addImg($ct)
    })
  }
  return
}
//inspect the position of the picture
function inSight($ct){
  if($(window).scrollTop()+$(window).height()+preHeight>$ct.offset().top+$ct.height()){
    return true
  }
  return false
}

})
