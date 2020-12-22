const getNode = function (className) {
  return document.querySelector(className);
}

const getChildNode = function (node, className) {
  return Array.from(node.children).filter(child => child.className.includes(className))[0];
}

export default getNode;
