import node from "./node.js";

function linkedList() {
  let _head = null;

  return {
    append: (value) => {
      let current = _head;

      if (current !== null) {
        while (current.nextNode !== null) {
          current = current.nextNode;
        }

        current.nextNode = node(value);
      } else {
        _head = node(value);
      }
    },
    prepend: (value) => {
      if (_head !== null) {
        let temp = _head;
        _head = node(value, temp);
      } else {
        _head = node(value);
      }
    },
    size: () => {
      if (_head === null) {
        return 0;
      } else {
        let currentNode = _head;
        let count = 1;

        while (currentNode.nextNode !== null) {
          count = count + 1;
          currentNode = currentNode.nextNode;
        }

        return count;
      }
    },
    head: () => _head,
    tail: () => {
      if (_head !== null) {
        let tail = _head;

        while (tail.nextNode !== null) {
          tail = tail.nextNode;
        }

        return tail;
      } else {
        return _head;
      }
    },
    at: (index) => {
      if (index < 0) {
        return null;
      }

      let nodeAtIndex = _head;

      let currentIndex = 0;

      while ((currentIndex < index) & (nodeAtIndex !== null)) {
        nodeAtIndex = nodeAtIndex.nextNode;
        currentIndex = currentIndex + 1;
      }

      return nodeAtIndex;
    },
    pop: () => {
      if (_head !== null) {
        if (_head.nextNode !== null) {
          let current = _head;

          while (current.nextNode.nextNode !== null) {
            current = current.nextNode;
          }

          current.nextNode = null;
        } else {
          _head = null;
        }
      }
    },
    contains: (value) => {
      let current = _head;

      while (current !== null) {
        if (current.value === value) {
          return true;
        }

        current = current.nextNode;
      }

      return false;
    },
    find: (value) => {
      let current = _head;
      let currentIndex = 0;

      while (current !== null) {
        if (current.value === value) {
          return currentIndex;
        }

        currentIndex += 1;
        current = current.nextNode;
      }

      return null;
    },
    toString: () => {
      let current = _head;
      let result = "";

      while (current !== null) {
        result += `( ${current.value} ) -> `;
        current = current.nextNode;
      }

      result += "null";
      return result;
    },
    insertAt: (value, index) => {
      if ((index <= 0) | (_head === null)) {
        let temp = _head;
        _head = node(value, temp);

        return;
      }

      let nextIndex = 1;
      let currentNode = _head;

      while ((currentNode.nextNode !== null) & (nextIndex !== index)) {
        currentNode = currentNode.nextNode;
        nextIndex += 1;
      }

      let nextNode = currentNode.nextNode;
      currentNode.nextNode = node(value, nextNode);
    },
    removeAt: (index) => {
      if ((index < 0) | (_head === null)) {
        return;
      }

      if (index === 0) {
        _head = _head.nextNode;
        return;
      }

      let previous = _head;
      let current = previous.nextNode;
      let currentIndex = 1;

      while ((current !== null) & (currentIndex < index)) {
        previous = current;
        current = current.nextNode;
        currentIndex += 1;
      }

      if (current !== null) {
        previous.nextNode = current.nextNode;
      }
    },
  };
}

export default linkedList;
