class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.edges = [];
        this.predecessor = null;
    }
}

// Sets up the "graph" by creating nodes and populating their edge array according to the chess knight pieces possible movement
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

            if((i + 2 < 8) && (j + 1 < 8)) {
                currNode.edges.push(nodeArray[i+2][j+1]);
            }

            if((i + 1 < 8) && (j + 2 < 8)) {
                currNode.edges.push(nodeArray[i+1][j+2]);
            }

            if((i - 1 >= 0) && (j + 2 < 8)) {
                currNode.edges.push(nodeArray[i-1][j+2]);
            }

            if((i - 2 >= 0) && (j + 1 < 8)) {
                currNode.edges.push(nodeArray[i-2][j+1]);
            }

            if((i - 2 >= 0) && (j - 1 >= 0)) {
                currNode.edges.push(nodeArray[i-2][j-1]);
            }

            if((i - 1 >= 0) && (j - 2 >= 0)) {
                currNode.edges.push(nodeArray[i-1][j-2]);
            }

            if((i + 1 < 8) && (j - 2 >= 0)) {
                currNode.edges.push(nodeArray[i+1][j-2]);
            }

            if((i + 2 < 8) && (j - 1 >= 0)) {
                currNode.edges.push(nodeArray[i+2][j-1]);
            }
        }
    }
    return nodeArray;
}

function knightMoves(startObj, destObj) {
    if((startObj[0] > 7 || startObj[0] < 0 || startObj[1] > 7 || startObj[1] < 0) || (destObj[0] > 7 || destObj[0] < 0 || destObj[1] > 7 || destObj[1] < 0)) {
        console.error("Out of bounds. Numbers must be between 0 and 7.");
        return;
    }


    let newSet = new Set(); // To check if the node has been visited already
    let queue = []; // To keep track of which node to visit next. Search algorithm uses BFS method
    queue.push(arr[startObj[0]][startObj[1]]);
    newSet.add(arr[startObj[0]][startObj[1]]);

    let currNode;
    let found = false;

    /* currNode becomes the first element on the queue which is removed. currNodes edges are iterated over. If the edge node in question is not part of the set, it is added to the queue and set
    and its predecessor becomes "currNode". We then check to see if the edge node is the one we are looking for. If it is, set found to true and exit the for loop. While loop ends afterwards.
    */
    while(!found) {
        currNode = queue.shift();
        for(let i = 0; i < currNode.edges.length; i++) {
            if(!newSet.has(currNode.edges[i])) {
                queue.push(currNode.edges[i]);
                newSet.add(currNode.edges[i]);
                currNode.edges[i].predecessor = currNode;
            }
            if(currNode.edges[i].x == destObj[0] && currNode.edges[i].y == destObj[1]) {
                found = true;
                break;
            }
        }
    }

    // Set currNode to target node from array and backtrack through predecessors, adding each to the retVal array. Finally, print out results of retVal.
    let retVal = [];
    currNode = arr[destObj[0]][destObj[1]];

    while(currNode != null) {
        retVal.unshift(currNode);
        currNode = currNode.predecessor;
    }

    console.log(`You made it in ${retVal.length-1} moves! Heres your path:`)
    for(let i = 0; i < retVal.length; i ++) {
        console.log(`[${retVal[i].x}, ${retVal[i].y}]`);
    }
}

let arr = populateGraph();

knightMoves([0,0], [7,7]);