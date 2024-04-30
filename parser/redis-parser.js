class RedisParser {
    
    constructor (options) {
        
        const { returnReply, returnError } = options;

        this.returnReply = returnReply;
        this.returnError = returnError;
        
    }

    execute (data) {
        const dataArray = data.toString().split("\r\n"); 

        switch (dataArray[0][0]) {
            case '*': {
                const len = dataArray[0][1];
                let replyArr = [];

                for (let i = 1; i <= len; i++) {
                    replyArr.push(dataArray[2*i]);
                }

                this.returnReply(replyArr);
            }
            break;

            default: {
                this.returnError('Command Not Found! Please try again!');
            }
        }
    }
};

module.exports = {
    RedisParser
};