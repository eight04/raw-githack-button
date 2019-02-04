// ==UserScript==
// @name Github raw.githack.com Button
// @version 0.0.0
// @description A userscript to add raw.githack.com button on Github.
// @homepageURL https://github.com/eight04/raw-githack-button#readme
// @supportURL https://github.com/eight04/raw-githack-button/issues
// @license MIT
// @author eight <eight04@gmail.com> (https://github.com/eight04)
// @namespace https://github.com/eight04
// @include https://github.com/*
// @include https://gist.github.com/*
// @grant none
// ==/UserScript==

(() => {
  const container =
    document.querySelector("#js-repo-pjax-container") ||
    document.querySelector("#js-pjax-container");

  if (container) {
    new MutationObserver(function(){
      replace();
    }).observe(container, {childList: true, subtree: true});
  }

  replace();
  
  function replace(){
    // Check if raw-url button exists
    var btns, i;
    btns = document.querySelectorAll(".file-actions a:not(.raw-githack)");
    for (i = 0; i < btns.length; i++) {
      if (btns[i].textContent == "Raw") {
        createButton(btns[i]);
      }
    }
  }

  function createButton(btn) {
    var url = btn.href;
    if (url.indexOf("gist.github.com") >= 0) {
      url = url.replace("gist.github.com", "raw.githack.com");
    } else {
      url = url.replace(/github\.com\/([^/]+\/[^/]+)\/raw/, "raw.githack.com/$1");
    }

    var newBtn = btn.cloneNode(false);
    newBtn.href = url;
    newBtn.textContent = "raw.githack";
    newBtn.removeAttribute("id");

    btn.parentNode.insertBefore(newBtn, btn.nextSibling);
    btn.classList.add("raw-githack");
    
    if (!btn.parentNode.classList.contains("btn-group")) {
      var parent = btn.parentNode,
        group = document.createElement("div");
      group.className = "btn-group";
      while (parent.childNodes.length) {
        group.appendChild(parent.childNodes[0]);
      }
      parent.appendChild(group);
    }
  }
})();
