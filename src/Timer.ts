import * as vscode from "vscode";
import Utils from "./utils";

class Timer {
  running: boolean;
  timer: any;
  statusBarItem: vscode.StatusBarItem;

  constructor() {
    this.running = false;
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left
    );
    this.statusBarItem.command = "timesince.resetTimer";
  }

  utils = new Utils();

  startTimer() {
    if (this.running) {
      console.log("Already Running!");
      return;
    }
    console.log("starting the timer");

    this.statusBarItem.color = this.utils.getColor(0);//this.utils.getColor(0);
    this.statusBarItem.text = "Starting TimeSince Timer...";
    const dateTime = new Date();
    const startingTime = dateTime.toString();

    this.running = true;
    this.statusBarItem.show();

    this.timer = setInterval(() => {
      let hours = this.utils.getTime(startingTime).hours;
      let minutes = this.utils.getTime(startingTime).minutes;
      let seconds = this.utils.getTime(startingTime).seconds;
      let hoursToMins = hours * 60;

      this.statusBarItem.color = this.utils.getColor(hoursToMins + minutes);
      this.statusBarItem.text = this.utils.getText(hours, minutes, seconds);
    }, 1000);
  }

  stopTimer() {
    if (!this.running) {
      return;
    }
    console.log("stopping the timer");
    clearInterval(this.timer);
    this.running = false;
    this.statusBarItem.hide();
  }

  resetTimer() {
    if (!this.running) {
      return;
    }
    console.log("resetting the timer");
    this.stopTimer();
    this.startTimer();
  }
}

export default Timer;
