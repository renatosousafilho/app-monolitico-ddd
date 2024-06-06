type AddressProps = {
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
};

export default class Address {
  private street: string;
  private number: string;
  private complement: string;
  private city: string;
  private state: string;
  private zipCode: string;

  constructor(props: AddressProps) {
    this.street = props.street;
    this.number = props.number;
    this.complement = props.complement;
    this.city = props.city;
    this.state = props.state;
    this.zipCode = props.zipCode;
  }

  getStreet(): string {
    return this.street;
  }

  getNumber(): string {
    return this.number;
  }

  getComplement(): string {
    return this.complement;
  }

  getCity(): string {
    return this.city;
  }

  getState(): string {
    return this.state;
  }

  getZipCode(): string {
    return this.zipCode;
  }
}