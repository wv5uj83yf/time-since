import * as vscode from "vscode";

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

  private getColor(time: number) {
    var green;
    var red;
    var yellow;
    let config = vscode.workspace.getConfiguration("timesince");

    if (config.textColor.useTerminalColors) {
      green = new vscode.ThemeColor("terminal.ansiGreen");
      red = new vscode.ThemeColor("terminal.ansiRed");
      yellow = new vscode.ThemeColor("terminal.ansiYellow");
    } else {
      green = config.textColor.green;
      red = config.textColor.red;
      yellow = config.textColor.yellow;
    }

    if (time <= 20) {
      return green;
    } else if (time <= 40) {
      return yellow;
    } else {
      return red;
    }
  }

  startTimer() {
    if (this.running) {
      console.log("Already Running!");
      return;
    }
    console.log("starting the timer");

    this.statusBarItem.color = this.getColor(0);
    this.statusBarItem.text = "Starting TimeSince Timer...";
    const dateTime = new Date();
    const startingTime = dateTime.toString();

    this.running = true;
    this.statusBarItem.show();

    this.timer = setInterval(() => {
      let hours = this.getTime(startingTime).hours;
      let minutes = this.getTime(startingTime).minutes;
      let seconds = this.getTime(startingTime).seconds;

      this.statusBarItem.text = this.getText(hours, minutes, seconds);
    }, 1000);
  }

  getText(hours: number, minutes: number, seconds: number) {
    let config = vscode.workspace.getConfiguration("timesince");

    let baseText = `Last ${config.sinceName}:  `;
    this.statusBarItem.color = this.getColor(seconds);

    var hourText = "";
    var minuteText = "";
    switch (true) {
      case hours === 1:
        hourText = "hour";
        break;
      case hours > 1:
        hourText = "hrs";
        break;
      default:
        hourText = "";
    }

    switch (true) {
      case minutes === 1:
        minuteText = "minute";
        break;
      case minutes > 1:
        minuteText = "mins";
        break;
      default:
        minuteText = "";
    }

    var changedText = "";

    if (hours >= 1 && minutes >= 1) {
      changedText = `${hours} ${hourText} ${minutes} ${minuteText}} ago`;
    } else if (hours >= 1) {
      changedText = `${hours} ${hourText} ago`;
    } else if (minutes >= 1) {
      changedText = `${minutes} ${minuteText} ago`;
    } else {
      changedText = `${seconds} seconds ago`;
    }

    return baseText + changedText;
  }

  getTime(startingTime: string) {
    let currentTime = new Date().toString();
    let totalTime = Date.parse(currentTime) - Date.parse(startingTime);
    let hours = Math.floor((totalTime / 1000 / 3600) % 60);
    let minutes = Math.floor((totalTime / 1000 / 60) % 60);
    let seconds = Math.floor((totalTime / 1000) % 60);

    return { hours, minutes, seconds };
  }

  stopTimer() {
    console.log("stopping the timer");
    clearInterval(this.timer);
    this.running = false;
    this.statusBarItem.hide();
  }

  resetTimer() {
    console.log("resetting the timer");
    this.stopTimer();
    this.startTimer();
  }
}

export default Timer;