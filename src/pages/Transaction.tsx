import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentHeader } from '@components';
import Tables from '@app/components/table/Table';
import Search from '@app/components/search/Search';
import {
  Button, Modal, ModalFooter,
  ModalHeader, ModalBody, Card, CardHeader, CardBody, Input, FormGroup
} from "reactstrap"
import { Col, Row } from 'react-bootstrap';
import { Form } from 'react-router-dom';

const rupiah = (number: Number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(number);
}

// rupiah(20000) // "Rp 20.000,00"
const Transaction = () => {
  const [modal, setModal] = useState(false);

  const [t] = useTranslation();

  // Toggle for Modal
  const toggleModal = () => setModal(!modal);

  return (
    <>
      <ContentHeader title="Transaksi" />
      <section className="content">
        <Search></Search>
        <Tables></Tables>
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
              toggle={toggleModal}>Buat Transaksi</ModalHeader>
            <ModalBody>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="6">
                    <div className="form-group">
                      <label className="form-control-label">Nama Produk</label>
                      <select className="form-control" id="exampleFormControlSelect1">
                        <option>CFC 1</option>
                        <option>CFC 2</option>
                        <option>CFC 3</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="form-group">
                      <label className="form-control-label">Harga</label>
                      <Input
                        className="form-control-alternative"
                        id="input-email"
                        value={rupiah(0)}
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
                        value={rupiah(0)}
                        placeholder="0"
                        type="text"
                        disabled
                      />
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="form-group">
                      <label className="form-control-label">Tanggal</label>
                      <input className="form-control" type="date" />
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="form-group">
                      <label className="form-control-label">Shift</label>
                      <select className="form-control" id="exampleFormControlSelect1">
                        <option>Pagi</option>
                        <option>Siang</option>
                        <option>Sore</option>
                      </select>
                    </div>
                  </Col>
                </Row>
              </div>
            </ModalBody >
            <ModalFooter>
              <Button color="primary" onClick={toggleModal}>Submit</Button>
            </ModalFooter>
          </Modal >
        </div >
      </section >
    </>
  );
};

export default Transaction;
