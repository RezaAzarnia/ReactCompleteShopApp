import React from "react";
import { useFormContext } from "react-hook-form";
import './Input.scss'
const Input = ({name, rules, id, type, placeholder, lableTitle, children, onChange ,value}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    let inputElement = null;
    switch (type) {
        case 'textarea':
            inputElement = <textarea id={id} cols="30" rows="5" name={name} {...register(name, rules)}></textarea>
            break
        case 'select':
            inputElement = <select name={name} {...register(name, rules)} onChange={onChange} value={value}>
                {children}
            </select>
            break
        default:
            inputElement = <input id={id} {...register(name, rules)} type={type} placeholder={placeholder} />
            break
    }

    return (

        <div className="input-group" >
            {
                lableTitle &&
                <label htmlFor={id}>{lableTitle}</label>
            }
            {inputElement}
            {
                errors[name] && (
                    <span className="input-error-text">{errors[name].message}</span>
                )
            }
        </div >

    );
};

export default Input;
