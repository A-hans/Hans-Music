var str = 'fdhfgcsaedvcfhgfh';
var index = str.indexOf('f'); // 字符出现的位置
var num = 0; // 这个字符出现的次数
while(index !== -1) {
    console.log(index); // 打印字符串出现的位置
    num++; // 每出现一次 次数加一
    index = str.indexOf('f',index + 1); // 从字符串出现的位置的下一位置开始继续查找
}
console.log('f一共出现了' + num + '次');