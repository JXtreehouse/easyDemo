var app;
var cameraPosition;
var cameraTarget;
window.onload = function() {
    app = new t3d.App({
        el: "div3d",
        skyBox: 'BlueSky',
        url: "http://uinnova-model.oss-cn-beijing.aliyuncs.com/scenes/silohouse",
        ak:"app_test_key",
        complete: function() {
            console.log("app scene loaded");
            appinit();
            guiinit();
            initsimdata();
        }
    });    
}
