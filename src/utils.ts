import * as vscode from "vscode";

class Utils {
  getTime(startingTime: string) {
    let currentTime = new Date().toString();
    let totalTime = Date.parse(currentTime) - Date.parse(startingTime);
    let hours = Math.floor((totalTime / 1000 / 3600) % 60);
    let minutes = Math.floor((totalTime / 1000 / 60) % 60);
    let seconds = Math.floor((totalTime / 1000) % 60);

    return { hours, minutes, seconds };
  }

  getText(hours: number, minutes: number, seconds: number) {
    let config = vscode.workspace.getConfiguration("timesince");
    let baseText = `Last ${config.activityName}:  `;

    var hourText = "";
    var minuteText = "";
    var secondText = "";

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

    switch (true) {
      case seconds === 1:
        secondText = "second";
        break;
      case seconds > 1:
        secondText = "seconds";
        break;
      default:
        secondText = "";
    }

    var changedText = "";

    if (hours >= 1 && minutes >= 1) {
      changedText = `${hours} ${hourText} ${minutes} ${minuteText} ago`;
    } else if (hours >= 1) {
      changedText = `${hours} ${hourText} ago`;
    } else if (minutes >= 1) {
      changedText = `${minutes} ${minuteText} ago`;
    } else {
      changedText = `${seconds} ${secondText} ago`;
    }
    return baseText + changedText;
  }

  getColor(minutes: number) {
    var green;
    var red;
    var yellow;
    let config = vscode.workspace.getConfiguration("timesince");
    let statusBarForeground = new vscode.ThemeColor("statusBar.foreground");

    if (config.noColor) {
      return statusBarForeground;
    } else if (config.useTerminalColors) {
      green = new vscode.ThemeColor("terminal.ansiGreen");
      red = new vscode.ThemeColor("terminal.ansiRed");
      yellow = new vscode.ThemeColor("terminal.ansiYellow");
    } else {
      green = config.textColor.green;
      red = config.textColor.red;
      yellow = config.textColor.yellow;
    }

    if (minutes < config.limitTime.average) {
      return green;
    } else if (minutes < config.limitTime.bad) {
      return yellow;
    } else {
      return red;
    }
  }
}

export default Utils;
