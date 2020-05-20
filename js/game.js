const numDivs = 36;
const maxHits = 10;

let hits = 0;
let miss = 0;
let firstHitTime = 0;

function round() {
  // (DONE) FIXME: надо бы убрать "target" прежде чем искать новый
  if (hits > 0) {
    $("div[class*=target]").text("");
    $("div[class*=target]").removeClass("target");
    $("div[class*=miss]").removeClass("miss");
  }
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // (DONE) TODO: помечать target текущим номером
  $("div[class*=target]").text(hits + 1);
  // (DONE) (перенесено в кнопку старт) FIXME: тут надо определять при первом клике firstHitTime
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // (DONE) FIXME: спрятать игровое поле сначала
  $(".game-field").addClass("d-none");
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#score-penalty").text(miss);
  $("#total-score").text((totalPlayedSeconds - miss).toPrecision(3));
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // (DONE) (в функции round) FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  } else {
      $(event.target).addClass("miss");
      miss = miss + 1;
    
    }
  // (DONE) TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // (DONE) TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#button-start").click(function() {
    round();
    $("#button-start").addClass("d-none");
    $("#button-reload").removeClass("d-none");
    firstHitTime = getTimestamp();
  });

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    // location.reload();
    restartGame();
  });
}

function restartGame() {
  hits = 0;
  miss = 0;
  firstHitTime = getTimestamp();
  $("div[class*=target]").text("");
  $("div[class*=target]").removeClass("target");
  $("div[class*=miss]").removeClass("miss");
  $(".game-field").removeClass("d-none");
  $("#win-message").addClass("d-none");
  round();
}
$(document).ready(init);
