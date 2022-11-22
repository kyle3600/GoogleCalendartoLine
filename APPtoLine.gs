const LineNotifyToken = "";    // 請輸入 LINE Notify 存取權杖
const GoogleCalendarID = "";    //請輸入新日曆 ID

const Now = new Date();
const Start = new Date(Now.getFullYear(), Now.getMonth(),Now.getDate(), 0, 0, 0, 0);
const End= new Date(Now.getFullYear(), Now.getMonth(), Now.getDate(), 23, 59, 59, 999);
const Today = Utilities.formatDate(new Date(), "GMT+8", "yyyy/MM/dd")
const GoogleCalendar = CalendarApp.getCalendarById(GoogleCalendarID).getEvents(Start, End);    // 取得開始到結束時間內的事件


function SendNotify() {
  var NotifyContents = "";    //新增 NotifyContents 存取通知內容
  GoogleCalendar.forEach(item=>{
      if (item.getStartTime() <= Now && item.getTag("Confirmed") != "Yes") {
        NotifyContents += (item.getTitle() != "") ? ("\n\n" + item.getTitle() + "\n") : ("\n\n空標題\n");
        NotifyContents += (item.getDescription() != "") ? item.getDescription() : "";
        NotifyContents += Today
      }
    }
  )
  if (NotifyContents) {
    var options =
        {
          "method"  : "post",
          "payload" : {"message" : NotifyContents},
          "headers" : {"Authorization" : "Bearer " + LineNotifyToken}
        };
    UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
  }
}
