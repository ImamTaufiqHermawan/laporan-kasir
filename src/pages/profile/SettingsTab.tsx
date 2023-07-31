// @ts-nocheck
import { UserService } from '@app/services/userService';
import { UpdateUserActions } from '@app/store/actions/userActions';
import { setAuthentication } from '@app/store/reducers/auth';
import { authLogin } from '@app/utils/oidc-providers';
import { PfButton } from '@profabric/react-components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SettingsTab = ({ isActive }: { isActive: boolean }) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState([])
  const [update, setUpdate] = useState(false)
  const { profile } = useSelector((state: any) => state.auth.authentication);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authLogin(formValues.user.email, formValues.user.password);
        dispatch(setAuthentication(response as any));
      } catch (error) {
        // Handle errors
      }
    };

    fetchData();

  }, [update])

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('name', formValues.user.name);
    formData.append('email', formValues.user.email);
    formData.append('password', formValues.user.password)
    dispatch(UpdateUserActions(profile.userId, formData));
    setUpdate(!update)
  }

  return (
    <div className={`tab-pane ${isActive ? 'active' : ''}`}>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">
            Nama
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name"
              onChange={(e) => setFormValues({ ...formValues, user: { ...formValues.user, name: e.target.value } })}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              onChange={(e) => setFormValues({ ...formValues, user: { ...formValues.user, email: e.target.value } })}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputName2" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="password"
              placeholder="password"
              onChange={(e) => setFormValues({ ...formValues, user: { ...formValues.user, password: e.target.value } })}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputSkills" className="col-sm-2 col-form-label">
            Photo
          </label>
          <div className="col-sm-10">
            <input
              type="file"
              id="photo"
              placeholder="photo"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="offset-sm-2 col-sm-10">
            <PfButton type="submit" >
              Submit
            </PfButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsTab;
