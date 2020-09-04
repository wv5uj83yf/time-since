# TimeSince README

Use TimeSince to see how long has passed since you last did a task.

## Features

Set the name of the activity you are timing. TimeSince will create a simple timer on the status bar to show you how long it has been since you last did that activity. The text has 3 colors: green, yellow, and red, to show you at a quick glance how long it has been since you did your activity. Green is the 'safe' zone, yellow is the 'average' zone, and red is the 'bad' zone. Try to complete your activity again before the red zone!

TimeSince defaults to using 3 preselected colors, however you can change the colors to whatever you want, use your integrated terminals ansiGreen, ansiYellow, and ansiRed colors, or remove the colorizing option completely.

## Requirements

VS Code

## Extension Settings

This extension contributes the following settings:

- `timesince.activityName`: name of your task
- `timesince.useTerminalColors`: use default terminal colors for text output
- `timesince.noColor`: TimeSince will not colorize your text based on the time, the text color will be the same as the statusbar text color
- `timesince.textColor.green`: set color for green text
- `timesince.textColor.yellow`: set color for yellow text
- `timesince.textColor.red`: set color for red text
- `timesince.limitTime.average`: set time (in minutes) where the average range starts
- `timesince.limitTime.bad`: set time (in minutes) where the bad range starts

## Known Issues

## Release Notes

### 1.0.0

Initial release

## Acknowledgements

Icon by Freepik from [flaticon](https://www.flaticon.com/)

---
