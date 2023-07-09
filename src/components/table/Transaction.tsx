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
import { TransactionService } from '@app/services/transactionService';
import { formatDateDefault } from '@app/utils/defaultDate';
import { DeleteTransactionActions, UpdateTransactionActions } from '@app/store/actions/transactionActions';

const rupiah = (number: Number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(number);
}

const TransactionTables = (data) => {
  const dispatch = useDispatch();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [formValues, setFormValues] = useState({ transactionDate: "2022-08-10T00:00:00.000Z" })
  const [productId, setProductId] = useState(0)
  const [transactionId, setTransactionId] = useState(0)
  const [update, setUpdate] = useState(false)
  const [transactions, setTransactions] = useState(data.length > 0 ? data : [])
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState({ product: { price: 0 } })
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    ProductService.getProducts().then((res) => {
      setProducts(res.data.data);
    });
  }, [])

  useEffect(() => {
    if (productId === 0) {
      setProduct({ product: { price: 0 } });
      setTotalPrice(0)
    }
    ProductService.getProductById(productId).then((res) => {
      setProduct(res.data.data);
    });
  }, [productId])

  useEffect(() => {
    TransactionService.getTransactions().then((res) => {
      setTransactions(res.data.data);
    });
  }, [update])

  useEffect(() => {
    setTotalPrice(formValues?.quantity * product?.product?.price)
  }, [formValues?.quantity, productId])

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
    const transaction = await TransactionService.getTransactionById(id)
    // setFormValues(transaction?.data?.data)
    setProductId(transaction?.data?.data?.transaction?.Product?.id)
    setFormValues({ ...formValues, id: id, quantity: transaction?.data?.data?.transaction?.quantity, transactionDate: transaction?.data?.data?.transaction?.transactionDate, totalPrice: transaction?.data?.data?.transaction?.totalPrice, productId: transaction?.data?.data?.transaction?.productId, price: transaction?.data?.data?.transaction?.Product?.price, shift: transaction?.data?.data?.transaction?.shift })
    setEditModal(!editModal)
  }

  const updatehandler = async () => {
    dispatch(UpdateTransactionActions(formValues.id, formValues));
    setUpdate(!update)
    setEditModal(!editModal)
  }

  const deleteModalHandler = async (id) => {
    setTransactionId(id)
    setDeleteModal(!deleteModal)
  }

  const deleteHandler = async () => {
    dispatch(DeleteTransactionActions(transactionId));
    setUpdate(!update)
    setDeleteModal(!deleteModal)
  }

  // console.log(data)

  const productHandler = (e) => {
    setFormValues({ ...formValues, productId: e.target.value })
    setProductId(e.target.value)
  }

  console.log(transactions)

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
                    <th scope="col">Quantity</th>
                    <th scope="col">Tanggal Input</th>
                    <th scope="col">Shift</th>
                    <th scope="col">Pegawai</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {transactions?.map((transaction, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{transaction?.Product?.name}</td>
                        <td>{rupiah(transaction?.Product?.price)}</td>
                        <td>{rupiah(transaction?.totalPrice)}</td>
                        <td>{formatDate(transaction?.transactionDate)}</td>
                        <td>{transaction?.quantity}</td>
                        <td>{formatDate(transaction?.createdAt)}</td>
                        <td>{transaction?.shift}</td>
                        <td>{transaction?.User?.name}</td>
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
                                onClick={() => editModalHandler(transaction.id)}
                              >
                                <i className="fas fa-pencil-alt mr-2" />
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => deleteModalHandler(transaction.id)}
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
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-control-label">Nama Produk</label>
                    <select className="form-control" id="exampleFormControlSelect1" onChange={(e) => productHandler(e)} value={formValues?.productId}>
                      <option value={0}>-- Pilih Product --</option>
                      {products?.products?.map((item) => {
                        return (
                          <option key={item.id} value={item.id}>{item.name}</option>
                        )
                      })}
                    </select>
                  </div>
                </Col>
                {/* <Row>
                    <Col lg="12">
                      <div className="form-group">
                        <label className="form-control-label">Harga</label>
                        <AutocompleteInput data={products}/>
                      </div>
                    </Col>
                  </Row> */}
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-control-label">Harga</label>
                    <Input
                      className="form-control-alternative"
                      id="input-email"
                      // defaultValue={rupiah(formValues?.transaction?.Product?.price)}
                      value={rupiah(product?.product?.price)}
                      placeholder="0"
                      type="text"
                      disabled
                      onChange={(e) => setFormValues({ ...formValues, product: { ...formValues.product, name: e.target.value } })}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <div className="form-group">
                    <label
                      className="form-control-label"
                      htmlFor="input-first-name"
                    >
                      Quantity
                    </label>
                    <Input
                      className="form-control-alternative"
                      value={formValues?.quantity}
                      onChange={(e) => setFormValues({ ...formValues, quantity: e.target.value, totalPrice: e.target.value * product?.product?.price })}
                      placeholder="0"
                      type="number"
                    />
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-control-label">Total Harga</label>
                    <Input
                      className="form-control-alternative"
                      id="input-email"
                      // defaultValue={rupiah(formValues?.transaction?.totalPrice)}
                      value={rupiah(formValues?.totalPrice)}
                      placeholder="0"
                      type="text"
                      disabled
                    />
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-control-label">Tanggal</label>
                    <input
                      className="form-control"
                      type="date"
                      value={formatDateDefault(formValues?.transactionDate)}
                      onChange={(e) => setFormValues({ ...formValues, transactionDate: e.target.value })}
                    />
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-control-label">Shift</label>
                    <select className="form-control" id="exampleFormControlSelect1" value={formValues?.shift} onChange={(e) => setFormValues({ ...formValues, shift: e.target.value })}>
                      <option value="Pagi">Pagi</option>
                      <option value="Siang">Siang</option>
                      <option value="Malam">Sore</option>
                    </select>
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
