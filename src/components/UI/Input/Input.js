import React from 'react';
import classes from './Input.css';
const input = (props) => {
    let inputElement = null;
    let validationError='';
    const inputClasses=[classes.InputElement];
    if(props.invalid && props.touched){
        inputClasses.push(classes.Invalid);
        validationError = <p style={{color:"red", margin:'5px'}}>Please enter a valid value</p>
    }
    switch(props.elementType) {
        case('input'):
            inputElement = <input className={inputClasses.join(' ')}
                                  {...props.elementConfig}
                                  value={props.value}
                                  onChange={props.changed}/>;
            break;
        case('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')}
                                     {...props.elementConfig}
                                     value={props.value}
                                     onChange={props.changed}/>;
            break;
        case('select'):
            inputElement = (<select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                                    {props.elementConfig.options.map(opt => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.displayValue}
                                        </option>
                                    ))}
                            </select>)
            break;
        default:
            inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value}/>;
    }
    return (
    <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
        {validationError}
    </div>
        );
};

export default input;