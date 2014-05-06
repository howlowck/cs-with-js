var debugging = false;
var details = true;
var arrayCount = 20;
var testArray = getRandomArray(arrayCount);
// testArray = [873, 74, 982, 692, 936, 817, 943, 639, 956, 552, 269];

// testArray = [780, 905, 338, 673, 795, 248, 43, 393, 131, 563];
// testArray = [2, 4, 5, 10, 8, 9, 9, 4, 2, 10, 5, 10];
// testArray = [946, 2355, 4755, 775, 1];
// testArray = [804, 265, 1666, 3939, 4901, 3167, 2893, 551, 1013, 934];
// testArray = [1575, 70, 770, 920, 1575, 1772, 1459, 1875, 2436, 2103, 2217, 2673, 4308, 3570, 3843, 3578, 3025, 3721, 3931, 4110];
// testArray = [4662, 2587, 3337, 3922, 3084, 4183, 902, 1292, 1538, 4652, 4304, 777, 4970, 4781, 4111, 3115, 3518, 2314, 2072, 4013];
testArray = [927, 2961, 4057, 571, 4385, 3223, 3244, 485, 4139, 2164, 2559, 999, 4735, 3744, 3782, 3354, 3991, 1979, 4231, 1436];

var sorts = [
  // 'bubbleSort1',
  // 'bubbleSort2',
  // 'selectionSort',
  // 'insertionSort',
  // 'mergeSort',
  'quickSort',
];

function runSort(testArray, funcName) {
  console.log('----------------');
  console.log('starting ' + funcName);
  d(testArray);
  var start = new Date();
  eval('testArray.' + funcName + '()');
  var end = new Date();
  d(testArray);
  if (testArray.increasing()) {
    console.log('it successfully completed in ' + (end - start) + ' ms!');
  } else {
    console.log('it unsuccessfully completed in ' + (end - start) + ' ms!');
  }
  console.log('----------------');
}

function dd(string) {
  if (debugging == true) {
    console.log(string);
  }
}

function d(string) {
  if (details == true) {
    console.log(string);
  }
}

Array.prototype.swap = function (index1, index2) {
  var val1 = this[index1],
      val2 = this[index2];
  this[index1] = val2;
  this[index2] = val1;
};

Array.prototype.increasing = function () {
  var result = true;
  for (var i = 0; i < this.length - 1; i++) {
    if (this[i]> this[i+1]) {
      result = false;
    }
  }

  return result;
};

function getRandomArray(count) {
  var results=[];
  for (var i = 0; i < count; i++) {
    results.push(Math.ceil(Math.random() * 5000));
  }
  return results;
}

Array.prototype.bubbleSort1 = function () {
  for (var target = 0; target < this.length - 1; target++) {
    var swapped = false;
    for(var j = this.length - 1; j > target; j--){
      if (this[j] <= this[target]) {
        this.swap(target, j);
        swapped = true;
      }
    }
    if ( ! swapped && this.increasing()) {
      return;
    }
  }
};

Array.prototype.bubbleSort2 = function () {
  for (var i = this.length - 1; i > 0; i--) {
    var swapped = false;
    for (var j = 0; j < i; j++) {
      if (this[j + 1] < this[j]) {
        this.swap(j, j+1);
        swapped = true;
      }
    }
    if ( ! swapped ) {
      return;
    }
  }
}

Array.prototype.selectionSort = function () {
  for (var target = 0; target < this.length - 1; target++) {
    var min = target;
    for (var j = target + 1; j < this.length; j++) {
      if (this[min] > this[j]) {
        min = j;
      }
    }
    if (min !== target) {
      this.swap(min, target);
    }
  }
}

Array.prototype.insertionSort = function () {
  for (var i = 1; i < this.length; i++) {
    for(var j = i; j > 0; j--) {
      if (this[j] < this[j-1]) {
        this.swap(j-1, j);
      }
    }
  }
}

Array.prototype.mergeSort = function (start, end) {
  if (typeof start == 'undefined') {
    start = 0;
  }
  if (typeof end == 'undefined') {
    end = this.length - 1;
  }

  var breakIndex = Math.ceil(end / 2), // if 5 elements then breaks at 3rd Element;
  firstHalf = this.slice(0, breakIndex), // from 0 take 3 elements
  secondHalf = this.slice(breakIndex); // from the 4th element
  // console.log(firstHalf);
  firstHalf.bubbleSort2();
  // console.log(firstHalf);
  // console.log('---')
  // console.log(secondHalf);
  secondHalf.bubbleSort2();
  // console.log(secondHalf);

  var firstI = 0,
      secondI = 0,
      target = 0;

  while (target < this.length) {
    if (firstHalf.length == 0) {
      this[target] = secondHalf.shift();
    } else if (secondHalf.length == 0) {
      this[target] = firstHalf.shift();
    } else if (firstHalf[firstI] < secondHalf[secondI]) {
      this[target] = firstHalf.shift();
    } else {
      this[target] = secondHalf.shift();
    }
    // console.log(firstHalf);
    // console.log(secondHalf);
    target++;
  }
}

Array.prototype.quickSort = function (start, end) {

  if (typeof start == 'undefined') {
    start = 0;
  }
  if (typeof end == 'undefined') {
    end = this.length - 1;
  }

  if (end - start < 1) return;

  var target = start,
      lower = start + 1,
      upper = end,
      pivot;

  var loFound = false,
      hiFound = false;
      swapped = false;

  while (lower <= upper) {
    if (this[lower] > this[target]) {
      loFound = true;
    } else {
      lower++;
    }
    if (this[upper] < this[target]) {
      hiFound = true;
    } else {
      upper--;
    }
    console.log( loFound + ' ' + hiFound);
    if (loFound && hiFound) {
      console.log('swapped ' + this[lower] + ' with ' + this[upper]);
      this.swap(lower, upper);
      console.log(this);
      loFound = false;
      hiFound = false;
      swapped = true;
      lower++;
      upper--;
    }
  }
  if ( ! loFound && hiFound && ! swapped) {
    console.log('lo not found, but hi found and no swaps');
    this.swap(target, upper);
    pivot = end;
  // } else if (loFound && !hiFound && !swapped) {
  //   console.log('lo found, but hi not found and no swaps');
  //   pivot = start
  } else {
    this.swap(target, lower - 1);
    pivot = lower - 1;
  }
  console.log('!!!!!!!!   moved ' + this[pivot] + ' to ' + pivot + ' !!!!!!!!!');
  console.log(this);
  console.log('------');
  console.log('lower partitian of ' + this[pivot]);
  this.quickSort(start, pivot - 1);
  console.log('------');
  console.log('upper partitian of ' + this[pivot]);
  this.quickSort(pivot + 1, end);
};

sorts.forEach(function ( sortName ) {
  runSort(testArray.slice(), sortName);
});
