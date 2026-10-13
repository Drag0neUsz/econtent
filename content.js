(() => {
  const NEW_SRC =
    "https://lh3.googleusercontent.com/d/1qBi524J1cwB8DiPNCsBQKxAP1upFNK31";

  const OLD_SRC =
    "//eportal.pwr.edu.pl/pluginfile.php/1/theme_remui/logo/1790762509/logoeportal.png";

  function isTargetLogo(img) {
    if (!(img instanceof HTMLImageElement)) return false;

    const src = img.getAttribute("src") || "";
    if (src === OLD_SRC || src.endsWith("/logoeportal.png")) return true;

    return (
      img.classList.contains("navbar-brand-logo") &&
      img.classList.contains("logo") &&
      img.classList.contains("light-logo")
    );
  }

  function swapLogo(img) {
    if (!isTargetLogo(img)) return;
    if (img.getAttribute("src") === NEW_SRC) return;
    img.setAttribute("src", NEW_SRC);
  }

  function scan(root = document) {
    root.querySelectorAll?.("img").forEach(swapLogo);
    if (root instanceof HTMLImageElement) swapLogo(root);
  }

  scan();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes" && mutation.target instanceof HTMLImageElement) {
        swapLogo(mutation.target);
      }
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) scan(node);
      }
    }
  });

  const startObserving = () => {
    if (!document.documentElement) return;
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src", "class"],
    });
    scan();
  };

  if (document.documentElement) {
    startObserving();
  } else {
    document.addEventListener("DOMContentLoaded", startObserving, { once: true });
  }
})();
