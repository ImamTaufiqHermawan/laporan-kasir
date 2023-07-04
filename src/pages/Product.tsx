import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ContentHeader } from "@components";
import Tables from "@app/components/table/Table";
import Search from "@app/components/search/Search";
import {
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Card,
  CardHeader,
  CardBody,
  Input,
  FormGroup,
} from "reactstrap";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CreateProductActions } from "@app/store/actions";
import { ProductService } from "@app/services/productService";
import User from "./User";
import { toast } from "react-toastify";

const Product = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const [formCreate, setFormCreate] = useState([]);
  const [products, setproducts] = useState([]);
  const { profile } = useSelector((state: any) => state.auth.authentication);

  console.log(profile);

  const [t] = useTranslation();

  // Toggle for Modal
  const toggleModal = () => {
    if (profile.role === "Staff") {
      toast.error("KAMU GAK BISA AKSES INI KARENA KAMU BUKAN MANAGER!");
    } else {
      setModal(!modal);
    }
  };

  useEffect(() => {
    ProductService.getProducts().then((res) => {
      setproducts(res.data.data);
    });
  }, [update]);

  const createHandler = async () => {
    dispatch(CreateProductActions(formCreate));
    setUpdate(!update);
    setModal(!modal);
  };

  return (
    <>
      <ContentHeader title="Produk" />
      <section className="content">
        <Search></Search>
        <Tables data={products}></Tables>
        <div className="input-group-append d-md-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-default btn-flat float-right my-3"
            onClick={toggleModal}
          >
            <i className="fas fa-pencil-alt mr-2" />
            Catat Produk
          </button>
        </div>
        {/* create modal */}
        <div
          style={{
            display: "block",
            padding: 30,
          }}
        >
          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Buat Produk</ModalHeader>
            <ModalBody>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="12">
                    <div className="form-group">
                      <label className="form-control-label">Nama Produk</label>
                      <Input
                        className="form-control-alternative"
                        id="input-name"
                        placeholder="ayam"
                        name="name"
                        type="text"
                        onChange={(e) =>
                          setFormCreate({ ...formCreate, name: e.target.value })
                        }
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
                        id="input-stock"
                        placeholder="0"
                        name="stock"
                        type="number"
                        onChange={(e) =>
                          setFormCreate({
                            ...formCreate,
                            stock: e.target.value,
                          })
                        }
                      />
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="form-group">
                      <label className="form-control-label">Harga</label>
                      <Input
                        className="form-control-alternative"
                        id="input-price"
                        placeholder="0"
                        name="price"
                        type="number"
                        onChange={(e) =>
                          setFormCreate({
                            ...formCreate,
                            price: e.target.value,
                          })
                        }
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={createHandler}>
                Submit
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </section>
    </>
  );
};

export default Product;
