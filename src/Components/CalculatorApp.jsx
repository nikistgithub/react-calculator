import { useState, useEffect } from "react";

const CalculatorApp = () => {
    const [preState, setPreState] = useState('');
    const [curState, setCurState] = useState('');
    const [input, setInput] = useState('0');
    const [operator, setOperator] = useState(null);
    const [total, setTotal] = useState(false);

    const inputNum = (e) => {
        if (curState.includes('.') && e.target.innerText === '.') return;

        if (total) {
            setPreState('');
            setCurState(e.target.innerText);
            setTotal(false);
        } else {
            setCurState((prev) => prev ? prev + e.target.innerText : e.target.innerText);
        }
    };

    useEffect(() => {
        setInput(curState || preState || '0');
    }, [curState, preState]);

    const operatorType = (e) => {
        if (curState === '') return;

        if (preState !== '') {
            equals(); 
        }

        setOperator(e.target.innerText);
        setPreState(curState);
        setCurState('');
    };

    const equals = () => {
        if (preState === '' || curState === '') return;

        let cal;
        switch (operator) {
            case '/':
                cal = String(parseFloat(preState) / parseFloat(curState));
                break;
            case '+':
                cal = String(parseFloat(preState) + parseFloat(curState));
                break;
            case 'X':
                cal = String(parseFloat(preState) * parseFloat(curState));
                break;
            case '-':
                cal = String(parseFloat(preState) - parseFloat(curState));
                break;
            default:
                return;
        }
        setInput(cal);
        setPreState(cal);
        setCurState('');
        setTotal(true);
    };

    const minusPlus = () => {
        if (curState.charAt(0) === '-') {
            setCurState(curState.substring(1));
        } else {
            setCurState('-' + curState);
        }
    };

    const percent = () => {
        let result = String(parseFloat(curState) / 100);
        setCurState(result);
    };

    const reset = () => {
        setPreState('');
        setCurState('');
        setInput('0');
        setOperator(null);
        setTotal(false);
    };

    return (
        <>
            <div className="container">
                <div className="wrapper">
                    <div className="screen">{input}</div>
                    <div className="btn light-gray" onClick={reset}>AC</div>
                    <div className="btn light-gray" onClick={percent}>%</div>
                    <div className="btn light-gray" onClick={minusPlus}>+/-</div>
                    <div className="btn orange" onClick={operatorType}>/</div>
                    <div className="btn" onClick={inputNum}>7</div>
                    <div className="btn" onClick={inputNum}>8</div>
                    <div className="btn" onClick={inputNum}>9</div>
                    <div className="btn orange" onClick={operatorType}>X</div>
                    <div className="btn" onClick={inputNum}>4</div>
                    <div className="btn" onClick={inputNum}>5</div>
                    <div className="btn" onClick={inputNum}>6</div>
                    <div className="btn orange" onClick={operatorType}>+</div>
                    <div className="btn" onClick={inputNum}>1</div>
                    <div className="btn" onClick={inputNum}>2</div>
                    <div className="btn" onClick={inputNum}>3</div>
                    <div className="btn orange" onClick={operatorType}>-</div>
                    <div className="btn" onClick={inputNum}>0</div>
                    <div className="btn" onClick={inputNum}>.</div>
                    <div className="btn equal" onClick={equals}>=</div>
                </div>
            </div>
        </>
    );
};

export default CalculatorApp;
