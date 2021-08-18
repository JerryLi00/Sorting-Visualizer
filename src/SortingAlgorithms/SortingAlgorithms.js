export function getMergeSortAnimations(array){
    const animations = [];
    if (array.length <= 1){
        return array;
    }
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length-1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(mainArray, low, high, auxiliaryArray, animations){
    if ( low === high){
        return;
    }
    const middleIndex = Math.floor((low+high) / 2);
    mergeSortHelper(auxiliaryArray, low, middleIndex, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIndex+1, high, mainArray, animations);
    mergeArrays(mainArray, low, middleIndex, high, auxiliaryArray, animations);
}

function mergeArrays(mainArray, low, middleIndex, high, auxiliaryArray, animations){
    let k = low;
    let i = low;
    let j = middleIndex + 1;
    while(i <= middleIndex && j <= high){
        animations.push([i,j]);
        animations.push([i,j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]){
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        }
        else{
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while(i <= middleIndex){
        animations.push([i,i]);
        animations.push([i,i]);
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
        
    }
    while(j <= high){
        animations.push([j,j]);
        animations.push([j,j]);
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
        
    }
}

export function getBubbleSortAnimations(array){
    const animations = [];
    if (array.length <= 1){
        return array;
    }
    const auxiliaryArray = array.slice();
    for(let i = 0; i < auxiliaryArray.length; i++){
        for(let j = 0; j < auxiliaryArray.length-i-1; j++){
            animations.push([j, j+1]);
            animations.push([j, j+1]);
            if(auxiliaryArray[j] >= auxiliaryArray[j+1]){
                let tmp = auxiliaryArray[j+1];
                auxiliaryArray[j+1] = auxiliaryArray[j];
                auxiliaryArray[j] = tmp; 

                animations.push([j, auxiliaryArray[j]]);
                animations.push([j, j+1]);
                animations.push([j, j+1]);
                animations.push([j+1, auxiliaryArray[j+1]]);
            }
            else{
                animations.push([j, auxiliaryArray[j]]);
            }
        }
    }
    return animations;
}

export function getHeapSortAnimations(array){
    const animations = [];
    if (array.length <= 1){
        return array;
    }
    const auxiliaryArray = array.slice();
    const n = auxiliaryArray.length;

    for(let i = Math.floor(auxiliaryArray.length/2 - 1); i >= 0; i--){
        heapify(animations, auxiliaryArray, n, i);
    }
    
    for(let i = auxiliaryArray.length - 1; i > 0 ; i--){
        let tmp = auxiliaryArray[0];
        auxiliaryArray[0] = auxiliaryArray[i];
        auxiliaryArray[i] = tmp;

        animations.push([i, 0]);
        animations.push([i, 0]);
        animations.push([0, auxiliaryArray[0]]); 
        animations.push([i, 0]);
        animations.push([i, 0]);
        animations.push([i, auxiliaryArray[i]]);

        heapify(animations, auxiliaryArray, i, 0);
    }
    return animations;
}

function heapify(animations, auxiliaryArray, n, i){
    let largest = i;
    let l = 2*i + 1;
    let r = 2*i + 2;

    if(l < n && auxiliaryArray[largest] < auxiliaryArray[l]){
        largest = l;
        animations.push([i, l]);
        animations.push([i, l]);
        animations.push([largest, auxiliaryArray[largest]]);
    }

    if(r < n && auxiliaryArray[largest] < auxiliaryArray[r]){
        largest = r;
        animations.push([i, r]);
        animations.push([i, r]);
        animations.push([largest, auxiliaryArray[largest]]);
    }

    if (largest !== i){
        let tmp = auxiliaryArray[i];
        auxiliaryArray[i] = auxiliaryArray[largest];
        auxiliaryArray[largest] = tmp;

        animations.push([i, largest]);
        animations.push([i, largest]);
        animations.push([i, auxiliaryArray[i]]);
        animations.push([i, largest]);
        animations.push([i, largest]);
        animations.push([largest, auxiliaryArray[largest]]);        

        heapify(animations, auxiliaryArray, n , largest);
    }
}

export function getQuickSortAnimations(array){
    const animations = [];
    if (array.length <= 1){
        return array;
    }
    const auxiliaryArray = array.slice();
    quickSortHelper(animations, auxiliaryArray, 0, auxiliaryArray.length - 1);
    return animations;
}

function quickSortHelper(animations, auxiliaryArray, low, high){
    if (low < high){
        let pi = partition(animations, auxiliaryArray, low, high);
        quickSortHelper(animations, auxiliaryArray, low, pi - 1);
        quickSortHelper(animations, auxiliaryArray, pi + 1, high);
    }    
}

function partition(animations, auxiliaryArray, low, high){
    let pivotIndex = low;
    let pivot = auxiliaryArray[pivotIndex];
    while(low < high) {
        while(low < auxiliaryArray.length && auxiliaryArray[low] <= pivot){
            animations.push([low, high]);
            animations.push([low, high]);
            animations.push([low, auxiliaryArray[low]]);
            low++;
        }
        while(auxiliaryArray[high] > pivot){
            animations.push([low, high]);
            animations.push([low, high]);
            animations.push([high, auxiliaryArray[high]]);
            high--;
        }
        if(low < high){
            let tmp = auxiliaryArray[low];
            auxiliaryArray[low] = auxiliaryArray[high];
            auxiliaryArray[high] = tmp;

            animations.push([low, high]);
            animations.push([low, high]);
            animations.push([low, auxiliaryArray[low]]);
            animations.push([low, high]);
            animations.push([low, high]);
            animations.push([high, auxiliaryArray[high]]);
        }
    }
    let tmp = auxiliaryArray[high];
    auxiliaryArray[high] = auxiliaryArray[pivotIndex];
    auxiliaryArray[pivotIndex] = tmp;

    animations.push([high, pivotIndex]);
    animations.push([high, pivotIndex]);
    animations.push([high, auxiliaryArray[high]]);
    animations.push([high, pivotIndex]);
    animations.push([high, pivotIndex]);
    animations.push([pivotIndex, auxiliaryArray[pivotIndex]]);

    return high;
}

export function getBinaryInsertionSortAnimations(array){
    const animations = [];
    if (array.length <= 1){
        return array;
    }
    const auxiliaryArray = array.slice();
    binaryInsertionSortHelper(animations, auxiliaryArray);
    return animations;
}

function binaryInsertionSortHelper(animations, auxiliaryArray){
    for(let i = 1; i < auxiliaryArray.length; i++){
        let j = i - 1;
        let selected = auxiliaryArray[i];
        let locate = Math.abs(binarySearch(auxiliaryArray, selected, 0, j));

        while(j >= locate){
            auxiliaryArray[j + 1] = auxiliaryArray[j];
            
            animations.push([j+1, j+1]);
            animations.push([j+1, j+1]);
            animations.push([j+1, auxiliaryArray[j+1]]);
            j--;
        }
        auxiliaryArray[j + 1] = selected;

        animations.push([j+1, j+1]);
        animations.push([j+1, j+1]);
        animations.push([j+1, auxiliaryArray[j+1]]);
    }

}

function binarySearch(auxiliaryArray, selected, low, high){
    if(high <= low){
        return (selected > auxiliaryArray[low]) ?  (low+1) : low;
    }

    let mid = Math.floor((high + low) / 2);

    if(selected === auxiliaryArray[mid]){
        return mid + 1;
    }
    if (selected > auxiliaryArray[mid]){
        return binarySearch(auxiliaryArray, selected, mid + 1, high);
    }
    return binarySearch(auxiliaryArray, selected, low, mid - 1);
}
