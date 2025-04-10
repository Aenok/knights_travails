class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.edges = [];
    }

    // toString() {
    //     console.log(`Node(${this.x}, ${this.y}) - Edges ${this.edges}`);
    // }
}

function populateGraph() {


    let nodeArray = [];

    // Creates the vertices
    for(let i = 0; i < 8; i++) {
        nodeArray.push([]);
        for(let j = 0; j < 8; j++) {
            nodeArray[i].push(new Node(i, j));
        }
    }

    let currNode;
    
    // Populates each vertices with the correct edges
    for(let i = 0; i < nodeArray.length; i++) {
        for(let j = 0; j < nodeArray[i].length; j++) {

            currNode = nodeArray[i][j];

            if((i + 1 < 8) && (j + 2 < 8)) {
                currNode.edges.push(nodeArray[i+1][j+2]);
            }

            if((i + 1 < 8) && (j - 2 >= 0)) {
                currNode.edges.push(nodeArray[i+1][j-2]);
            }

            if((i + 2 < 8) && (j + 1 < 8)) {
                currNode.edges.push(nodeArray[i+2][j+1]);
            }

            if((i + 2 < 8) && (j - 1 >= 0)) {
                currNode.edges.push(nodeArray[i+2][j-1]);
            }

            if((i - 1 >= 0) && (j + 2 < 8)) {
                currNode.edges.push(nodeArray[i-1][j+2]);
            }

            if((i - 1 >= 0) && (j - 2 >= 0)) {
                currNode.edges.push(nodeArray[i-1][j-2]);
            }

            if((i - 2 >= 0) && (j + 1 < 8)) {
                currNode.edges.push(nodeArray[i-2][j+1]);
            }

            if((i - 2 >= 0) && (j - 1 >= 0)) {
                currNode.edges.push(nodeArray[i-2][j-1]);
            }
        }
    }
    return nodeArray;
}

let arr = populateGraph();
console.log(arr);