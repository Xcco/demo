var clock
//加载网页判断一次
$('.wrap').each(function(){
    addSrc($(this))
})
$(window).scroll(function(){
  if(clock){
    clearTimeout(clock)
  }
  clock=setTimeout(function(){
    $('.wrap').each(function(){
      addSrc($(this))
    })
  },200)
})
function addSrc(wrap){
  if(inSight(wrap)){
    var img=wrap.children()
    if(!img.hasClass('src')){
      img.attr('src',img.attr('data-src'))
      //在图片导入过程中placeholder就被撤去 导致高度坍缩
      //下面图片也开始加载 所以设置setTimeout改变顺序 setTimeout在each()后执行
      //placeholder高度为预估 后续优化读取图片高度取代placeholder
      setTimeout(function(){
        img.removeClass('placeholder')
      })
    }
    return
  }
  return
}
//inspect the position of the picture
function inSight(div){
  if($(window).scrollTop()+$(window).height()>div.offset().top
    && div.scrollTop()<div.offset().top){
    return true
  }
  return false
}
