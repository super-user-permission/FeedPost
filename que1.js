function Node(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }    
  
  // create nodes
  var root = new Node(10);
  var n1 = new Node(20);
  var n2 = new Node(23);
  var n3 = new Node(11);
  var n4 = new Node(18);
  
  // setup children
  root.left = n1;
  root.right = n2;
  n1.left = n3;
  n1.right = n4;

function inOrder(root, nodes) {
    if (root && root.left) {
        inOrder(root.left, nodes);   
    }
    nodes.push(root.data);
    if (root && root.right) {
        inOrder(root.right, nodes);  
    }
    return nodes;
}

console.log(inOrder(root,[]));