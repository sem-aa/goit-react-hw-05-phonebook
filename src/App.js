import React from "react";
import { CSSTransition } from "react-transition-group";
import s from "./App.module.css";
import Form from "./copmonents/Form/Form";
import Phonebook from "./copmonents/Phonebook/Phonebook";
import Filter from "./copmonents/Filter/Filter";
import fadeStyle from "./copmonents/fade/fade.module.css";

var ids = require("short-id");

class App extends React.Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    doubleContact: false,
    filter: "",
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  formSubmitHandler = (data) => {
    if (this.state.contacts.find((item) => item.name === data.name)) {
      this.setState({ doubleContact: true });
      setTimeout(() => this.setState({ doubleContact: false }), 3000);

      //       alert(`
      // ${data.name} Такой контакт уже существует`);
      return;
    }
    const contact = {
      id: ids.generate(),
      name: data.name,
      number: data.number,
    };
    this.setState((prevState) => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  changeFilter = (event) => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContact = () => {
    const { filter, contacts } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter, contacts, doubleContact } = this.state;
    const visibleContact = this.getVisibleContact();
    return (
      <div className={s.App}>
        <CSSTransition
          in={doubleContact}
          classNames={fadeStyle}
          timeout={500}
          unmountOnExit
        >
          <div className={s.alert}>Такой контакт уже существует!</div>
        </CSSTransition>
        <CSSTransition
          in={true}
          appear={true}
          classNames={fadeStyle}
          timeout={500}
          unmountOnExit
        >
          <h2 className={s.title}>Phonebook</h2>
        </CSSTransition>
        <Form onSubmit={this.formSubmitHandler} />
        <h2 className={s.title}>Contacts</h2>
        <CSSTransition
          in={contacts.length > 1}
          classNames={fadeStyle}
          timeout={500}
          unmountOnExit
        >
          <Filter value={filter} onChange={this.changeFilter} />
        </CSSTransition>
        <Phonebook
          contacts={visibleContact}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
