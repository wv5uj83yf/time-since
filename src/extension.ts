import * as vscode from "vscode";
import Timer from "./Timer";

const timesinceconfig = vscode.workspace.getConfiguration("timesince");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "timesince" is now active!');

  const timer = new Timer();
  let startTimer = vscode.commands.registerCommand(
    "timesince.startTimer",
    () => {
      timer.startTimer();
    }
  );

  let stopTimer = vscode.commands.registerCommand("timesince.stopTimer", () => {
    timer.stopTimer();
  });

  let resetTimer = vscode.commands.registerCommand(
    "timesince.resetTimer",
    () => {
      vscode.window
        .showQuickPick(["Yes", "No"], {
          placeHolder: "Do you really want to reset the TimeSince timer?",
          canPickMany: false,
        })
        .then((pick) => {
          if (pick === "Yes") {
            timer.resetTimer();
            vscode.window.showInformationMessage(
              "TimeSince timer has been reset!"
            );
          }
        });
    }
  );

  context.subscriptions.push(startTimer);
  context.subscriptions.push(stopTimer);
  context.subscriptions.push(resetTimer);
}

// this method is called when your extension is deactivated
export function deactivate() {}
