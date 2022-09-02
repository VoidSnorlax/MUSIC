function remSize(){
   let devicewidth =document.documentElement.clientWidth||window.innerWidth //获取设置宽度
   if(devicewidth>=750){
    devicewidth = 750
   }
   if(devicewidth<=320){
    devicewidth = 320
   }
   document.documentElement.style.fontSize=(devicewidth/7.5+'px')//设置rem
   document.querySelector('body').style.fontSize=0.3+'rem'//设置字体大小

}
remSize()
window.onresize = function() {
    remSize()

}