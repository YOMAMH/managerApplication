var GlobalFunction = require('./function');

// API Version
ApiVersion = 'v1.0';

// LOG
// log type
LogsLog = 'logs';
DBLog = 'database';
DataLog = 'data';
GetLog = 'get';
PostLog = 'post';
DeleteLog = 'delete';
ServerLog = 'server';
// alert type
AlertTrace = 'trace';
AlertDebug = 'debug';
AlertInfo = 'info';
AlertWarning = 'warning';
AlertError = 'error';

// 加密校验KEY
SecretKey = 'C27859C07889C2E166D287AFD9C5914E';

// 文件上传路径
ImageFileUploadPath = '/workspace/upload/image';
OtherFileUploadPath = '/workspace/upload/file';

// DELETE function list
DeleteFunctionList = {
    '':{
        name:'',
        function:'',
        info:''
    }
};

// 生产环境数据库
ProDataBase = {
    host:'',
    database:'',
    user:'',
    password:''
};

// 测试环境数据库
TestDataBase = {
    host:'192.168.1.90',
    database:'',
    user:'koucl',
    password:'koUclo#%!'
};

// 邮件
MailSend = {
    maintenance: {
        from: {
            name: '维护',
            service: 'exmail',
            auth: {
                user: '',
                pass: ''
            }
        },
        to: [
            ''
        ]
    },
    daily: {
        from: {
            name: '日常',
            service: 'exmail',
            auth: {
                user: '',
                pass: ''
            }
        },
        to: [
            ''
        ]
    }
};