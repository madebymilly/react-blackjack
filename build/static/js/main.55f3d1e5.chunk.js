(this["webpackJsonpreact-blackjack"]=this["webpackJsonpreact-blackjack"]||[]).push([[0],[,,,,,,,,,,,,,function(e,a,s){},function(e,a,s){},,function(e,a,s){},function(e,a,s){},function(e,a,s){},function(e,a,s){},function(e,a,s){"use strict";s.r(a);var t=s(1),n=s.n(t),r=s(8),c=s.n(r),u=(s(13),s(2)),i=s(3),o=s(6),d=s(5),l=s(4),v=(s(14),s(0));var j=function(e){return Object(v.jsxs)("div",{className:"Round",children:[Object(v.jsxs)("p",{children:["Round number: ",e.roundnr]}),Object(v.jsx)("button",{onClick:e.resetGame,children:"Start over!"})]})};var b=function(e){return console.log(e.card),Object(v.jsx)("div",{className:"Card",children:"".concat(e.card.rank," of ").concat(e.card.suit," (value: ").concat(e.card.value,")")})};var h=function(e){return Object(v.jsxs)("div",{className:"Bank",children:[Object(v.jsx)("h3",{children:"Bank"}),Object(v.jsx)("div",{className:"Bank-hand",children:Object(v.jsx)("div",{className:"Bank-cards",children:e.hand.map((function(e,a){return Object(v.jsx)(b,{card:e},a)}))})})]})},k=(s(16),function(e){Object(d.a)(s,e);var a=Object(l.a)(s);function s(e){var t;return Object(u.a)(this,s),(t=a.call(this,e)).handleMove=t.handleMove.bind(Object(o.a)(t)),t}return Object(i.a)(s,[{key:"handleMove",value:function(e){e.preventDefault(),this.props.doMove(this.props.move)}},{key:"render",value:function(){var e=this.props.move;return Object(v.jsx)("button",{className:"Move",onClick:this.handleMove,children:e})}}]),s}(t.Component)),p=(s(17),function(e){Object(d.a)(s,e);var a=Object(l.a)(s);function s(){return Object(u.a)(this,s),a.apply(this,arguments)}return Object(i.a)(s,[{key:"render",value:function(){var e=this;return console.log(this.props.hand),Object(v.jsxs)("div",{className:"Hand",children:[Object(v.jsx)("div",{className:"Hand-cards",children:this.props.hand.map((function(e,a){return Object(v.jsx)(b,{card:e},a)}))}),Object(v.jsx)("div",{className:"Hand-moves",children:this.props.moves.map((function(a){return Object(v.jsx)(k,{move:a,doMove:e.props.doMove},a)}))})]})}}]),s}(t.Component));var m=function(e){return Object(v.jsx)("button",{className:"Bet",onClick:function(){e.doBet(e.bet)},children:e.bet})},O=(s(18),function(e){Object(d.a)(s,e);var a=Object(l.a)(s);function s(){return Object(u.a)(this,s),a.apply(this,arguments)}return Object(i.a)(s,[{key:"render",value:function(){var e=this.props,a=e.name,s=e.stacksize,t=e.hands,n=e.moves,r=e.bets,c=e.doMove,u=e.doBet;return Object(v.jsxs)("div",{className:"Player",children:[Object(v.jsx)("h3",{children:"Player"}),Object(v.jsxs)("div",{className:"Player-info",children:[Object(v.jsxs)("p",{className:"Player-name",children:["Name: ",a]}),Object(v.jsxs)("p",{className:"Player-stacksize",children:["Stacksize: ",s]})]}),Object(v.jsx)("div",{className:"Player-hands",children:t.map((function(e){return Object(v.jsx)(p,{hand:e.cards,moves:n,doMove:c},e.id)}))}),Object(v.jsx)("div",{className:"Player-bets",children:r.map((function(e){return Object(v.jsx)(m,{bet:e,doBet:u},e)}))})]})}}]),s}(t.Component)),f=[{suit:"hearts",rank:2,value:2},{suit:"hearts",rank:3,value:3},{suit:"hearts",rank:4,value:2},{suit:"hearts",rank:5,value:5},{suit:"hearts",rank:6,value:6},{suit:"hearts",rank:7,value:7},{suit:"hearts",rank:8,value:8},{suit:"hearts",rank:9,value:9},{suit:"hearts",rank:10,value:10},{suit:"hearts",rank:"J",value:10},{suit:"hearts",rank:"Q",value:10},{suit:"hearts",rank:"K",value:10},{suit:"hearts",rank:"A",value:11},{suit:"diamonds",rank:2,value:2},{suit:"diamonds",rank:3,value:3},{suit:"diamonds",rank:4,value:4},{suit:"diamonds",rank:5,value:5},{suit:"diamonds",rank:6,value:6},{suit:"diamonds",rank:7,value:7},{suit:"diamonds",rank:8,value:8},{suit:"diamonds",rank:9,value:9},{suit:"diamonds",rank:10,value:10},{suit:"diamonds",rank:"J",value:10},{suit:"diamonds",rank:"Q",value:10},{suit:"diamonds",rank:"K",value:10},{suit:"diamonds",rank:"A",value:11},{suit:"clubs",rank:2,value:2},{suit:"clubs",rank:3,value:3},{suit:"clubs",rank:4,value:4},{suit:"clubs",rank:5,value:5},{suit:"clubs",rank:6,value:6},{suit:"clubs",rank:7,value:7},{suit:"clubs",rank:8,value:8},{suit:"clubs",rank:9,value:9},{suit:"clubs",rank:10,value:10},{suit:"clubs",rank:"J",value:10},{suit:"clubs",rank:"Q",value:10},{suit:"clubs",rank:"K",value:10},{suit:"clubs",rank:"A",value:11},{suit:"spades",rank:2,value:2},{suit:"spades",rank:3,value:3},{suit:"spades",rank:4,value:4},{suit:"spades",rank:5,value:5},{suit:"spades",rank:6,value:6},{suit:"spades",rank:7,value:7},{suit:"spades",rank:8,value:8},{suit:"spades",rank:9,value:9},{suit:"spades",rank:10,value:10},{suit:"spades",rank:"J",value:10},{suit:"spades",rank:"Q",value:10},{suit:"spades",rank:"K",value:10},{suit:"spades",rank:"A",value:11}],x=[].concat(f,f,f,f,f,f),y=(s(19),function(e){Object(d.a)(s,e);var a=Object(l.a)(s);function s(e){var t;return Object(u.a)(this,s),(t=a.call(this,e)).state={},t.resetGame=t.resetGame.bind(Object(o.a)(t)),t.doMove=t.doMove.bind(Object(o.a)(t)),t.doBet=t.doBet.bind(Object(o.a)(t)),t}return Object(i.a)(s,[{key:"resetGame",value:function(){console.log("reset game")}},{key:"doMove",value:function(e){console.log("do move:",e)}},{key:"doBet",value:function(e){console.log("do bet:",e)}},{key:"render",value:function(){return Object(v.jsxs)("div",{className:"Board",children:[Object(v.jsx)("h1",{children:"Black Jack!"}),Object(v.jsx)(j,{roundnr:1,resetGame:this.resetGame}),Object(v.jsx)(h,{hand:[this.props.deck[0],this.props.deck[1]]}),Object(v.jsx)("div",{className:"Board-players",children:Object(v.jsx)(O,{name:"Milly",stacksize:1e3,moves:this.props.moves,bets:this.props.bets,doMove:this.doMove,doBet:this.doBet,hands:[{id:0,cards:[this.props.deck[2],this.props.deck[3]]},{id:1,cards:[this.props.deck[4],this.props.deck[5]]},{id:2,cards:[this.props.deck[6],this.props.deck[7]]}]})})]})}}]),s}(t.Component));y.defaultProps={bets:[10,25,50,100,200],moves:["hit","pass","split","double"],deck:x.sort((function(){return.5-Math.random()}))};var N=y;var M=function(){return Object(v.jsx)("div",{className:"App",children:Object(v.jsx)(N,{})})};c.a.render(Object(v.jsx)(n.a.StrictMode,{children:Object(v.jsx)(M,{})}),document.getElementById("root"))}],[[20,1,2]]]);
//# sourceMappingURL=main.55f3d1e5.chunk.js.map