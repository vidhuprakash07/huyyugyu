let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {

    const getEvent = (e) => e.touches ? e.touches[0] : e;

    const move = (e) => {
      if (!this.holdingPaper) return;

      e = getEvent(e);

      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      let velX = this.mouseX - this.prevMouseX;
      let velY = this.mouseY - this.prevMouseY;

      this.currentPaperX += velX;
      this.currentPaperY += velY;

      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;

      paper.style.transform =
        `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
    };

    const start = (e) => {
      e = getEvent(e);

      this.holdingPaper = true;

      paper.style.zIndex = highestZ;
      highestZ++;

      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;
    };

    const end = () => {
      this.holdingPaper = false;
    };

    // Mouse events
    paper.addEventListener("mousedown", start);
    document.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);

    // Touch events (THIS FIXES MOBILE)
    paper.addEventListener("touchstart", start);
    document.addEventListener("touchmove", move);
    window.addEventListener("touchend", end);
  }
}

const papers = document.querySelectorAll(".paper");

papers.forEach(paper => {
  new Paper().init(paper);
});
