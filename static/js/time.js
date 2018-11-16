export default function dateStr(date){
    //获取js 时间戳
    var time=new Date().getTime();
    date = new Date(date)/1000
    time=parseInt((time-date*1000)/1000);
    var s;
    if(time<60*5){//十分钟内
        return '刚刚';
    }else if((time<60*60)&&(time>=60*5)){
        //超过十分钟少于1小时
        s = Math.floor(time/60);
        return  s+"分钟前";
    }else if((time<60*60*24)&&(time>=60*60)){ 
        //超过1小时少于24小时
        s = Math.floor(time/60/60);
        return  s+"小时前";
    }else if((time<60*60*24*3)&&(time>=60*60*24)){ 
        //超过1天少于3天内
        s = Math.floor(time/60/60/24);
        return s+"天前";
    }else{ 
        //超过3天
        var date= new Date(parseInt(date) * 1000);
        return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate() +' '+date.getHours()+':'+date.getMinutes();
    }
}
