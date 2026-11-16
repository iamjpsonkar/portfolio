(function () {
  "use strict";

  function initializePrintAction() {
    const button = document.getElementById("print-resume");
    if (!button) return;

    button.addEventListener("click", function () {
      if (typeof window.print === "function") window.print();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePrintAction, { once: true });
  } else { initializePrintAction(); }
})();
