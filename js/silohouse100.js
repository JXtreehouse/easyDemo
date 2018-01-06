var app;
var cameraPosition;
var cameraTarget;
var siloHouse = {};
var offset = [80, 101, -80];

window.onload = function () {
    app = new t3d.App({
        el: "div3d",
        skyBox: 'BlueSky',
        url: "http://uinnova-model.oss-cn-beijing.aliyuncs.com/scenes/silohouse",
        ak: "app_test_key",
        complete: function () {
            console.log("app scene loaded");
            appinit();
        }
    });
}
function appinit() {
    //数据收集
    siloHouse.bound = app.query("[物体类型=粮仓]");
    siloHouse.door = app.query("[物体类型=粮仓门]");
    siloHouse.window = app.query("[物体类型=粮仓窗]");
    siloHouse.grain = app.query("[物体类型=粮食]");
    siloHouse.camera = app.query("[物体类型=摄像头]");
    create_gps_panel();
}

// 创建导航面板
var lastClickBundUI = null;
function create_gps_panel() {
    guiMd = new dat.gui.GUI({ type: 'nav-md3' });
    var f = guiMd.addTree('粮仓', siloHouse, 'bound', 'name');
    guiMd.treeBind('click', function (o, target) {
        if (o == '粮仓') return;
        if (lastClickBundUI != null) {
            lastClickBundUI.destroy();
            lastClickBundUI = null;
        }
        guiMd.highLight(target);
        CameraFly(o.position);
        lastClickBundUI = new dat.gui.GUI({
            type: 'signboard2',
            name: o.name,
            isClose: true,
            isDrag: true,
            isRetract: true,
            hasTitle: true,
            domWidth: "450px"
        });
        lastClickBundUI.setZIndex(999999);
        lastClickBundUI.setPosition({ left: 300, top: 50 });
        var uiData = {
            "基本信息": {
                "品种": Math.ceil(Math.random() * 2) == 1 ? "小麦" : "玉米",
                "库存数量": Math.ceil(Math.random() * 9000) + "",
                "报关员": Math.ceil(Math.random() * 2) == 1 ? "张三" : "李四",
                "入库时间": Math.ceil(Math.random() * 2) == 1 ? "11:24" : "19:02",
                "用电量": Math.ceil(Math.random() * 100) + "",
                "单仓核算": "无"
            },
            "粮情信息": {
                "仓房温度": Math.ceil(Math.random() * 27 + 25) + "",
                "粮食温度": Math.ceil(Math.random() * 25 + 20) + "",
            },
            "报警信息": {
                "火灾": "无",
                "虫害": "无"
            }
        };
        lastClickBundUI.addTab(uiData);
        lastClickBundUI.bind('close', recover_click_bound);
        function recover_click_bound() {
            lastClickBundUI.destroy();
        }
    });
}

function CameraFly(tarPOS) {
    var offPOS = offset;
    app.camera.flyTo({
        position: [tarPOS[0] + offPOS[0], tarPOS[1] + offPOS[1], tarPOS[2] + offPOS[2]],
        target: [tarPOS[0], tarPOS[1], tarPOS[2]],
        time: 1000
    });
}