/**
 * 根据每日 气温 列表，请重新生成一个列表，对应位置的输入是你需要再等待多久温度才会升高的天数。如果之后都不会升高，请输入 0 来代替。
 * 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。
 * 提示：气温 列表长度的范围是 [1, 30000]。每个气温的值的都是 [30, 100] 范围内的整数。
 */

/**
 * 思路：
 */

function MyStack() {
  this.data = []
}

// 取栈顶元素
MyStack.prototype.top = function () {
  return this.data[this.data.length - 1]
}

// 入栈
MyStack.prototype.push = function (value) {
  this.data.push(value)
  return true
}

// 出栈
MyStack.prototype.pop = function () {
  return this.data.pop()
}

Object.defineProperty(MyStack.prototype, 'size', {
  get() {
    return this.data.length
  },
  set(value) {
    throw new Error('只读属性不允许修改')
  }
})

function dailyTemperatures(T) {
  const result = []
  for (let i = 0; i < T.length; i++) {
    for (let j = i + 1; j < T.length; j++) {
      if (T[j] > T[i]) {
        result.push(j - i)
        break
      }
    }
    if (result.length < i + 1) {
      result.push(0)
    }
  }
  return result
}

(function main() {
  const temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
  console.log(dailyTemperatures(temperatures))
})()