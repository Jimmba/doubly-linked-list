const Node = require('./node');

class LinkedList {
    constructor() {
        this.length=0;
        this._head=new Node(null, null, null);
        this._tail=new Node(null, null, null);
        this._head.next=this._tail;
        this._tail.prev=this._head;
    }

    append(data) {
        if(this.length==0){
            this._head.data=data;
            this._tail.data=data;
        }
        this.length++;
        let node = new Node(data, this._tail.prev, this._tail);
        this._tail.prev.next=node;
        this._tail.prev=node;
        this._tail.data=data;
        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        return this.getNode(index).data;
    }

    insertAt(index, data) {
        if (index === 0) {
            this.append(data)
            return this;
        }
        let node=this.getNode(index);
        let newNode= new Node(data, node.prev, node.next);
        node.prev.next=newNode;
        node.next.prev=newNode;
        return this;
    }

    isEmpty() {
        return !this.length;
    }

    clear() {
        this._head.next=this._tail;
        this._tail.prev=this._head;
        this._head.data=null;
        this._tail.data=null;
        this.length=0;
        return this;
    }

    deleteAt(index) {
        let node=this.getNode(index);
        node.prev.next=node.next;
        node.next.prev=node.prev;
        return this;
    }

    reverse() {
        let node=this._head.next;
        for (let i=0; i<this.length; i++){
            let tmpNode = node.prev;
            node.prev=node.next;
            node.next = tmpNode;
            node=node.prev;
        }
        let tmp=this._head;
        this._head=this._tail;
        this._tail=tmp;
        this._head.next=this._head.prev;
        this._head.prev=null;
        this._tail.prev=this._tail.next;
        this._tail.next = null;
        return this;
    }

    indexOf(data) {
        let node=this._head;
        for (let i=0; i<this.length; i++){
            node=node.next;
            if (node.data===data){
                return i;
            }
        }
        return -1;
    }

    getNode(index){
        let node=this._head;
        for (let i=0; i < index + 1; i++){
            node=node.next;
        }
        return node;
    }
}

module.exports = LinkedList;
