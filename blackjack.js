
function blackjack(name){
	this.username=name;    //玩家姓名
	this.cardData=[];      //玩家手中的牌
	this.sum=0;            //玩家点数总和
	this.renderPos=0;
	this.stop=-1;
  this.bOk=true;
	
}
 //得到2-11随机数
blackjack.prototype.getRandom=function(){
        return Math.ceil(Math.random()*9+2);
  };
//添加一张牌
blackjack.prototype.addCard=function(){
  console.log('addcard')
  var newcard = user.getRandom();
  this.cardData.push(newcard);
  this.render();
  };
//确定A牌应该是11点还是1点
blackjack.prototype.check=function(){
  this.cardData.splice(this.cardData.indexOf(11),1,1);
  this.sumAll();
}

//计算点数总和
blackjack.prototype.sumAll=function(){	
     var self = this;
     this.sum=0;
      this.cardData.map(function(x){
      	return self.sum+=x;
      })
 };


//渲染纸牌
blackjack.prototype.render=function(){
	var len = this.cardData.length;
	var len_index =cardset[this.cardData[this.renderPos]].length;
	var randomindex = parseInt(Math.random()*len_index);
  var pic = cardset[this.cardData[this.renderPos]][randomindex];
    var target;
    if(this.username=='ai'){
        target=ai;
    }
    else{
    	target=you;
    }
//----------------------爆炸------------------------------
if(this.bOk){
  // this.bOk = false;
  var tar = target.childNodes[this.renderPos];
  createBoom(tar);
  target.childNodes[this.renderPos].style.backgroundImage='url(img/'+pic+')';
  var divX = tar.offsetWidth/2;
  var divY = tar.offsetHeight/2;
  var aS = target.getElementsByTagName('span');
  for(var i=0;i<aS.length;i++){
    var sX = aS[i].offsetLeft+aS[i].offsetWidth/2;
    var sY = aS[i].offsetTop+aS[i].offsetHeight/2;
    var disX = (sX-divX)*2*Math.random();
    var disY = (sY-divY)*2*Math.random();
    aS[i].style.WebkitTransition = '0.5s all ease';
    aS[i].style.WebkitTransform = 'perspective(800px) translateX('+disX+'px) translateY('+disY+'px) rotateX('+(Math.random()*360+180)+'deg) rotateY('+(Math.random()*360+180)+'deg) scale('+(Math.random()*2)+','+(Math.random()*2)+')';
    aS[i].style.opacity = 0;
  }
  setTimeout(function(){
    tar.innerHTML = '';
    // bOk = true;
  },5000);
}
//------------------------------------------------
    this.renderPos++;
};
//显示玩家点数总和
blackjack.prototype.end=function(){
    console.log(this.username+this.renderPos)
    var target;
    if(this.username=='ai'){
        target=ai;
    }
    else{
      target=you;
    }
    target.childNodes[this.renderPos].innerHTML=this.sum;
};

var cardset={
  1:['spade01.jpg','heart01.jpg','diamond01.jpg','club01.jpg'],
  11:['spade01.jpg','heart01.jpg','diamond01.jpg','club01.jpg'],
  2:['spade02.jpg','heart02.jpg','diamond02.jpg','club02.jpg'],
  3:['spade03.jpg','heart03.jpg','diamond03.jpg','club03.jpg'],
  4:['spade04.jpg','heart04.jpg','diamond04.jpg','club04.jpg'],
  5:['spade05.jpg','heart05.jpg','diamond05.jpg','club05.jpg'],
  6:['spade06.jpg','heart06.jpg','diamond06.jpg','club06.jpg'],
  7:['spade07.jpg','heart07.jpg','diamond07.jpg','club07.jpg'],
  8:['spade08.jpg','heart08.jpg','diamond08.jpg','club08.jpg'],
  9:['spade09.jpg','heart09.jpg','diamond09.jpg','club09.jpg'],
  10:['spade10.jpg','heart10.jpg','diamond10.jpg','club10.jpg',
      'spade11.jpg','spade12.jpg','spade13.jpg',
      'club11.jpg','club12.jpg','club13.jpg',
      'heart11.jpg','heart12.jpg','heart13.jpg',
      'diamond11.jpg','diamond12.jpg','diamond13.jpg',]
}

//实现爆炸效果==============================
var R = 2;
var C = 4;
    function createBoom(tar){
      for(var i=0;i<R;i++){
        for(var j=0;j<C;j++){
          var oS = document.createElement('span');
          oS.style.width = tar.offsetWidth/C+'px';
          oS.style.height = tar.offsetHeight/R+'px';
          tar.appendChild(oS);
          oS.style.left = j*tar.offsetWidth/C+'px';
          oS.style.top = i*tar.offsetHeight/R+'px';
          oS.style.background = 'url(img/cardback.jpg) -'+oS.offsetLeft+'px -'+oS.offsetTop+'px';
          oS.style.WebkitTransform = 'perspective(800px) rotateX(0) rotateY(0) translateX(0) translateY(0)';
          oS.R = i;
          oS.C = j;
        }
      }
    }
//======================================================

var user = new blackjack('you');     //玩家
var computer = new blackjack('ai');  //电脑
var ai = document.getElementById('computer');
var you = document.getElementById('you');
var start = document.getElementById('gamestart');
var add = document.getElementById('addcard');
var stop = document.getElementById('nomore');
var result = document.getElementById('whowin');
var choosetext = document.getElementById('choosetext');
add.addEventListener('click',operateCard);
start.addEventListener('click',init);
stop.addEventListener('click',stopAdd);

function init(){         
  add.disabled=false;
  stop.disabled=false;
  result.innerHTML='';
  result.setAttribute('class','');
	user.cardData=[];
	computer.cardData=[];
	user.renderPos=0;
	computer.renderPos=1;
	user.stop=-1;
	computer.stop=-1;
  ai.childNodes[0].style.backgroundImage='url(img/cardback.jpg)';
	for(var i=computer.renderPos;i<ai.childNodes.length;i++){
		ai.childNodes[i].style.backgroundImage='';
    ai.childNodes[i].innerHTML='';

	}
	for(var i=user.renderPos;i<you.childNodes.length;i++){
		you.childNodes[i].style.backgroundImage='';
    you.childNodes[i].innerHTML='';
	}
    var i=0,j=0;
    while(i<2){
    	computer.cardData.push(computer.getRandom());
    	user.cardData.push(user.getRandom());
    	i++
    }
    user.sumAll();
    computer.sumAll();
    computer.render();
    while(j++<2){
    	user.render();
    }
    if(user.cardData>21){ 
      if(user.cardData.indexOf(11)!==-1)
      {
        user.check();
      }
      else{
        show('你爆了');
        whoWin();
      }
    }
    else if(computer.cardData>21){
    	if(computer.cardData.indexOf(11)!==-1){
        computer.check();
       }
      else{
        show('电脑爆了');
        whoWin();
      }
    }
}


function operateCard(obj){
  start.disabled=true;
	if(user.stop==-1){
	   user.addCard();
	   user.sumAll();
	     if(user.sum>21){ 
          if(user.cardData.indexOf(11)!==-1)
           {
            user.check();
           }
          else{
            console.log('>21')
            show('你爆了');
            whoWin();
      }
    }
	}
	else{
		stopAdd();
	}
}

function stopAdd(){
	user.stop = 1;
	computerAuto();
  add.disabled=true;
  start.disabled=false;
  stop.disabled=true;
}

function computerAuto(){
   if(computer.sum<10){
   	 computer.addCard();
   	 computer.sumAll();
   	 if(computer.sum>21){
   	 	if(computer.cardData.indexOf(11)!==-1)
      { 
        computer.check();
      }
      else{
        show('电脑爆了');
        whoWin();
      }
   	 }
     else{
     	computerAuto();
     }
   }
   else{
   	  var chance =  parseInt(Math.random()*2);
   	  if(chance==1){
   	  	computer.addCard();
   	    computer.sumAll();
   	      if(computer.sum>21){
            if(computer.cardData.indexOf(11)!==-1)
              { 
                computer.check();
                computerAuto();
                }
                else{
                  show('电脑爆了');
                  whoWin();
                }
   	      }
   	      else if(computer.sum>16&computer.sum<22){
   	      whoWin();
   	      }
          else{
     	    computerAuto();
          }
   	  }
      else{
      	  whoWin();
      }
   }
}

function whoWin(){
  add.disabled=true;
  stop.disabled=true;
  start.disabled=false;
  computer.end();
  user.end();
  if(user.sum<22&&computer.sum<22){
    if(user.sum>computer.sum){
    show('你赢了！')
    computer.renderPos=0;
    computer.render();
     }
    else if(user.sum==computer.sum){
    show('平局');
    computer.renderPos=0;
    computer.render();
     }
    else{
    show('你输了！');
    computer.renderPos=0;
    computer.render();
     }
  } 
  else{
    computer.renderPos=0;
    computer.render();
    if(computer.sum>21&&user.sum>21){
      show('都爆了');
    }
  }
	
}

function show(a){
  result.innerHTML=a;
  result.setAttribute('class','animated bounceInLeft');
}