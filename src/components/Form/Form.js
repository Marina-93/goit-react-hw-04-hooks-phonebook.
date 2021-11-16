import { useState } from 'react';
import PropTypes from "prop-types";
import './Form.css'

export default function Form({onSubmit}) {
    const [name, setNeme] = useState('')
    const [number, setNumber] = useState('')

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'name':
                setNeme(e.target.value)
                break
            case 'number':
                setNumber(e.target.value)
                break
            default: return
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ name, number })
        reset()
    }

    const reset = () => {
        setNeme('')
        setNumber('')
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <label className="label">
                Имя
                <input
                    className="input"
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                    required
                />
            </label>
            
            <label className="label">
                Телефона
                <input
                    className="input"
                    type="tel"
                    name="number"
                    value={number}
                    onChange={handleChange}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                    required
                />
            </label>
            
            <button className="button" type="submit">Add contact</button>
        </form>
    )
}

Form.propTypes = {
    name: PropTypes.string,
    number: PropTypes.number,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func
}