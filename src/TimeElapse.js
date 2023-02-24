export const TimeElapse = (date) =>{
	var current = Date();
	var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	var days = Math.floor(seconds / (3600 * 24));
	seconds = seconds % (3600 * 24);
	var hours = Math.floor(seconds / 3600);
	if (hours < 10) {
		hours = "0" + hours;
	}
	seconds = seconds % 3600;
	var minutes = Math.floor(seconds / 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	seconds = seconds % 60;
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	// var result = "第 <span class=\"digit\">" + days + "</span> 天 <span class=\"digit\">" + hours + "</span> 小时 <span class=\"digit\">" + minutes + "</span> 分钟 <span class=\"digit\">" + seconds + "</span> 秒"; 
	// return {
    //     days, hours, minutes, seconds
    // };
    return  <>
    <div id="clock-box">
        <span className='lead-text'>我们已经在一起...</span>
        第 <span className="digit"> {days} </span> 天 <span className='digit'> {hours} </span> 小时 <span className="digit"> {minutes} </span> 分钟 <span className="digit"> {seconds} </span> 秒
    </div>
    </>
}