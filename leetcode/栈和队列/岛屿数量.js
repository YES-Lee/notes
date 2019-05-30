/**
 * 给定一个由 '1'（陆地）和 '0'（水）组成的的二维网格，计算岛屿的数量。
 * 一个岛被水包围，并且它是通过水平方向或垂直方向上相邻的陆地连接而成的。你可以假设网格的四个边均被水包围。
 * 
 * 示例1
 * 输入：
 * 11110
 * 11010
 * 11000
 * 00000
 * 输出：1
 * 
 * 示例2
 * 输入：
 * 11000
 * 11000
 * 00100
 * 00011
 * 输出：1
 */

/**
 * @param {character[][]} grid
 * @return {number}
 * 
 * 使用广度优先遍历，从第一个节点开始访问，如果是1，则将其入队，随后一次访问其四个方向节点，如果是1入队，等待遍历。
 * 每次遍历队列中的节点都将其出队，每次队列被清空记为一个岛屿
 */
function numIslands (grid) {
  const queue = []
  const visited = new Set()

  let count = 0

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (+grid[row][col] === 1 && !visited.has(row + ',' + col)) {
        // 如果为1，入队，并对其周围的点检查入队
        count = count + 1
        const cur = [row, col]
        queue.push(cur.join(','))
        visited.add(cur.join(','))
        while (queue.length !== 0) {
          const p = queue.shift()

          let [tmpRow, tmpCol] = p.split(',')
          tmpRow = +tmpRow
          tmpCol = +tmpCol

          // 检查北方
          const north = tmpRow - 1
          if (north >= 0 && !visited.has(north + ',' + tmpCol) && +grid[north][tmpCol] === 1) {
            queue.push([north, tmpCol].join(','))
            visited.add([north, tmpCol].join(','))
          }
          // 检查南方
          const south = tmpRow + 1
          if (south < grid.length && !visited.has(south + ',' + tmpCol) && +grid[south][tmpCol] === 1) {
            queue.push([south, tmpCol].join(','))
            visited.add([south, tmpCol].join(','))
          }
          // 检查西方
          const west = tmpCol - 1
          if (west >= 0 && !visited.has(tmpRow + ',' + west) && +grid[tmpRow][west] === 1) {
            queue.push([tmpRow, west].join(','))
            visited.add([tmpRow, west].join(','))
          }
          // 检查东方
          const east = tmpCol + 1
          if (east < grid[tmpRow].length && !visited.has(tmpRow + ',' + east) && +grid[tmpRow][east] === 1) {
            queue.push([tmpRow, east].join(','))
            visited.add([tmpRow, east].join(','))
          }
        }
      }
    }
  }

  return count
};

// 深度优先遍历
function DFS (grid, row, col, visited) {
  const p = [row, col]
  if (row === 18 && col === 0) {
    debugger
  }
  if (visited.has(p.join(','))) {
    return
  }

  visited.add(p.join(','))

  const checkNorth = row - 1 >= 0 && +grid[row - 1][col] === 1
  const checkSouth = row + 1 < grid.length && +grid[row + 1][col] === 1
  const checkWest = col - 1 >= 0 && +grid[row][col - 1] === 1
  const checkEast = col + 1 < grid[row].length && +grid[row][col + 1] === 1

  if (!checkNorth && !checkSouth && !checkWest && !checkEast) {
    return
  }

  if (checkNorth) {
    DFS(grid, row - 1, col, visited)
  }

  if (checkSouth) {
    DFS(grid, row + 1, col, visited)
  }

  if (checkWest) {
    DFS(grid, row, col - 1, visited)
  }

  if (checkEast) {
    DFS(grid, row, col + 1, visited)
  }
}

/**
 * 深度优先遍历
 * @param {Array} grid 地图矩阵
 */
function numIslands2 (grid) {
  const visited = new Set()

  let count = 0
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (+grid[row][col] === 1 && !visited.has(row + ',' + col)) {
        count++
        DFS(grid, row, col, visited)
      }
    }
  }

  return count
}

(function main() {
  const grid1 = [
    [1, 1, 1, 1, 0],
    [1, 1, 0, 1, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ]

  const grid2 = [
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1]
  ]

  const grid3 = [
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0"]
  ]

  const grid4 = [
    ["1", "1", "1", "1", "1", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "1", "0", "1", "1"],
    ["0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "1", "1", "1", "1", "1", "0"],
    ["1", "0", "1", "1", "1", "0", "0", "1", "1", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "0", "1", "1", "1", "1", "1", "1", "0", "1", "1", "1", "0", "1", "1", "1", "0", "1", "1", "1"],
    ["0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "1", "1", "0", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "1", "1", "1", "1", "0", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
    ["0", "1", "1", "1", "1", "1", "1", "1", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "0", "1", "1", "1", "1", "1", "1", "1", "0", "1", "1", "1", "1", "1", "1"],
    ["1", "0", "1", "1", "1", "1", "1", "0", "1", "1", "1", "0", "1", "1", "1", "1", "0", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "1", "1", "1", "1", "1", "1", "0"],
    ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "1", "1", "1", "1", "0", "0"],
    ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"]
  ]

  console.time('广度优先遍历耗时')
  console.log('开始广度优先遍历...')
  console.log(numIslands(grid1)) // 1
  console.log(numIslands(grid2)) // 3
  console.log(numIslands(grid3)) // 1
  console.log(numIslands(grid4)) // 1
  console.timeEnd('广度优先遍历耗时')

  console.time('深度优先遍历耗时')
  console.log('开始深度优先遍历...')
  console.log(numIslands2(grid1)) // 1
  console.log(numIslands2(grid2)) // 3
  console.log(numIslands2(grid3)) // 1
  console.log(numIslands2(grid4)) // 1
  console.timeEnd('深度优先遍历耗时')

})()
