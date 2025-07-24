$(function () {
    // 给左右按钮绑定点击事件
    var ul = $(".right .coffeehouse .coffee-m ul");
    $('.right .coffeehouse .coffee-m .last').on('click', (function () {
        ul.css('left','-305px')
    }))
    $('.right .coffeehouse .coffee-m .next').on('click', (function () {
        ul.css('left','0')
    }))
})