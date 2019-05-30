function GNode(val, neighbors) {
  this.val = val
  this.neighbors = neighbors
}

function cloneGraph(node) {
  const tmpNode = new GNode(node.val, [])
  tmpNode['$id'] = node['$id']

  if (node.neighbors && node.neighbors.length) {
    for (const neighbor of node.neighbors) {
      tmpNode.neighbors.push(cloneGraph(neighbor))
    }
  }

  return tmpNode
}

(function main() {
  const node = {
    "$id": "1",
    "neighbors": [{
      "$id": "2",
      "neighbors": [{
        "$ref": "1"
      }, {
        "$id": "3",
        "neighbors": [{
          "$ref": "2"
        }, {
          "$id": "4",
          "neighbors": [{
            "$ref": "3"
          }, {
            "$ref": "1"
          }],
          "val": 4
        }],
        "val": 3
      }],
      "val": 2
    }, {
      "$ref": "4"
    }],
    "val": 1
  }

  console.log(cloneGraph(node))
})()