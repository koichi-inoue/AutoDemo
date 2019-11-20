// SETTINGS ///////////////////////////////////

// 設定項目１
// 自身のサイトの構成に応じて、遷移させたいページの順に、以下の「ファイル名（〜.html）」を書き換えて下さい。ページ数は任意で、追加可能です。
let FileName = [];
FileName[0] = "index.html";
FileName[1] = "about.html";
FileName[2] = "gallery.html";
FileName[3] = "links.html";
//  以下同様 ：

// 設定項目２
// 閲覧者のマウス操作がなくなってからデモモードに移行するまでの「経過時間」を設定して下さい。単位は「ミリ秒」です（ 1000で１秒 ）。
let ElapsedTime = 5000; // デフォルト 5秒

// 設定項目３
// スクロールアニメーションのフレームインターバルを設定して下さい。数字が小さいほどスクロールが早くなります。
let ScrollInterval = 10; // デフォルト 20ミリ秒


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
    timer_2 = window.setInterval(Scroll, ScrollInterval);
    console.log(document.body.scrollHeight);
    console.log(window.innerHeight);
  }
}


// スクロール・アニメーション：timer_2 ///////////////////////

function Scroll(){

  // スクロール処理
  window.scrollBy(0, 1);

  // 垂直方向のスクロール量 と Window の innerHeight を加える
  y = window.pageYOffset + window.innerHeight;

  // 上記 y がドキュメンの ScrollHeight と一致した時点でスクロールの終了
  if( y >= document.body.scrollHeight ){

      // スクロールのタイマーを止める
      window.clearInterval(timer_2);
      // ページを遷移させる
      ChangeNextPage();

      // ページ先頭に戻す
      // ny = 0;
      // window.scrollTo(0, 0);

  }

}

// ページ遷移（あるいはリロード） ////////////////////////

function ChangeNextPage(){

  // シングルページのリロードの場合は以下。
  // window.location.reload(true);

  // URLを分解して、最後の項目を取り出す方法（URLの最後に#などが付くと不完全）
  //let str = window.location.href.split('/').pop();
  let str = window.location.href;
  let n = FileName.length;

  let flag = false;
  for( let i=0 ; i<n ; i++ ){
    let result = str.indexOf( FileName[i] );
    if( result > 0) { // 発見
      if( i == n-1 ){
        window.location.href = FileName[0];
      }else{
        window.location.href = FileName[i+1];
      }
      flag = true;
      break;
    }
  }
  // 初回アクセスで http://www.example.com などとされた場合
  // 自身の URLが候補に該当しない。その場合はトップへ遷移。
  if( !flag ) window.location.href = FileName[0];

}
