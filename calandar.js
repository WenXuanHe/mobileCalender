/**
 * Created by wenxuan on 2016/3/4.
 */
var calendar = {
    ////变量
    variable : {
        currentDate:new Date().getDate(),  ///今天几号
        currentDay:new Date().getDay(),   ////今天是星期几
        num:-1,        ///传入月份的天数
        firstDay:-1,   ////本月第一天是星期几
        appendHtml:"",  ////要插入的html
        wenkend : ['Sun', 'Mon', 'TUE', 'WED', 'THUR', 'Fri', 'SAT']
    },
    ////阴历转阳历所用的数据
    lunarInfo : [0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,//1900-1909
        0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,//1910-1919
        0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,//1920-1929
        0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,//1930-1939
        0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,//1940-1949
        0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,//1950-1959
        0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,//1960-1969
        0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,//1970-1979
        0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,//1980-1989
        0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,//1990-1999
        0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,//2000-2009
        0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,//2010-2019
        0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,//2020-2029
        0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,//2030-2039
        0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,//2040-2049
    /**Add By JJonline@JJonline.Cn**/
        0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50, 0x06b20,0x1a6c4,0x0aae0,//2050-2059
        0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,//2060-2069
        0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,//2070-2079
        0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,//2080-2089
        0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,//2090-2099
        0x0d520],
    ////配置节日信息，和价格信息
    config:{
        holiday:{
            '0101':"元旦",
            '0214':"情人节",
            '0308':"妇女节",
            '0501':"劳动节",
            "1001":"国庆节"
        },
        price:{
            "20160301":450,
            "20160302":451,
            "20160303":452,
            "20160304":453,
            "20160305":454,
            "20160306":455,
            "20160307":456,
            "20160308":457,
            "20160309":458,
            "20160310":459,
            "20160311":410,
            "20160312":450,
            "20160313":450,
            "20160314":450
        }
    },
    ////农历和阳历日期转换
    getLunar:function(y,m,d, lunarName){
        var y = y || new  Date().getFullYear();
        var obj = calendar.lunar2solar(y , m , d);
        var month = obj.cMonth < 10 ? "0"+ obj.cMonth : "" + obj.cMonth;
        var day = obj.cDay < 10 ? "0"+ obj.cDay : "" + obj.cDay;
        var dayTime = month + day;
        calendar.config.holiday[dayTime] = lunarName;
    },
    ////set历和阳历日期转换
    setLunar:function(){
        calendar.getLunar(2016,5,5,"端午节");
        calendar.getLunar(2016,8,15,"中秋节");
    },
    ////获得传入月份第一天是星期几
    getFirstDay : function(year, month){
        var _variable = {
            y:parseInt(year, 10),
            m: parseInt(month, 10),
            currentYear: new Date().getFullYear(),
            currentMonth:new Date().getMonth()+1,
            firstDay:calendar.variable.currentDay - (calendar.variable.currentDate-1)%7,
            differYear:function(){
                return this.y - this.currentYear;
            },
            differMonth:function(){
                return this.m-this.currentMonth + this.differYear() *12;
            }
        };
        _variable.firstDay < 0 ? _variable.firstDay = _variable.firstDay+7 : _variable.firstDay;
        calendar.variable.firstDay = _variable.firstDay;
        if(_variable.differMonth() > 0)
        {
            var everyDate = 0;
            for(var i = 0; i < _variable.differMonth(); i++){
                var finalMonth = _variable.currentMonth+i>12? _variable.currentMonth+i-12:_variable.currentMonth+i;
                everyDate = calendar.cacualate(year, finalMonth);
                _variable.firstDay += (everyDate % 7);
            }
            calendar.variable.firstDay = _variable.firstDay % 7;
        }
    },
    ////取得传入月份的天数
    cacualate : function(year, month){
        var nommalNum = 30, year = parseInt(year, 10);
        switch (parseInt(month, 10)){
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                nommalNum +=1;
                break;
            case 2:
                if((year %4===0 && year%100!=0)||year % 400==0){
                    nommalNum = 29;
                }else{
                    nommalNum = 28;
                }
                break;
            default:break;
        }
        return nommalNum;
    },

    ////添加到页面
    appendToView : function(appendHtml){
        var s_Calender =   "<div class='calendar'>"+
            "<div class='calendar-head'><input type='hidden' id='calendar_storeData' />"+
            "<div class='calendar-tip'>日历</div>"+
            "<ul>"+
            "<li class='FF8205'>日</li>"+
            "<li>一</li>"+
            "<li>二</li>"+
            " <li>三</li>"+
            " <li>四</li>"+
            "<li>五</li>"+
            "<li class='FF8205'>六</li>"+
            "</ul>"+
            "</div>"+
            "<div class='calendar-body'></div>"+
            "</div>";
        $("body").append(s_Calender);
        $(".calendar-body").append(appendHtml);
        $('.calendar').addClass('show_div').show();
    },

    ////得到最终在页面上的排列
    arrange : function(year, month){
        var _arrange = {
            currentMonth:new Date().getMonth()+1,
            m:month < 10 ? "0" + month : "" + month,
            k:'',
            flag:"grey"
        };
        calendar.getFirstDay(year, month);
        calendar.variable.num = calendar.cacualate(year, month);
        ////标题（几月份）
        calendar.variable.appendHtml +='<div class="calendar-body-month" >'+(year+"年"+month+"月")+'</div><ul class="calendar-body-ul">';

        for(var i = 0, k = 1; k <= calendar.variable.num; i++){
            ////i>7 让i从0开始继续循环
            i === calendar.variable.wenkend.length ? i = 0 : i;

            if(i < calendar.variable.firstDay && k === 1){////为空
                calendar.variable.appendHtml += "<li class='"+calendar.variable.wenkend[i]+"'></li>";
            }else{
                var dayByDay = calendar.variable.currentDate ===k && _arrange.currentMonth===parseInt(month, 10) ? "今天": k;
                if(_arrange.currentMonth===parseInt(month, 10)){
                    if(dayByDay==="今天"){
                        _arrange["flag"] = "";
                    }
                }else{
                    _arrange["flag"] = "";
                }

                _arrange.k = k < 10 ? "0" + k : "" + k;

                ////既没有节日也没有价格添加样式
                if(!(calendar.config.holiday[_arrange.m + _arrange.k] || calendar.config.price[year+_arrange.m + _arrange.k])){
                    calendar.variable.appendHtml += "<li class='"+calendar.variable.wenkend[i]+" lh3 "+_arrange['flag']+"' data-date='"+(year+"-"+month+"-"+k)+"' >";
                }else{
                    calendar.variable.appendHtml += "<li class='"+calendar.variable.wenkend[i]+" "+_arrange['flag']+"' data-date='"+(year+"-"+month+"-"+k)+"' >";
                }

                ////如果没有节日则不加载
                if(calendar.config.holiday[_arrange.m + _arrange.k]){
                    calendar.variable.appendHtml +="<span class='holiday'>"+((calendar.config.holiday[_arrange.m + _arrange.k])||'')+"</span>";
                }
                ////加载当前几号
                calendar.variable.appendHtml += "<span class='date'>"+dayByDay+"</span>";

                ////如果没有price则不加载
                if(calendar.config.price[year+_arrange.m + _arrange.k]){
                    calendar.variable.appendHtml += "<span class='price'>"+calendar.config.price[year+_arrange.m + _arrange.k]+"元</span>";
                }

                calendar.variable.appendHtml +="</li>";
                k++;
            }
        }
        calendar.variable.appendHtml +='</ul>';
        return calendar.variable.appendHtml;
    },
    ////得到拿回的数据
    returnData : function(obj){
        var _returnData = {
            date:$(obj).attr('data-date'),
            holiday:$(obj).find('.prep').text(),
            price:$(obj).find('.app').text(),
            wenkend:""
        };
        for(var i = 0; i< calendar.variable.wenkend.length; i++){
            if($(obj).hasClass(calendar.variable.wenkend[i])){
                switch (i){
                    case 0:
                        _returnData.wenkend = "星期日";
                        break;
                    case 1:
                        _returnData.wenkend = "星期一";
                        break;
                    case 2:
                        _returnData.wenkend = "星期二";
                        break;
                    case 3:
                        _returnData.wenkend = "星期三";
                        break;
                    case 4:
                        _returnData.wenkend = "星期四";
                        break;
                    case 5:
                        _returnData.wenkend = "星期五";
                        break;
                    case 6:
                        _returnData.wenkend = "星期六";
                        break;
                }
            }
        }
        ////把数据存放在一个固定地方
        $("#calendar_storeData").val(JSON.stringify(_returnData));
        return _returnData;
    },
    ////事件处理及回调
    eventListener : function(fn){
        $('.calendar-body-ul li').live("click", function(){
            if($(this).text() && !$(this).hasClass('grey')){
                $('.calendar-body-ul li').removeClass("avtive");
                $(this).addClass('avtive');
                var _data = calendar.returnData(this);
                $('.calendar').hide();
                $('.calendar-body-month.posit').remove();
                fn(_data);
            }
        });

        $(window).scroll(function(){
            var scrollTop = calendar.getScrollTop(), distance=0;
            $.each($(".calendar-body-month"), function(i){
                var $that = $(this);
                distance += $that.next().height() + $that.height();
                if(scrollTop <= distance){
                    var cloneTip = $that.clone().addClass('posit');
                    $('.calendar-body-month.posit').remove();
                    $('body').append(cloneTip);
                    return false;
                }
            });
        });
    },
    /*
     调用arrange函数
     year:年，
     month：月，
     monthSize：传入月后的几个月份长度
     */
    getArrange : function(fn){
        if($('.calendar').length !== 0 ){
            $('.calendar').show();
        }else{
            ////加载事件
            calendar.eventListener(fn);

            ////设置阴历节日
            calendar.setLunar();
            var _getArrange = {
                m: new Date().getMonth() + 1,
                y:new Date().getFullYear(),
                n:10,
                appendHtml:""
            };
            for(var i=0; i<= _getArrange.n; i++){
                var realMonth = _getArrange.m + i;
                if( realMonth > 12 ){
                    _getArrange.y += 1;
                    realMonth -= 12;
                }
                _getArrange.appendHtml = calendar.arrange( _getArrange.y, realMonth);
            }
            calendar.appendToView(_getArrange.appendHtml);
        }
    },

    leapMonth : function(y) { //闰字编码 \u95f0
        return(calendar.lunarInfo[y-1900] & 0xf);
    },

    /**
     * 返回农历y年闰月的天数 若该年没有闰月则返回0
     * @param lunar Year
     * @return Number (0、29、30)
     * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
     */
    leapDays : function(y) {
        if(calendar.leapMonth(y)) {
            return((calendar.lunarInfo[y-1900] & 0x10000)? 30: 29);
        }
        return(0);
    },

    /**
     * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
     * @param lunar Year
     * @return Number (-1、29、30)
     * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
     */
    monthDays : function(y,m) {
        if(m>12 || m<1) {return -1}//月份参数从1至12，参数错误返回-1
        return( (calendar.lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
    },

    /**
     * 返回农历y年一整年的总天数
     * @param lunar Year
     * @return Number
     * @eg:var count = calendar.lYearDays(1987) ;//count=387
     */
    lYearDays : function(y) {
        var i, sum = 348;
        for(i=0x8000; i>0x8; i>>=1) { sum += (calendar.lunarInfo[y-1900] & i)? 1: 0; }
        return(sum+calendar.leapDays(y));
    },
    /**
     * 传入公历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
     * @param y  lunar year
     * @param m lunar month
     * @param d  lunar day
     * @param isLeapMonth  lunar month is leap or not.
     * @return JSON object
     * @eg:console.log(calendar.lunar2solar(1987,9,10));
     */
    lunar2solar : function(y,m,d,isLeapMonth) {	//参数区间1900.1.31~2100.12.1
        var leapOffset = 0;
        var leapMonth = calendar.leapMonth(y);
        var leapDay = calendar.leapDays(y);
        if(isLeapMonth&&(leapMonth!=m)) {return -1;}//传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
        if(y==2100&&m==12&&d>1 || y==1900&&m==1&&d<31) {return -1;}//超出了最大极限值
        var day = calendar.monthDays(y,m);
        if(y<1900 || y>2100 || d>day) {return -1;}//参数合法性效验

        //计算农历的时间差
        var offset = 0;
        for(var i=1900;i<y;i++) {
            offset+=calendar.lYearDays(i);
        }
        var leap = 0,isAdd= false;
        for(var i=1;i<m;i++) {
            leap = calendar.leapMonth(y);
            if(!isAdd) {//处理闰月
                if(leap<=i && leap>0) {
                    offset+=calendar.leapDays(y);isAdd = true;
                }
            }
            offset+=calendar.monthDays(y,i);
        }
        //转换闰月农历 需补充该年闰月的前一个月的时差
        if(isLeapMonth) {offset+=day;}
        //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
        var stmap = Date.UTC(1900,1,30,0,0,0);
        var calObj = new Date((offset+d-31)*86400000+stmap);
        var cY = calObj.getUTCFullYear();
        var cM = calObj.getUTCMonth()+1;
        var cD = calObj.getUTCDate();

        return {cDay:cD, cMonth:cM, cYear:cY};
    },

    getScrollTop : function()
    {
        var scrollTop=0;
        if(document.documentElement&&document.documentElement.scrollTop)
        {
            scrollTop=document.documentElement.scrollTop;
        }
        else if(document.body)
        {
            scrollTop=document.body.scrollTop;
        }
        return scrollTop;
    }
};