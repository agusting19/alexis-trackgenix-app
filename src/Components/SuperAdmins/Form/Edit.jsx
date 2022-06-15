import React from 'react';
import { useState } from 'react';
import styles from './add.module.css';
import ButtonText from '../../Shared/Buttons/ButtonText';
import Input from '../../Shared/Input';
import { useDispatch } from 'react-redux';
import { putSuperAdmins } from '../../../redux/super-admins/thunks';

const SuperAdminsFormEdit = ({ idEdit, closeModalForm }) => {
  const dispatch = useDispatch();
  // const [edited, setEdited] = useState(false);
  const [superAdminInput, setsuperAdminInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    active: ''
  });

  let editedSuperAdmin = JSON.stringify({
    firstName: superAdminInput.firstName,
    lastName: superAdminInput.lastName,
    email: superAdminInput.email,
    password: superAdminInput.password,
    active: superAdminInput.active
  });

  const submitEdit = () => {
    dispatch(putSuperAdmins(idEdit, editedSuperAdmin));
  };

  const onChange = (e) => {
    setsuperAdminInput({ ...superAdminInput, [e.target.name]: e.target.value });
    // setEdited(true);
  };

  const onChangeActive = (e) => {
    setsuperAdminInput({ ...superAdminInput, active: e.target.checked });
    // setEdited(true);
  };

  return (
    <form className={styles.formBody}>
      <Input
        label="First Name"
        type="text"
        name="firstName"
        placeholder="Insert first name"
        value={superAdminInput.firstName}
        onChange={onChange}
      />
      <Input
        label="Last Name"
        type="text"
        name="lastName"
        placeholder="Insert last name"
        value={superAdminInput.lastName}
        onChange={onChange}
      />
      <Input
        label="Email"
        type="text"
        name="email"
        placeholder="Insert email"
        value={superAdminInput.email}
        onChange={onChange}
      />
      <Input
        label="Password"
        type="text"
        name="password"
        placeholder="Insert password"
        value={superAdminInput.password}
        onChange={onChange}
      />
      <Input
        label="Active"
        name="active"
        type="checkbox"
        checked={superAdminInput.active}
        onChange={onChangeActive}
      />
      <div className={styles.buttonBox}>
        <ButtonText clickAction={closeModalForm} label="Cancel"></ButtonText>
        <ButtonText clickAction={submitEdit} label="Submit"></ButtonText>
      </div>
    </form>
  );
};

export default SuperAdminsFormEdit;
