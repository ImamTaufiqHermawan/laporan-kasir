// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentHeader } from '@components';
import Tables from '@app/components/table/User';
import Search from '@app/components/search/Search';
import {
  Button, Modal, ModalFooter,
  ModalHeader, ModalBody, Card, CardHeader, CardBody, Input, FormGroup
} from "reactstrap"
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CreateProductActions } from '@app/store/actions';
import { ProductService } from '@app/services/productService';
import { toast } from 'react-toastify';
import { UserService } from '@app/services/userService';
import { CreateUserActions } from '@app/store/actions/userActions';

const User = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = useState(false)
  const [formCreate, setFormCreate] = useState([])
  const [products, setproducts] = useState([])
  const [users, setUsers] = useState([])
  const { profile } = useSelector((state: any) => state.auth.authentication);

  const [t] = useTranslation();

  // Toggle for Modal
  const toggleModal = () => {
    if (profile.role === "Staff") {
      toast.error("Kamu bukan manager!");
    } else {
      setModal(!modal);
    }
  };

  useEffect(() => {
    UserService.getUsers().then((res) => {
      setUsers(res.data.data);
    });
  }, [update])

  const createHandler = async () => {
    dispatch(CreateUserActions(formCreate));
    setUpdate(!update)    
    setModal(!modal)
  }

  return (
    <>
      <ContentHeader title="Pegawai" />
      <section className="content">
        {/* <Search></Search> */}
        <Tables data={users}></Tables>
        <div className="input-group-append d-md-flex justify-content-end">
          <button type="submit" className="btn btn-default btn-flat float-right my-3" onClick={toggleModal}>
            <i className="fas fa-pencil-alt mr-2" />
            Bikin Akun Baru
          </button>
        </div>
        {/* create modal */}
        <div style={{
          display: 'block', padding: 30
        }}>
          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader
              toggle={toggleModal}>Buat Akun Pegawai</ModalHeader>
            <ModalBody>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="12">
                    <div className="form-group">
                      <label className="form-control-label">Nama Pegawai</label>
                      <Input
                        className="form-control-alternative"
                        id="input-name"
                        placeholder="Masukan Nama Pegawai"
                        name='name'
                        type="text"
                        onChange={(e) => setFormCreate({ ...formCreate, name: e.target.value })}
                      />
                    </div>
                  </Col>
                </Row>                
                <Row>
                  <Col lg="12">
                    <div className="form-group">
                      <label className="form-control-label">Email</label>
                      <Input
                        className="form-control-alternative"
                        id="input-email"
                        placeholder="Masukan Email Pegawai"
                        name='email'
                        type="text"
                        onChange={(e) => setFormCreate({ ...formCreate, email: e.target.value })}
                      />
                    </div>
                  </Col>
                </Row>                
                <Row>
                  <Col lg="12">
                    <div className="form-group">
                      <label className="form-control-label">Password</label>
                      <Input
                        className="form-control-alternative"
                        id="input-password"
                        placeholder="Masukkan Password"
                        name='name'
                        type="text"
                        onChange={(e) => setFormCreate({ ...formCreate, password: e.target.value })}
                      />
                    </div>
                  </Col>
                </Row>                
              </div>
            </ModalBody >
            <ModalFooter>
              <Button color="primary" onClick={createHandler}>Submit</Button>
            </ModalFooter>
          </Modal >
        </div >
      </section >
    </>
  );
};

export default User;
