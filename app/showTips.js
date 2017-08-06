export default function(txt, status, time) {
  if($(".copper-tips-wrap").length && status){
    $(".copper-tips-wrap span").text(txt);
    setTimeout(function(){
      $(".copper-tips-wrap").fadeOut(function(){
        $(".copper-tips-wrap").remove()
      })
    },300)
  }
  $('body').append("<div class='copper-tips-wrap'><span>"+txt+"</span></div>");
  if(time){
    setTimeout(function(){
      $(".copper-tips-wrap").fadeOut(function(){
        $(".copper-tips-wrap").remove()
      })
    },time)
  }

}
