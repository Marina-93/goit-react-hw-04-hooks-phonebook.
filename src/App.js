import { useState, useEffect } from 'react';
import shortid from 'shortid';
import Section from './components/Section/Section';
import Form from './components/Form/Form';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import './App.css'


           
export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ??
    [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  )
  const [filter, setFilter] = useState('')

  const formSubmit = ({ name, number }) => {
    const friendName = name;
    if (contacts.some(({ name }) => name === friendName)) {
      alert(`${name} is already in contact`);
      return;
    }
    
    const list = {
      id: shortid.generate(),
      name,
      number,
    }

    setContacts((prev ) => [...prev, list])
  }

  const changeFilter = (e) => {
    setFilter(e.target.value );
  }

  const getFilterSearch = () => {
    const normalizedFilter = filter.toLowerCase();
    
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    )
  }

  const deleteContact = (nameId) => {
    setContacts((prev) => (prev.filter((contact) => contact.id !== nameId)))
  }

  useEffect(() => {window.localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  const filterSearch = getFilterSearch();
  return (
      <div className="conteiner">
        <Section title="Phonebook">
          <Form onSubmit={formSubmit} />
        </Section>
        <Section title="Contacts">
          <Filter
            value={filter}
            onChange={changeFilter}
          />
          <ContactList
            contacts={filterSearch}
            onDelete={deleteContact}
          />
        </Section>
      </div>
    )
}
