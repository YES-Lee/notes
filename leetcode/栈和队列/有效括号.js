/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 * 有效字符串需满足：
 *  1. 左括号必须用相同类型的右括号闭合。
 *  2. 左括号必须以正确的顺序闭合。
 * 注意空字符串可被认为是有效字符串。
 * 示例 1:
 * 输入: "()"
 * 输出: true
 * 
 * 示例 2:
 * 输入: "()[]{}"
 * 输出: true
 * 
 * 示例 3:
 * 输入: "(]"
 * 输出: false
 * 
 * 示例 4:
 * 输入: "([)]"
 * 输出: false
 * 
 * 示例 5:
 * 输入: "{[]}"
 * 输出: true
 */

/**
 * 思路：将字符串压入栈中，每次遇到与栈底括号闭合的括号则新建一个栈
 * @param {String} s
 */
function validString (s) {
  const cMap = {
    '(': ')',
    '[': ']',
    '{': '}'
  }

  if (s % 2 !== 0) {
    return false
  }

  if (s.length === 0) {
    return true
  }
}

(function main () {
  const str = ''
  const isValid = validString(str)
  console.log(isValid)
})()
