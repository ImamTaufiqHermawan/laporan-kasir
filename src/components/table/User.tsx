/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import React, { useEffect, useState } from 'react';

import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Button, Modal, ModalFooter,
  ModalHeader, ModalBody, FormGroup, Input
} from "reactstrap";
import { Col } from 'react-bootstrap';
import { ProductService } from '@app/services/productService';
import { formatDate } from '@app/utils/date';
import { DeleteProductActions, UpdateProductActions } from '@app/store/actions';
import { useDispatch } from 'react-redux';
import { UserService } from '@app/services/userService';
import { DeleteUserActions, UpdateUserActions } from '@app/store/actions/userActions';

const rupiah = (number: Number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(number);
}

const Tables = (data) => {
  const dispatch = useDispatch();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [formValues, setFormValues] = useState([])
  const [productId, setProductId] = useState()
  const [userId, setUserId] = useState()
  const [update, setUpdate] = useState(false)
  const [products, setproducts] = useState(data)
  const [users, setUsers] = useState(data)

  useEffect(() => {
    UserService.getUsers().then((res) => {
      setUsers(res.data.data);
    });
  }, [update, data])

  // Toggle for Modal
  const toggleEditModal = () => {
    let user = 'manager'
    if (user === 'staff') {
      alert('staff gak boleh ganti data');
    } else {
      setEditModal(!editModal);
    }
  }
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const editModalHandler = async (id) => {
    console.log(id)
    const user = await UserService.getUserById(id)
    console.log(user.data?.data)
    setFormValues(user?.data?.data)
    setEditModal(!editModal)
  }

  const updatehandler = async () => {
    console.log(formValues)
    dispatch(UpdateUserActions(formValues.user.id, formValues));
    setUpdate(!update)
    setEditModal(!editModal)
  }

  const deleteModalHandler = async (id) => {
    setUserId(id)
    setDeleteModal(!deleteModal)
  }

  const deleteHandler = async () => {
    dispatch(DeleteUserActions(userId));
    setUpdate(!update)
    setDeleteModal(!deleteModal)
  }

  return (
    <>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nama</th>
                    <th scope="col">email</th>
                    <th scope="col">Akun Dibuat Kapan</th>
                    <th scope="col">Akun Diubah Kapan</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {users?.users?.map((user, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{formatDate(user.createdAt)}</td>
                        <td>{formatDate(user.updatedAt)}</td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                onClick={() => editModalHandler(user.id)}
                              >
                                <i className="fas fa-pencil-alt mr-2" />
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => deleteModalHandler(user.id)}
                              >
                                <i className="fas fa-trash-alt mr-2" />
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
      {/* edit modal */}
      <div style={{
        display: 'block', padding: 30
      }}>
        <Modal isOpen={editModal} toggle={toggleEditModal}>
          <ModalHeader
            toggle={toggleEditModal}>Edit Data Pegawai</ModalHeader>
          <ModalBody>
            <div className="pl-lg-4">
              <Row>
                <Col lg="12">
                  <div className="form-group">
                    <label className="form-control-label">Nama Pegawai</label>
                    <Input
                      className="form-control-alternative"
                      defaultValue={formValues?.user?.name}
                      id="input-name"
                      placeholder="masukkan nama pegawai"
                      name='name'
                      type="text"
                      onChange={(e) => setFormValues({ ...formValues, user: { ...formValues.user, name: e.target.value } })}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <div className="form-group">
                    <label className="form-control-label">Email Pegawai</label>
                    <Input
                      className="form-control-alternative"
                      defaultValue={formValues?.user?.email}
                      id="input-email"
                      placeholder="masukkan email pegawai"
                      name='email'
                      type="text"
                      onChange={(e) => setFormValues({ ...formValues, user: { ...formValues.user, email: e.target.value } })}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </ModalBody >
          <ModalFooter>
            <Button color="primary" onClick={updatehandler}>Submit</Button>
          </ModalFooter>
        </Modal >
        {/* delete confirmation */}
        <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
          <ModalHeader toggle={toggleDeleteModal}>Hapus Transaksi</ModalHeader>
          <ModalBody>Apakah kamu yakin ingin menghapus transaksi ini? Aksi ini tidak dapat di revert yah!</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={deleteHandler}>Hapus</Button>
          </ModalFooter>
        </Modal>
      </div >
    </>
  );
};

export default Tables;
