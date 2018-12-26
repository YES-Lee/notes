/**
 * JavaScript基于模运算的简单加密算法
 * 
 * TODO: 学习密码学
 * 
 * 需求：高等数学、线性代数、数论、数理统计
 * 
 * steps：
 * 假设字符串abc123
 * 1. 将字符串全部转成ascii码数组[97, 98, 99, 49, 50, 51]
 * 2. 将所有ascii码相加得到一个数字444
 * 3. 每一个ascii码加上上一步得到的数字[541, 542, 543, 493, 494, 495]
 * 4. 所有ascii码除以36取余数得到余数数组[1, 2, 3, 25, 26, 27]
 * 5. 将4数字全部转换为36进制，然后拼接在一起为加密后的字符串123pqr
 * 6. 全部转为大写
 * 
 * 
 * 思考：进行模运算之后得到余数，如何从余数还原原来的的数字
 */

 function crypto (str) {
   const strArr = str.split('');
   const arr1 = strArr.map(c => c.charCodeAt());
   const num = arr1.reduce((sum, a) => sum + a);
   const arr2 = arr1.map(c => c + num);
   const arr3 = arr2.map(c => c % 36);
   const arr4 = arr3.map(c => c.toString(36));
   return arr4.join('').toUpperCase();
 }

 console.log(crypto('joenlee1126'));
