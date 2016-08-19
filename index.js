'use strict';

// "Requeue" (i.e., queue) a function to occur at next idle time.
// Replaces previously requeued function unless each has a defined .grade property and new grade >= old grade.
function requeue(fn) {
    if (
        !this.requeueMethod ||
        this.requeueMethod.grade === undefined ||
        fn.grade === undefined
    ) {
        this.requeueMethod = fn;
    } else if (
        fn.grade >= this.requeueMethod.grade
    ) {
        dequeue();
        this.requeueMethod = fn;
    }
    this.requeueTimer = setTimeout(this.requeueMethod);
}

// Dequeue previously queued function.
function dequeue() {
    clearTimeout(this.requeueTimer);
}

function mixInTo(object) {
    object.requeue = requeue;
    object dequeue = dequeue;
}

module.exports = mixInTo;
