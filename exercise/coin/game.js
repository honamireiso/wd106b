const coincnt = 15; // コインの数
      　// コイン生成
      　for(var i = 0;i < coincnt;i++){
       　 // liタグを追加
        　$(".sheet").append("<li>");
      　}
      　// コイン全てにcssクラスのnormalを設定
      　$(".sheet").children().addClass("normal");

        // ハズレのコインの番号
        const outcoin = Math.floor( Math.random() * coincnt );
        const safe = 1; // セーフコインのステータス
        const out = 2;  // ハズレコインのステータス
        // コイン全てにdata属性で"1(セーフ)"を設定
        $(".sheet").children().attr("data-role",safe);
        // ハズレコインのdata-roleを"2(ハズレ)"に書き換える
        $(".sheet li").eq(outcoin).attr("data-role",out);


        // コインの画像を切り替える関数
      　function notice(li){
       　 // クリックされたコインのcssクラスを付け替える
       　 if(li.data("role")=="2"){
        　  li.attr("class","out");
         　 // ハズレとわかる様に背景を変更する
          　$("body").css("background-image","url(https://www.otwo.jp/blog/demo/coin/bg_hazure.png)");
        　}else{
         　 li.attr("class","safe");
       　 }
      　}

        // コインの角度を傾ける関数
      　function turn(li , f , b ,motiontime){
       　 // li、開始角度、終了角度、アニメーション時間
        　$({deg:f}).animate({deg:b}, {
         　 duration:motiontime,
          　progress:function(){
          　  $(li).css({transform:'rotateY('+this.deg+'deg)'});
          　}
        　});
      　}


        // 演出内で使用するコインの角度
        const angle_s = 0;
        const angle_e = 90;

      　// 演出1の関数
      　function motion1(li){
      　  // ノーマルな演出
          const motiontime = 50;
        　turn(li,angle_s,angle_e,motiontime);
        　// めくるアニメーションの途中でコインのステータスを変更する
        　setTimeout(function(){
        　  notice(li);
         　 turn(li,angle_e,angle_s,motiontime);
        　},motiontime);
      　}

        // 演出2の関数
        function motion2(li){
          // 長く回転する
          const motiontime = 75;
          for(var i=0;i<=50;i++){
            if(i!=50){
              setTimeout(function(){
                turn(li,angle_s,angle_e,motiontime);
              },(motiontime*i));
            }else{
              //ラストの回転はハズレ・セーフの告知をする
              setTimeout(function(){
                notice(li);
                turn(li,angle_e,angle_s,motiontime);
              },(motiontime*i));
            }
          }
        }

        // 演出3の関数
        function motion3(li){
          // 間をあけて2回転する
          const motiontime = 50;
          turn(li,angle_s,angle_e*2,motiontime*2);
          setTimeout(function(){
            turn(li,0,angle_e,motiontime);
            setTimeout(function(){
              notice(li);
              turn(li,angle_e,angle_s,motiontime);
            },motiontime);
          },1000);
        }

        const arySafe = [6,8,10];
        const aryOut = [3,6,10];
      　var ary = []; // 判定時に使用する配列
      　$(".sheet li").click(function(){
      　  // コインのステータスにより使用する配列を判定
      　  if($(this).data("role")==out){
       　   ary = aryOut;
        　}else{
        　  ary = arySafe;
       　 }

      　  // 演出判定で使用する乱数を発行(1-10)
      　  const random = Math.floor( Math.random() * 10 ) + 1;
       　 // 演出判定
        　if(random <= ary[0]){
       　 　motion1($(this));　// 演出1を実行
        　}else if(random <= ary[1]){
       　 　motion2($(this));　// 演出2を実行
        　}else if(random <= ary[2]){
        　　motion3($(this));　// 演出3を実行
        　}
      　});
