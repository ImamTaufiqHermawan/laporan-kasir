// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentHeader } from '@components';
import TransactionTables from '@app/components/table/Transaction';
import Search from '@app/components/search/Search';
import {
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Input,
} from "reactstrap"
import { Col, Row } from 'react-bootstrap';
import { ProductService } from '@app/services/productService';
import { CreateTransactionActions } from '@app/store/actions/transactionActions';
import { TransactionService } from '@app/services/transactionService';
import { useDispatch } from 'react-redux';
import AutocompleteInput from '@app/components/inputAutoComplete/InputAutoComplete';

const rupiah = (number: Number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(number);
}

// rupiah(20000) // "Rp 20.000,00"
const Transaction = () => {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false)
  const [modal, setModal] = useState(false);
  const [transactions, setTransactions] = useState([])
  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState(0)
  const [product, setProduct] = useState({ product: { price: 0 } })
  const [totalPrice, setTotalPrice] = useState(0)
  const [formCreate, setFormCreate] = useState({})
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [filterDate, setFilterDate] = useState();

  useEffect(() => {
    TransactionService.getTransactions({ searchName, filterDate, page, limit: 5 }).then((res) => {
      setTransactions(res.data.data);
    });
  }, [update, searchName])

  useEffect(() => {
    ProductService.getProducts().then((res) => {
      setProducts(res.data.data);
    });
  }, [])

  useEffect(() => {
    if (productId == 0) {
      setProduct({ product: { price: 0 } });
      setTotalPrice(0)
    }
    ProductService.getProductById(productId).then((res) => {
      setProduct(res.data.data);
    });
    console.log(product)
  }, [productId])

  useEffect(() => {
    setTotalPrice(formCreate?.quantity * product?.product?.price)
  }, [formCreate?.quantity, productId])

  const [t] = useTranslation();

  // Toggle for Modal
  const toggleModal = () => setModal(!modal);

  const productHandler = (e) => {
    console.log(e.target.value)
    setFormCreate({ ...formCreate, productId: e.target.value })
    console.log(formCreate)
    setProductId(e.target.value)
  }

  const createHandler = async () => {
    dispatch(CreateTransactionActions(formCreate));
    setUpdate(!update)
    setModal(!modal)
  }

  return (
    <>
      <ContentHeader title="Transaksi" />
      <section className="content">

        {/* <Search menu='transaction'></Search> */}        

        <TransactionTables data={transactions}></TransactionTables>
        <div className="input-group-append d-md-flex justify-content-end">
          <button type="submit" className="btn btn-default btn-flat float-right my-3" onClick={toggleModal}>
            <i className="fas fa-pencil-alt mr-2" />
            Catat Transaksi
          </button>
        </div>
        {/* create modal */}
        <div style={{
          display: 'block', padding: 30
        }}>
          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader
              toggle={toggleModal}>Transaksi</ModalHeader>
            <ModalBody>Buat Transaksi
              <div className="pl-lg-4">
                <Row>
                  <Col lg="6">
                    <div className="form-group">
                      <label className="form-control-label">Nama Produk</label>
                      <select className="form-control" id="exampleFormControlSelect1" onChange={(e) => productHandler(e)}>
                        <option value={0}>-- Pilih Product --</option>
                        {products?.map((item) => {
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
                        value={rupiah(product?.product?.price)}
                        placeholder="0"
                        type="text"
                        disabled
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
                        onChange={(e) => setFormCreate({ ...formCreate, quantity: e.target.value, totalPrice: e.target.value * product?.product?.price })}
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
                        value={rupiah(totalPrice)}
                        placeholder="0"
                        type="text"
                        disabled
                      />
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="form-group">
                      <label className="form-control-label">Tanggal</label>
                      <input className="form-control" type="date" onChange={(e) => setFormCreate({ ...formCreate, transactionDate: e.target.value })} />
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="form-group">
                      <label className="form-control-label">Shift</label>
                      <select className="form-control" id="exampleFormControlSelect1" onChange={(e) => setFormCreate({ ...formCreate, shift: e.target.value })}>
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
              <Button color="primary" onClick={() => createHandler()}>Submit</Button>
            </ModalFooter>
          </Modal >
        </div >
      </section >
    </>
  );
};

export default Transaction;
