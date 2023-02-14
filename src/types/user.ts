export interface User {
  birthdate: number;
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
  phone_number: string;
  location: {
    city: string;
    postcode: number;
    state: string;
    street: string;
  };
  title: string;
  username: string;
}
