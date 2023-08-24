function $(select) {
  return document.querySelector(select);
}

function $$(select) {
  return document.querySelectorAll(select);
}

//区域轮播功能
function createSlider(container, duration, callback) {
  let firstSlider = container.querySelector(".slider-item:first-child");
  let currentIndex = null;
  let cw = firstSlider.clientWidth;
  let count = container.querySelectorAll(".slider-item").length;

  // 自动轮播参数区域
  function switchTo(index) {
    if (index < 0) {
      index = 0;
    }
    if (index > count - 1) {
      index = count - 1;
    }
    firstSlider.style.transition = "all .3s";
    currentIndex = index;
    firstSlider.style.marginLeft = -(currentIndex * cw) + "px";
    callback && callback(index);
  }

  let timer = null;

  // 定时器实现自动轮播
  autoTo();

  function autoTo() {
    if (timer || duration === 0) {
      return;
    }
    timer = setInterval(function () {
      switchTo((currentIndex + 1) % count);
    }, duration);
  }

  //停止自动轮播
  function stopAuto() {
    clearInterval(timer);
    timer = null;
  }

  // 手指按下时
  container.ontouchstart = function (e) {
    let x = e.changedTouches[0].clientX;
    let y = e.changedTouches[0].clientY;
    let mL = parseFloat(firstSlider.style.marginLeft);
    stopAuto();
    firstSlider.style.transition = "none";

    // 移动手指时
    container.ontouchmove = function (e) {
      let disX = e.changedTouches[0].clientX - x; // 手指移动了多远
      let newML = disX + mL;
      let minML = -(count - 1) * cw;
      if (newML < minML) {
        newML = minML;
      }
      if (newML > 0) {
        newML = 0;
      }
      e.preventDefault();
      firstSlider.style.marginLeft = newML + "px";
      // console.log(x);
      // let disY = e.changedTouches[0].clientY;
    };
    // 放开手指时
    container.ontouchend = function (e) {
      let disX = e.changedTouches[0].clientX - x;
      if (disX > 30) {
        switchTo(currentIndex - 1);
      } else if (disX < -30) {
        switchTo(currentIndex + 1);
      }
      autoTo();
    };
  };
  return switchTo;
}

function createBlock(blockContainer) {
  let slider = blockContainer.querySelector(".slider-container");
  let blockMenu = blockContainer.querySelector(".block-menu");
  let goto = createSlider(slider, 0, function (index) {
    let ac = blockMenu.querySelector(".active");
    ac && ac.classList.remove("active");
    blockMenu.children[index].classList.add("active");
  });
  for (let i = 0; i < blockMenu.children.length; i++) {
    blockMenu.children[i].onclick = function () {
      goto(i);
    };
  }
}

// 轮播图
(function () {
  let slider = $(".banner .slider-container");
  createSlider(slider, 3000, function (index) {
    // console.log(123);
    let ac = document.querySelector(".active");
    ac && ac.classList.remove("active");
    document.querySelector(".dots").children[index].classList.add("active");
  });
})();
// 新闻资讯
(function () {
  let slider = $(".news-list .slider-container");
  let newsList = $(".news-list");
  createBlock(newsList);
})();
// 菜单区域
(function () {
  var isExpand = false; // 当前是否是展开状态
  $(".menu .expand").onclick = function () {
    let txt = this.querySelector(".txt");
    let spr = this.querySelector(".spr");
    let menuList = $(".menu .menu-list");
    if (isExpand) {
      // 当前是展开的
      txt.innerText = "展开";
      spr.classList.add("spr_expand");
      spr.classList.remove("spr_collapse");
      menuList.style.flexWrap = "nowrap"; // 弹性盒不换行
    } else {
      // 当前是折叠的
      txt.innerText = "折叠";
      spr.classList.add("spr_collapse");
      spr.classList.remove("spr_expand");
      menuList.style.flexWrap = "wrap"; // 弹性盒换行
    }
    isExpand = !isExpand;
  };
})();
