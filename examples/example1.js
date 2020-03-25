var GDriveStrings = require("../dist/index");

// pages to process
var PAGE_1 = "https://docs.google.com/spreadsheets/d/e/2PACX-1vShmL8AkNUcAjsvKWxmoTr2FWIr7CURzoPMnlNCFLxWiqpQuUAmEhpAxoNsISP86CV1mlhOazerZebG/pub?gid=0&single=true&output=csv"
var PAGE_2 = "https://docs.google.com/spreadsheets/d/e/2PACX-1vShmL8AkNUcAjsvKWxmoTr2FWIr7CURzoPMnlNCFLxWiqpQuUAmEhpAxoNsISP86CV1mlhOazerZebG/pub?gid=888955463&single=true&output=csv"
var SHEET_CSV_URLS = [
  PAGE_1,
  PAGE_2,
]

// define the configuration to apply
var configuration = {
	outputType: "json",
  outputPath: "./examples/strings",
	tempPath: "./dist/node-strings-temp.csv",
	debug: true,
}

var core = new GDriveStrings.Core();
core.run(SHEET_CSV_URLS, configuration, function(result) {
	if (result) {
		console.log("Strings OK - STRINGS UPDATED")
	} else {
		console.log("Strings ERROR - CHECK STRINGS Something has changed")
	}
})

