import {Injectable} from '@angular/core';
import {Contact} from "../../models/entity/contact";
import {ContactHttpService} from "./contact-http.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private _selectedContact$: BehaviorSubject<Contact | undefined> = new BehaviorSubject<Contact | undefined>(undefined);
  contacts: Contact[] = [
    {
      id: 1,
      email: 'john.doe@example.com',
      name: 'John Doe',
      phoneNumber: '+1234567890',
      avatarColor: '#ff0000'
    },
    {
      id: 2,
      email: 'jane.doe@example.com',
      name: 'Jane Doe',
      phoneNumber: '+0987654321',
      avatarColor: '#00ff00'
    },
    {
      id: 3,
      email: 'alice.smith@example.com',
      name: 'Alice Smith',
      phoneNumber: '+1122334455',
      avatarColor: '#0000ff'
    },
    {
      id: 4,
      email: 'bob.smith@example.com',
      name: 'Bob Smith',
      phoneNumber: '+6677889900',
      avatarColor: '#ffff00'
    },
    {
      id: 5,
      email: 'emma.jones@example.com',
      name: 'Emma Jones',
      phoneNumber: '+1123456789',
      avatarColor: '#ff00ff'
    }
  ];

  constructor(private contactHttpService: ContactHttpService) {}

  public get selectedContact(): Contact {
    return this._selectedContact$.getValue() as Contact;
  }

  public get selectedContact$(): Observable<Contact> {
    return this._selectedContact$.asObservable() as Observable<Contact>;
  }

  public set selectedContact(contact: Contact) {
    this._selectedContact$.next(contact);
  }

  public createContact(contact: Contact) {
    this.contactHttpService.createContact(contact);
  }

  public editContact(contact: Contact) {
    this.contactHttpService.editContact(contact);
  }

  public deleteContact(id: number) {
    this.contactHttpService.deleteContact(id);
  }

  public groupAndSortContacts(contacts: Contact[]): { [key: string]: Contact[] } {
    const sortedContacts: { [key: string]: Contact[] } = {};

    contacts.forEach(contact => {
      const firstLetter = contact.name.charAt(0).toUpperCase();
      if (!sortedContacts[firstLetter]) {
        sortedContacts[firstLetter] = [];
      }
      sortedContacts[firstLetter].push(contact);
    });

    const sortedKeys = Object.keys(sortedContacts).sort();

    sortedKeys.forEach(letter => {
      sortedContacts[letter].sort((a, b) => a.name.localeCompare(b.name));
    });

    const sortedContactsResult: { [key: string]: Contact[] } = {};
    sortedKeys.forEach(letter => {
      sortedContactsResult[letter] = sortedContacts[letter];
    });

    return sortedContactsResult;
  }
}
