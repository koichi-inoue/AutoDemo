// SETTINGS ///////////////////////////////////

// 設定事項１
// 自身のサイトの構成に応じて、遷移させたいページの順に
// 以下の「ファイル名（〜.html）」を書き換えて下さい。
// 数は任意に追加可能です。
let FileName = [];
FileName[0] = "index.html";
FileName[1] = "about.html";
FileName[2] = "gallery.html";
FileName[3] = "links.html";
// FileName[4] = "xxxxx.html";
// FileName[5] = "xxxxxxx.html";
//      ：

// 設定事項２
// 閲覧者のマウス操作がなくなってから
// デモモードに移行するまでの「経過時間」を設定して下さい。
// 単位は「ミリ秒」です（ 1000で１秒 ）。
let ElapsedTime = 5000; // msec


// Global Values /////////////

let demo = false;

let startTime;
let currentTime;

let timer_1;
let timer_2;

let wy = 0;
let y;


// Initialize ///////////////

window.onload = function(){

  startTime = new Date();

  document.body.addEventListener('mouseup', ResetTimer, true);
  document.body.addEventListener('mousemove', ResetTimer, true);
  window.addEventListener('resize', ResetTimer, true);
  window.addEventListener('scroll', ResetTimer, true);  // デモに入ると Remove される

  timer_1 = window.setInterval(OperationCheck, 500); // 1秒:1000

}


// イベント検知 ////////////////

function ResetTimer( event ){

  // タイマーをリセット
  startTime = new Date();

  // デモモードからの戻りの場合
  if( demo == true ){
    demo = false; // 通常操作モードへ戻す
    window.clearInterval(timer_2); // 自動スクロールを止める
    window.addEventListener('scroll', ResetTimer, true); // イベントリスナー復活
    timer_1 = window.setInterval(OperationCheck, 500); // OperationCheck を再スタート
  }

  // コンソールにイベントの受信を通知（動作確認用）
  console.log("EventListener：OK");
}

// 時間経過のチェック：timer_1 ///////////////////////

function OperationCheck(){

　// デモモードへの移行タイミングチェック
  currentTime = new Date();

  if( currentTime - startTime > ElapsedTime ){

    // デモへ移行
    demo = true;
    // スクロールイベントの検知を無効化
    window.removeEventListener('scroll', ResetTimer, true);
    // 時間経過の計測をストップ
    window.clearInterval(timer_1);

    // ページの先頭へ移動
    window.scrollTo(0, 0);

    // タイマーをリセット
    startTime = new Date();
    // デモ（スクロール）を開始
    timer_2 = window.setInterval(Scroll, 20);

  }
}


// スクロール・アニメーション：timer_2 ///////////////////////

function Scroll(){

  // スクロール処理
  window.scrollBy(0, 1);

  // 垂直方向のスクロール量を取得
  y = window.pageYOffset;

  // スクロールの終了をチェック
  if(wy == y){

      // ページを遷移させる
      ChangeNextPage();

      // ページ先頭に戻す
      // ny = 0;
      // window.scrollTo(0, 0);

  } else {

    // スクロール量を更新
    wy = y;
  }

}

// ページ遷移（あるいはリロード） ////////////////////////

function ChangeNextPage(){

  // シングルページのリロードの場合は以下。
  // location.reload(true);

  let str = window.location.href.split('/').pop();
  let n = FileName.length;

  if( str == FileName[n-1]){
    location.href = FileName[0];
  } else {
    for( let i=0; i<n-1; i++ ){
      if( str == FileName[i]) {
        location.href = FileName[i+1];
        break;
      }
    }
  }

}
