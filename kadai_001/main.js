let untyped = "";
let typed ="";
let score = 0;
let wordcount = 0;

const untypedfield = document.getElementById("untyped");
const typedfield = document.getElementById("typed");
const wrap = document.getElementById("wrap");
const start = document.getElementById("start");
const count = document.getElementById("count");

const textLists = [
    'Hello World','This is my App','How are you?',
    'Today is sunny','I love JavaScript!','Good morning',
    'I am Japanese','Let it be','Samurai',
    'Typing Game','Information Technology',
    'I want to be a programmer','What day is today?',
    'I want to build a web app','Nice to meet you',
    'Chrome Firefox Edge Safari','machine learning',
    'Brendan Eich','John Resig','React Vue Angular',
    'Netscape Communications','undefined null NaN',
    'Thank you very much','Google Apple Facebook Amazon',
    'ECMAScript','console.log','for while if switch',
    'var let const','Windows Mac Linux iOS Android',
    'programming'
]

const createText = () => {
    typed = "";
    typedfield.textContent = typed;

    untyped = textLists[Math.floor(Math.random()*textLists.length)];
    untypedfield.textContent = untyped;
};


const keyPress = e  => {

    if(e.key !== untyped.substring(0, 1)) {
        //divのクラスにもう一つ"mistyped"というクラスを追加する。←最初からhtmlの方で、divのクラスとして設定してしまうと常に背景が赤になってしまう。
        //よって、ミスタイプが出た時のみクラスを追加することでcssで設定した赤の背景色が出現するようにしている。
        wrap.classList.add("mistyped");

        setTimeout(()=>{
            wrap.classList.remove("mistyped")
        },100);
        return; //returnで関数から抜けている。
      }


    //正しくタイプされたということで、divのクラスの"mistyped"というクラスを削除する。
    wrap.classList.remove("mistyped");
    score++;
    //**********【質問】***********スペースキーを入力した時も一文字としてカウントされてしまう。スペースでのカウントを除外する方法はある？
    // if(e.key === " "){
    //     return;
    // }
    wordcount++;
    textCount(wordcount);
    typed += untyped.substring(0,1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent=untyped;
    


    if(untyped === ""){
        createText()
    }
};

const rankCheck = score => {
    let rank = 0
    ranklist = ["C","B","A","S"]
    if(score < 100 ){
        rank = 0;
    } else if(score < 200){
        rank = 1;
    } else if(score < 300){
        rank = 2;
    } else if(score >= 300){
        rank = 3;
        return `${score}文字打てました！\nあなたのランクは${ranklist[rank]}ランクです。\nおめでとうございます!\n【OK】リトライ/【キャンセル】終了`;

    }

    //ダイアログ画面ではリターンした文字がが表示されるみたい
    return `${score}文字打てました！\nあなたのランクは${ranklist[rank]}ランクです。\n${ranklist[rank+1]}ランクまであと${(rank+1)*100-score}です。\n【OK】リトライ/【キャンセル】終了`;
};

const gameOver = id =>{
    clearInterval(id);
    console.log("ゲームオーバー！！");
    //一度入力済みフィールドにある文字をリセットしないとタイムアップ！時に残ってしまうので空白文字にする。
    typedfield.textContent = " ";
    untypedfield.textContent="タイムアップ！";

    //************【質問】**************タイムアップ！の文字を点滅させるにはどうしたらいい？


    //「0.1秒後にダイアログの関数を呼び出す」とすれば、先の"タイムアップ！"の文字が表示される！"
    setTimeout(()=>{
        //confirmメソッドでボタン付きのダイアログを出す。true/falseで戻り値を返す。
        const result = confirm(rankCheck(score));
        console.log(result);

        if(result == true){
        //現在表示している Webページを再読み込み
            window.location.reload();
        }
    },100);
    

};

const timer = () => {

    let time = count.textContent;
    const id = setInterval(() =>{
        time -= 1;
        count.textContent = time;
        
        if(time <= 0){
            gameOver(id);
        }
    }, 1000);
};


const textCount = wordcount =>{
    const textcount = document.getElementById("textcount");
    textcount.textContent = wordcount;
};

start.addEventListener("click",()=>{
    createText();
    //javascriptからcssの表示を制御する。HTML要素.style.display=blok/inline/noneなど。noneは非表示。
    start.style.display = "none";
    document.addEventListener("keypress",keyPress);
    timer();
    textCount(0);
})
untypedfield.textContent = "スタートボタンで開始";