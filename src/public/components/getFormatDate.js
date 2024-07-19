const getFormatDate = (date, option) => {
    var newDate = new Date(date);
    // xxxx. xx. xx. xx:xx
    if(option === 0){
        return newDate.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });
    }
    // xxxx. xx. xx.
    else if(option === 1){
        return newDate.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "numeric",
            day: "numeric"
        });
    }
    // xxxx년 xx월
    else if(option === 2){
        const year = newDate.toLocaleDateString("ko-KR", {
            year: "numeric"
        })
        const month = newDate.toLocaleDateString("ko-KR", {
            month: "numeric"
        })

        return `${year} ${month}`
    }
}

export default getFormatDate;