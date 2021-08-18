import React from 'react';
import {getMergeSortAnimations, getBubbleSortAnimations, getHeapSortAnimations, getQuickSortAnimations, getBinaryInsertionSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import './SortingVisualizer.css';

const SortSpeed = 1;
const NumberItems = 250;
const MainColor = 'blue';
const SecondaryColor = 'green';

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            array:[],
        };
    }
    
    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = [];
        for (let i = 0; i < NumberItems; i++){
            array.push( generateInt(5, 730));
        }
        this.setState({array});
    }

    animate(animations){
        for ( let i = 0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange === true){
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                const color = i % 3 === 0 ? SecondaryColor : MainColor;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * SortSpeed);
            } else{
                setTimeout(()=> {
                    const [barOneIndex, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * SortSpeed);
            }
        }
    }

    mergeSort(){
        const animations = getMergeSortAnimations(this.state.array);
        this.animate(animations);
    }

    bubbleSort(){
        const animations = getBubbleSortAnimations(this.state.array);
        this.animate(animations);
    }

    heapSort(){
        const animations = getHeapSortAnimations(this.state.array);
        this.animate(animations);
    }

    quickSort(){
        const animations = getQuickSortAnimations(this.state.array);
        this.animate(animations);
    }

    binaryInsertionSort(){
        const animations = getBinaryInsertionSortAnimations(this.state.array);
        this.animate(animations);
    }

    render(){
        const {array} = this.state;

        return(
            <div className = "visualizer-container">
                <header className = "app-header">
                    <ul>
                        <li>
                            <button className="app-button" onClick={() => this.resetArray()}>Generate New Array</button>
                        </li>
                        <li>
                            <button className="app-button" onClick={() => this.mergeSort()}>Merge Sort</button>
                        </li>
                        <li>
                            <button className="app-button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                        </li>
                        <li>
                            <button className="app-button" onClick={() => this.heapSort()}>Heap Sort</button>
                        </li>
                        <li>
                            <button className="app-button" onClick={() => this.quickSort()}>Quick Sort</button>
                        </li>
                        <li>
                            <button className="app-button" onClick={() => this.binaryInsertionSort()}>Binary Insertion Sort</button>
                        </li>
                        
                    </ul>
                </header>
                <div className = "array-container" >
                    {array.map((value, index)=>(
                        <div 
                        className = "array-bar"
                        key = {index} 
                        style= {{
                            backgroundColor: MainColor,
                            height: `${value}px`,
                        }}></div>
                    ))}
                </div>
            </div>
        );
    }
}

function generateInt(min, max){
    return Math.floor( Math.random() * (max-min+1) + min );
}