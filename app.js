console.log("working hihi");

function adjustCalcBackground(x) {
  let offsetHeight = document.querySelector(".output").offsetHeight;
  if (x.matches) {
    // Adjust calculator background based on input field size
    document.getElementById("glass-board").style.height =
      580 + offsetHeight + "px";
    document.getElementById("glass-board").style.top = "50%";
    document.getElementById("glass-board").style.transform =
      "translate(-50%, -50%)";
  } else {
    document.getElementById("glass-board").style.height =
      580 + offsetHeight + "px";
    document.getElementById("glass-board").style.top = "0px";
    document.getElementById("glass-board").style.transform = "translate(-50%)";
  }
}

let x = window.matchMedia("(min-height: 701px)");
adjustCalcBackground(x); // Call listener function at run time
x.addListener(adjustCalcBackground); // Listener function firing on state changes
