//////////////////////////////////////////////////////////
//
//                        demo.js
//
//                   2019, OpenSquareJP
//
//////////////////////////////////////////////////////////

// SETTINGS //////////////////

// 自身のサイトの構成に応じて、遷移させたいページの順に、以下の「ファイル名（〜.html）」を書き換えて下さい。ページ数は任意で、追加可能です。
const FileName = [];
FileName[0] = "index.html";
FileName[1] = "about.html";
FileName[2] = "gallery.html";
FileName[3] = "links.html";
//  以下同様 ：

// マウス操作がなくなってからデモに移行するまでの「経過時間」を設定して下さい。単位は「ミリ秒」です。
const ElapsedTime = 5000; // デフォルト 5秒

// スクロールのフレームインターバルを設定して下さい。数字が小さいほどスクロールが早くなります。
const ScrollInterval = 10; // デフォルト 10ミリ秒


// Global Values /////////////

let demo = false;

let startTime;
let currentTime;

let timer_1;
let timer_2;

let scrollSize;


// Initialize ///////////////

window.onload = function(){

  startTime = new Date();

  document.body.addEventListener('mouseup', ResetTimer, true);
  document.body.addEventListener('mousemove', ResetTimer, true);
  window.addEventListener('resize', ResetTimer, true);
  window.addEventListener('scroll', ResetTimer, true);  // デモに入ると Remove される

  timer_1 = window.setInterval(ElapsedTimeCheck, 500); // 1秒:1000

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
    timer_1 = window.setInterval(ElapsedTimeCheck, 500); // 経過時間チェックを再スタート
  }

  // コンソールにイベントの受信を通知（動作確認用）
  console.log("EventListener：OK");
}

// 時間経過のチェック：timer_1 ///////////////////////

function ElapsedTimeCheck(){

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
    // 最大スクロール量 = ドキュメントの高さ -  ウインドウの高さ
    scrollSize = document.body.scrollHeight - window.innerHeight;
    // タイマーをリセット
    startTime = new Date();
    // デモ（スクロール）を開始
    timer_2 = window.setInterval(DemoScroll, ScrollInterval);
  }
}


// スクロール・アニメーション：timer_2 ///////////////////////

function DemoScroll(){

  // スクロール処理
  window.scrollBy(0, 1);

  // スクロールの終了判定
  if( window.pageYOffset + 1 > scrollSize ){

      // スクロールのタイマーを止める
      window.clearInterval(timer_2);
      // ページを遷移させる
      MoveToNextPage();

      // ページ先頭に戻す
      // ny = 0;
      // window.scrollTo(0, 0);

  }

}

// ページ遷移（あるいはリロード） ////////////////////////

function MoveToNextPage(){

  // シングルページのリロードの場合は以下。
  // window.location.reload(true);

  //let str = window.location.href.split('/').pop();　不採用 注１）

  // URL文字列から、該当する HTMLファイル名を検索する方法を採用
  let str = window.location.href;
  let n = FileName.length;

  let flag = false;
  for( let i=0 ; i<n ; i++ ){
    let result = str.indexOf( FileName[i] );
    if( result > 0) { // 現在のファイル名を発見
      if( i == n-1 ){
        window.location.href = FileName[0];
      }else{
        window.location.href = FileName[i+1];
      }
      flag = true;
      break;
    }
  }

  if( !flag ) window.location.href = FileName[1];　// 必要 注２）

}

// 注　///////////////////////////

// 注１
// URLを分解して、最後の項目を取り出す方法は、
// 通常は、about.html などのファイル名が得られるが、
// ユーザの操作中に URLの最後に #section01 など
// ページ内リンクが付いた場合に文字列の完全一致はなくなるため、
// 結局その中をサーチする必要がある。

// 注２
// 初回アクセスで http://www.example.com などとされた場合に
// 自身の URL に候補の index.html にが含まれない。
// その場合は トップ（index.html）の次へ遷移。
