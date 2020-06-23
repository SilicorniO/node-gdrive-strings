const SHOW_STACK_LINE = false;
const SHOW_DATE = true;
const SHOW_LEVEL = true;

export enum LogLevel {
  DEBUG = 0,
  INFO = 0,
  ERROR = 0,
  WARNING = 0,
}

export default class Log {

  static showLogs: boolean = true;
  static showLogsDebug: boolean = false;

  static d(text: string){
    if(Log.showLogsDebug){
      Log.log(LogLevel.DEBUG, text, null);
    }
  }
  
  static do(text: string, obj: any){
    if(Log.showLogsDebug){
      Log.log(LogLevel.DEBUG, text, obj);
    }
  }
  
  static i(text: string){
    Log.log(LogLevel.INFO, text, null);
  }
  
  static e(text: string){
    Log.log(LogLevel.ERROR, text, null);
  }

  static w(text: string){
    Log.log(LogLevel.WARNING, text, null);
  }
  
  static log(
    level: LogLevel,
    text: string,
    obj
  ){
  
      if(!Log.showLogs) {
          return;
      }
  
      //text to show
      let logText = ""
  
      //prepare date
      if (SHOW_DATE) {
          logText = "[" + (new Date()).toISOString() + "]";
      }
  
      //add level
      if (SHOW_LEVEL) {
          logText += "[" + level + "]";
      }
  
      //stack line
      if(SHOW_STACK_LINE){
          logText += "[" + Log.getStackLine() + "]";
      }
      
      //text 
      logText += " " + text;
      
      //show log
      switch(level) {
          case LogLevel.DEBUG: 
              console.log(logText);
              break;
          case LogLevel.INFO: 
              console.info(logText);
              break;
          case LogLevel.ERROR: 
              console.error(logText);
              break;
          case LogLevel.WARNING: 
              console.warn(logText);
              break;
      }
      
  
      //object
      if(obj != null){
          console.log(obj);
      }
  }
  
  static getStackLine(){
    const err = new Error();
    const lines = err.stack.split('\n');
    if(lines.length>5){
      const words = lines[4].trim().split(' ');
      if(words.length>2){
          return words[1];
      }else{
          return lines[4];
      }
    }else{
      return '';
    }
  }
    
}

