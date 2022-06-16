const fs = require('fs');

let helper = {
    jsonData: async (file) => {
        let data = fs.readFileSync(file, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    },
    changeDate: function(num){
        if(num.toString().length == 1){
            num = '0' + num.toString();
        }
        return num;
    },
    convertDate: function(reviewedDate) {
        let dateObj = {};
        let date = new Date(reviewedDate);
        dateObj.start = `${date.getFullYear()}-${this.changeDate(date.getMonth() + 1)}-${this.changeDate(date.getDate())}`;
    
        let endDate = new Date(date.setDate(date.getDate()+1));
        dateObj.end = `${endDate.getFullYear()}-${this.changeDate(endDate.getMonth() + 1)}-${this.changeDate(endDate.getDate())}`;
    
        console.log(dateObj);
        return dateObj
    }
}

module.exports = helper;