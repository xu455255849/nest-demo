// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
// https://developer.mozilla.org/zh-CN/docs/Web/API/Blob
import { Buffer, Blob } from 'buffer';


// 创建长度为 10 的以零填充的缓冲区。
const buf1 = Buffer.alloc(10);

// 创建长度为 10 的缓冲区，
// 使用值为 `1` 的字节填充。
const buf2 = Buffer.alloc(10, 1);

// 创建长度为 10 的未初始化的缓冲区。
// 这比调用 Buffer.alloc() 快，
// 但返回的缓冲区实例可能包含旧数据，
// 需要使用 fill()、write() 、
// 或其他填充缓冲区内容的函数重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建包含字节 [1, 2, 3] 的缓冲区。
const buf4 = Buffer.from([1, 2, 3]);

// 创建包含字符串 'tést' 的 UTF-8 编码字节的缓冲区：
// [0x74, 0xc3, 0xa9, 0x73, 0x74]（十六进制）
// [116, 195, 169, 115, 116]（十进制）
const buf6 = Buffer.from('tést');

// buffer 转字符串
const buf7 = Buffer.from('hello world', 'utf-8');
console.log(buf7.toString('base64'));
console.log(buf7.toString('hex'));

for (const b of buf6) {
  console.log(b, 111)
}

const blob = new Blob(['hello world'], {
  type: 'image/png',
});


console.log(blob);