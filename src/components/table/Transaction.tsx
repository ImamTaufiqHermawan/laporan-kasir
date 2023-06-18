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

const rupiah = (number: Number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(number);
}

const TransactionTables = (transactions) => {
  const dispatch = useDispatch();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [formValues, setFormValues] = useState([])
  const [productId, setProductId] = useState()
  const [update, setUpdate] = useState(false)
  // const [transactions, setTransactions] = useState(data)

  useEffect(() => {
  }, [transactions])

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
    const product = await ProductService.getProductById(id)
    console.log(product.data?.data)
    setFormValues(product?.data?.data)
    setEditModal(!editModal)
  }

  const updatehandler = async () => {
    console.log(formValues)
    dispatch(UpdateProductActions(formValues.product.id, formValues));
    setUpdate(!update)
    setEditModal(!editModal)
  }

  const deleteModalHandler = async (id) => {
    setProductId(id)
    setDeleteModal(!deleteModal)
  }

  const deleteHandler = async () => {
    dispatch(DeleteProductActions(productId));
    setUpdate(!update)
    setDeleteModal(!deleteModal)
  }

  console.log(transactions)
  // console.log(data)

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
                    <th scope="col">ID</th>
                    <th scope="col">Nama Produk</th>
                    <th scope="col">Harga</th>
                    <th scope="col">Total Harga</th>
                    <th scope="col">Tanggal Transaksi</th>
                    <th scope="col">Tanggal Input</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {transactions?.data?.map((transaction, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{transaction?.Product?.name}</td>
                        <td>{rupiah(transaction?.Product?.price)}</td>
                        <td>{rupiah(transaction?.totalPrice)}</td>
                        <td>{formatDate(transaction?.transactionDate)}</td>
                        <td>{formatDate(transaction?.createdAt)}</td>
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
                                onClick={() => editModalHandler(product.id)}
                              >
                                <i className="fas fa-pencil-alt mr-2" />
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => deleteModalHandler(product.id)}
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
            toggle={toggleEditModal}>Edit Transaksi</ModalHeader>
          <ModalBody>
            <div className="pl-lg-4">
              <Row>
                <Col lg="12">
                  <div className="form-group">
                    <label className="form-control-label">Nama Produk</label>
                    <Input
                      className="form-control-alternative"
                      defaultValue={formValues?.product?.name}
                      id="input-name"
                      placeholder="ayam"
                      name='name'
                      type="text"
                      onChange={(e) => setFormValues({ ...formValues, product: { ...formValues.product, name: e.target.value } })}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-control-label">Stok</label>
                    <Input
                      className="form-control-alternative"
                      value={formValues?.product?.stock}
                      id="input-stock"
                      placeholder="0"
                      name='stock'
                      type="number"
                      onChange={(e) => setFormValues({ ...formValues, product: { ...formValues.product, stock: e.target.value } })}
                    />
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-control-label">Harga</label>
                    <Input
                      className="form-control-alternative"
                      value={formValues?.product?.price}
                      id="input-price"
                      placeholder="0"
                      name='price'
                      type="number"
                      onChange={(e) => setFormValues({ ...formValues, product: { ...formValues.product, price: e.target.value } })}
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

export default TransactionTables;
