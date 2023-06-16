import React, { useState } from 'react';
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

const Search = () => {
  const [showSearchAlert, setShowSearchAlert] = useState(false);

  return (
    <>
      <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex justify-content-end">
        <FormGroup className="mb-0">
          <InputGroup className="input-group-alternative">
            <InputGroupText>
              <i className="fas fa-search" />
            </InputGroupText>
            <Input placeholder="Search" type="text" />
          </InputGroup>
        </FormGroup>
      </Form>
    </>
  );
}

export default Search;
