/**
 * Created by ajex from http://www.ajexoop.com
 * versions 0.0.2.1
 */
import WXLoader from './WXLoader'
import WXStageGL from './WXStageGL'
import WXGraphics from './WXGraphics'

var img,stage,loadPic,selectArea,model,modelData,container,loadingView,gameStartView,gameView,pauseView,selectView,endView,currentView,mainCar,daojishi,stageWidth,stageHeight,stageScale;
// var loadlib = window.loadlib;
// var lib = window.lib;
// var images = window.images;
var View = window.View;

//showprz宝箱标识 0 无宝箱 1 银宝箱 2 金宝箱
// var gameid,numid,showprz,wxflag,isShowBox = false,boxDistance = 0,prizeText="",blogText="快点来玩梦梦战车吧！";
window.isServiceStartGame = false;//是否通过服务开始游戏（是否单机玩游戏是否有宝箱）
//var testTxt;
window.model = new createjs.EventDispatcher();
window.modelData = {};
window.showprz = "";
window.isStart = false;
window.checkFps = false;
window.gameid = "";
window.numid = "";
window.wxflag = "";
window.isShowBox = false;
window.boxDistance = 0;
window.prizeText = "";
window.blogText = "快点来玩梦梦战车吧！";
window.arrowStatus = ""

stageWidth =  document.documentElement.clientWidth;
stageHeight = document.documentElement.clientHeight;
//PlayDual Variables
var centerX;
var centerY;
var green = "#00CA9D";
var blue = "#4BCAFF";
var yellow = "#F6D034";
var pink = "#E01062";
var white = "#FFF";
var black = "#333";
var gray = "#EAEAEA";
var lightGray = "#C8B2B2";
var darkGray = "#AA9696";
var pink = "#E01062";
var purple = "#A106D0";
//
var about;
var aboutButton;
var aboutText;
//sound
var sound;
var soundButton;
var soundText;
// ABOUT SECTION
var aboutOverlay;
var aboutOverlayBG;
var closeAbout;
var closeAboutButton;
var closeAboutArrow;
var aTitle1;
var aTitle2;
var aSubTitle1;
var aSubTitle2;
///
var stage = new createjs.Stage(canvas);
createjs.Touch.enable(stage);
stage.enableMouseOver(20);

// createjs.Ticker.setFPS(60);
// createjs.Ticker.addEventListener("tick", tick);
// createjs.Ticker.setPaused(true);

var animations = [];

var startOverlay = new createjs.Container();
var darkOverlay = new createjs.Container();
var winOverlay = new createjs.Container();

var soundOn = true;

// BOARD

var board = new createjs.Container();

// BACKGROUND

var bg = new createjs.Shape();
bg.graphics.beginFill("#AAA5A5");
bg.graphics.rect(0, 0, canvas.width, 890);
bg.cache(0, 0, canvas.width, 890);

var winGrid = new createjs.Shape();
winGrid.graphics.beginFill(pink);
winGrid.graphics.rect(0, 0, canvas.width, 890);
winGrid.alpha = 0;

// BUILD GRID

// var boardGrid = new Grid(3, 180, 890, 145);
// board.addChild(bg, boardGrid);

// var gameObjects = new createjs.Container();

  // GAME MGMT & SCORES

init();
function init() {
  
  wx.onShareAppMessage()
  
   stage = new createjs.Stage(canvas);
   //开启webgl的时候 需要解开initStageWH方法里的注释 webgl开启是矢量元素都不支持 需要额外的cache或者转为位图
  // stage = new WXStageGL(canvas);//使用stagegl需要外部引入StageGL文件 然后直接new 而不是new createjs.WXStageGL()

  
    container = new createjs.Container();
    stage.addChild(container);
    //createjs.Touch.enable(stage);
    initStageWH();


    // createjs.Ticker.timingMode =  createjs.Ticker.RAF_SYNCHED;//暂时不支持这种模式 使用这种模式需要修改帧频换算单位
    // createjs.Ticker.setFPS(60);
    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", stageBreakHandler);
  
    
    var loader = new WXLoader();
    loader.addEventListener("fileload", handleFileLoad)
    loader.addEventListener("complete", loadCompleteHandler)
    // loader.load(lib.properties.manifest, true)//暂时只支持单图片加载，sprite的加载模式因为消耗性能实际上也不用支持

    ////PlayDual related
    //Variables
    // var canvas = document.getElementById("easel"),
    centerX = container.width / 2;
    centerY = container.height / 2;
    // var green = "#00CA9D";
    // var blue = "#4BCAFF";
    // var yellow = "#F6D034";
    // var pink = "#E01062";
    // var white = "#FFF";
    // var black = "#333";
    // var gray = "#EAEAEA";
    // var lightGray = "#C8B2B2";
    // var darkGray = "#AA9696";
    // var pink = "#E01062";
    // var purple = "#A106D0";
    //about
    about = new createjs.Container().set({ x: 100, y: 80 });
    aboutButton = new createjs.Shape().set({ x: -150, y: -70 });
  aboutButton.graphics.beginFill(green).drawRect(0, 0, 400, 200);
    aboutButton.alpha = 0.1;
    aboutText = new createjs.Text("ABOUT", "100 40px Avenir-Book", white).set({ x: 0, y: 0 });
    aboutText.textAlign = "left";
    about.addChild(aboutButton, aboutText);
    //sound
  sound = new createjs.Container().set({ x: canvas.width - 100, y: 80 });
  soundButton = new createjs.Shape().set({ x: -250, y: -70 });
  soundButton.graphics.beginFill(green).drawRect(0, 0, 400, 200);
  soundButton.alpha = 0.1;
  soundText = new createjs.Text("MUTE", "100 40px Avenir-Book", white).set({ x: 0, y: 0 });
  soundText.textAlign = "right";
  sound.addChild(soundButton, soundText);
  // ABOUT SECTION
  aboutOverlay = new createjs.Container().set({ x: 0, y: 0 });

  aboutOverlayBG = new createjs.Shape();
  aboutOverlayBG.graphics.beginFill(blue).drawRect(0, 0, canvas.width, 900);

  closeAbout = new createjs.Container().set({ x: centerX - 50, y: 780 });
  closeAboutButton = new createjs.Shape();
  closeAboutButton.graphics.beginFill(blue).drawRect(-50, -25, 225, 125);
  closeAboutArrow = new createjs.Shape();
  closeAboutArrow.graphics.beginStroke(white).setStrokeStyle(20, "round", "round");
  closeAboutArrow.graphics.moveTo(0, 50);
  closeAboutArrow.graphics.lineTo(50, 0);
  closeAboutArrow.graphics.lineTo(100, 50);
  closeAbout.addChild(closeAboutButton, closeAboutArrow);
  aTitle1 = new createjs.Text("Design + Code: Sam Wander", "400 60px Avenir-Heavy", white).set({ x: centerX, y: 150 });
  aTitle1.lineWidth = 1000;
  aTitle1.textAlign = "center";

  aTitle2 = new createjs.Text("Music: Maria Usbeck", "400 60px Avenir-Heavy", white).set({ x: centerX, y: 250 });
  aTitle2.lineWidth = 1000;
  aTitle2.textAlign = "center";

  aSubTitle1 = new createjs.Text("DUAL was built as part of a thesis project for the MFA Interaction Design program at The School of Visual Arts in New York.", "200 40px Avenir-Medium", white).set({ x: centerX, y: 440 });
  aSubTitle1.lineWidth = 1200;
  aSubTitle1.lineHeight = 55;
  aSubTitle1.textAlign = "center";

  aSubTitle2 = new createjs.Text("Thanks to Ted Case-Hayes, The MFA IxD Faculty \& Class of 2015.", "200 40px Avenir-Medium", white).set({ x: centerX, y: 580 });
  aSubTitle2.lineWidth = 1200;
  aSubTitle2.lineHeight = 55;
  aSubTitle2.textAlign = "center";

  aboutOverlay.addChild(aboutOverlayBG, aTitle1, aTitle2, aSubTitle1, aSubTitle2, closeAbout);
  aboutOverlay.visible = false;

    //display dual elements
  container.addChild(about);
  container.addChild(sound);
  container.addChild(aboutOverlay);
    //
  about.removeAllEventListeners();
  // about.addEventListener("mousedown", highlightButton);
  // about.addEventListener("pressup", showAbout);
  about.addEventListener("click", showAbout);
  about.alpha = 1;
}
function highlightButton(event) {
  if (event.currentTarget.name == "next") {
    tutorialNextLabel.alpha = .5;
  } else {
    event.currentTarget.alpha = .5;
  }
  stage.update();
}
//function handleVisibilityChange() {
//    if (document.hidden) {
//        if(typeof WeixinJSBridge != 'undefined')
//        {
//            WeixinJSBridge.call('closeWindow');
//        }
//        //pauseSimulation();
//    } else  {
//        //startSimulation();
//    }
//}
function showAbout() {
  console.log("showAbout() called");
  // about.removeAllEventListeners();
  sound.removeAllEventListeners();
  // learn.removeAllEventListeners();
  // start.removeAllEventListeners();
  // next.removeAllEventListeners();

  // createjs.Ticker.setPaused(false);

  // closeAbout.addEventListener("mousedown", highlightButton);
  // closeAbout.addEventListener("pressup", aboutToStart);
  closeAbout.addEventListener("click", aboutToStart);

  about.alpha = 1;

  aboutOverlay.visible = true;

  createjs.Tween.get(about, { override: true }).call(addAnim, [0]).to({ alpha: 0 }, 300, createjs.Ease.cubicIn);
  createjs.Tween.get(sound, { override: true }).to({ alpha: 0 }, 300, createjs.Ease.cubicIn);
  // createjs.Tween.get(learn, {override:true}).to({alpha:0}, 300, createjs.Ease.cubicIn);
  // createjs.Tween.get(startOverlay, { override: true }).to({ y: 900 }, 600, createjs.Ease.cubicIn).call(rmAnim);

  function aboutToStart() {
    console.log("aboutToStart() called");
    //document.getElementById("link").style.display="none";

    // createjs.Ticker.setPaused(false);
    createjs.Tween.get(about, { override: true }).call(addAnim, [0]).to({ alpha: 1 }, 300, createjs.Ease.cubicIn);
    createjs.Tween.get(sound, { override: true }).to({ alpha: 1 }, 300, createjs.Ease.cubicIn);
    // createjs.Tween.get(learn, {override:true}).to({alpha:1}, 300, createjs.Ease.cubicIn);
    createjs.Tween.get(startOverlay, { override: true }).to({ y: 0 }, 600, createjs.Ease.cubicIn).call(cleanAbout);

    function cleanAbout() {

      about.removeAllEventListeners();
      about.addEventListener("mousedown", highlightButton);
      about.addEventListener("pressup", showAbout);

      sound.removeAllEventListeners();
      sound.addEventListener("mousedown", highlightButton);
      sound.addEventListener("pressup", toggleSound);

      learn.addEventListener("mousedown", highlightButton);
      learn.addEventListener("pressup", beginTutorial);

      start.addEventListener("mousedown", highlightButton);
      start.addEventListener("pressup", beginGame);

      next.addEventListener("mousedown", highlightButton);
      next.addEventListener("pressup", showNext);

      rmAnim();
      closeAbout.alpha = 1;
      aboutOverlay.visible = false;
      stage.update();
    }
  }
}
// ------------- ANIMATION -----------------
var endTweenCheck = 0;
function addAnim(t) {
  animations.push(t);
}
function rmAnim(t) {
  animations.pop();
  endTween();
}
function tick(event) {
  if (!event.paused) {
    stage.update(event);
  }
}
function endTween() {
  if (animations.length < 1) {
    endTweenCheck++;
    if (endTweenCheck < 2) {
      window.setTimeout(endTween, 500);
    } else {
      createjs.Ticker.setPaused(true);
      //console.log("ticker paused");
      endTweenCheck = 0;
    }
  }
}
function loadHandleFileLoad(evt)
{
    if (evt.item.type == "image") { loadimages[evt.item.id] = evt.result; }
}
function handleFileLoad(evt) {
    if (evt.item.type == "image") 
    { 
      images[evt.item.id] = evt.result;
      // console.log(evt.result)
    }
}
function playSound(id, loop) {
    createjs.Sound.play(id, createjs.Sound.INTERRUPT_EARLY, 0, 0, loop);
}
function setCookie(name, value, expires, path, domain, secure){
    var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    if(expires instanceof Date){
        cookieText += "; expires=" + expires.toGMTString();
    }
    if(path){
        cookieText += "; path=" + path;
    }
    if(domain){
        cookieText += "; domain=" + domain;
    }
    if(secure){
        cookieText += "; secure";
    }

    document.cookie = cookieText;
};

function loadProgressHandler(event)
{
    loadingView.back.bar.gotoAndStop(Math.floor(event.progress*99));
//    loadingView.back.icon.txt.text = Math.floor(event.progress*99).toString() + "%";
}
function loadCompleteHandler(event)
{
  event.currentTarget.addEventListener("fileload", handleFileLoad)
  event.currentTarget.addEventListener("complete", loadCompleteHandler)

   

    View.init(container);
    Sound.init();

    gameStartView = window.gameStartView;
    gameView = window.gameView;
    daojishi = window.daojishi;
    pauseView = window.pauseView;


    gameStartView.init();

    // var g = new WXGraphics();//此代码与本游戏无关 看到的童鞋记一下 安卓要使用shape必须手动传入WXgraphics类
    // var shape = new createjs.Shape(g);
    // shape.graphics.setStrokeStyle(3);
    // shape.graphics.beginStroke("#F00");
    // shape.graphics.drawRect(0,0,200,200);
    // stage.addChild(shape);
}
function stageBreakHandler(event)
{
    stage.update();
}
function initStageWH()
{
  //获取屏幕宽高  
  wx.getSystemInfo({
    success: function (res) {
      stageWidth = res.windowWidth*2;
      stageHeight = res.windowHeight*2;
      canvas.width = stageWidth;
      canvas.height = stageHeight;
      stageScale = stageHeight / 1206;
      container.scaleX = stageScale;
      container.scaleY = stageScale;
      container.x = (stageWidth - 750 * container.scaleX) / 2;
      // stage.updateViewport(canvas.width, canvas.height)//开启webgl的时候需要开启这句话
      createjs.Touch.addWXTouch(stage, res.windowWidth, res.windowHeight);
    }
  }) 
}
