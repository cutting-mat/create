const SerialPort = require('serialport');
const {renderEventHandle} = require('../background')

let port;

//获取正在使用的串口集合
exports.getPorts = () => {
    return new Promise((res, rej) => {
        SerialPort.list().then((ports) => {
            res(ports)
        }).catch(rej)
    })
}

//打开串口
exports.startPort = (portName) => {
    if (port) {
        try {
            port.close();
        } catch (err) {
            console.warn(err)
        }
    }

    if (!portName || !portName.split) {
        portName = 'COM5'
    }
    //设置串口属性
    port = new SerialPort(portName, {
        baudRate: 9600, //波特率
        dataBits: 8, //数据位
        parity: 'none', //奇偶校验
        stopBits: 1, //停止位
        flowControl: false,
        autoOpen: false, //不自动打开
    }, false);

    port.on('error', (error) => {//捕获错误
        console.log('Error: ', error.message);
    })

    
    port.open(function (error) {
        if (error) {
            console.log("打开端口" + portName + "错误：" + error);
        } else {
            console.log("打开端口" + portName + "成功");
            if (renderEventHandle) {
                renderEventHandle.reply('data-reply', "打开端口" + portName + "成功")
            } 
            // 
            port.on('data', function (data) {
                console.log('Data:', data.toString())
            })
            
        }
    });
}
