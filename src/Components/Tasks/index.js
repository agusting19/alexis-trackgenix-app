import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delTask, getTasks } from '../../redux/tasks/thunks';
import AddButton from '../Shared/Buttons/ButtonAdd';
import ConfirmModal from '../Shared/confirmationModal/confirmModal';
import MessageModal from '../Shared/ErrorSuccessModal';
import Modal from '../Shared/ModalForm/index';
import Preloader from '../Shared/Preloader/Preloader';
import Table from '../Shared/Table/Table';
import EditForm from './Edit/Edit';
import Form from './Form/Form';
import styles from './tasks.module.css';

function Tasks() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);
  const isLoading = useSelector((state) => state.tasks.isLoading);

  const [showModalFormAdd, setShowModalFormAdd] = useState(false);
  const [showModalFormEdit, setShowModalFormEdit] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  const [idDelete, setIdDelete] = useState(0);
  const [idToEdit, setIdToEdit] = useState();

  let modalEdit;
  let modalAdd;
  let modalMessage;

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const handleConfirm = () => {
    dispatch(delTask(idDelete, (response) => setMessage(response))).then(() => {
      closeModal();
      setShowConfirmModal(false);
      setShowMessageModal(true);
    });
  };

  const openConfirmModal = (id) => {
    setShowConfirmModal(true);
    setIdDelete(id);
  };

  const openAddModal = () => {
    setShowModalFormAdd(true);
  };

  const openEditModal = (id) => {
    setIdToEdit(id);
    setShowModalFormEdit(true);
  };

  const closeModal = () => {
    setShowMessageModal(false);
    setShowModalFormAdd(false);
    setShowModalFormEdit(false);
    setShowConfirmModal(false);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  if (showModalFormEdit) {
    modalEdit = (
      <Modal isOpen={showModalFormEdit} handleClose={closeModal} title="Edit Task">
        <EditForm closeModalForm={closeModal} task={tasks.find((item) => item._id === idToEdit)} />
      </Modal>
    );
  }

  if (showModalFormAdd) {
    modalAdd = (
      <Modal isOpen={showModalFormAdd} handleClose={closeModal} title="Add Task">
        <Form closeModalForm={closeModal} />
      </Modal>
    );
  }

  if (showConfirmModal) {
    modalMessage = (
      <ConfirmModal
        isOpen={showConfirmModal}
        handleClose={closeModal}
        confirmDelete={handleConfirm}
        title="Delete Task"
        message="¿Are you sure you want to delete the task?"
      />
    );
  }

  return isLoading &&
    !showModalFormEdit &&
    !showModalFormAdd &&
    !showMessageModal &&
    !showConfirmModal ? (
    <Preloader>
      <p>Loading Tasks</p>
    </Preloader>
  ) : (
    <section className={styles.container}>
      <h2>TASKS</h2>
      {modalEdit}
      {modalAdd}
      {modalMessage}
      <Table
        data={tasks}
        headers={['taskName', 'startDate', 'workedHours', 'description', 'status']}
        titles={['Task Name', 'Start Date', 'Worked Hours', 'Description', 'Status']}
        delAction={openConfirmModal}
        editAction={openEditModal}
      />
      <MessageModal
        show={showMessageModal}
        closeModal={closeMessageModal}
        closeModalForm={closeModal}
        successResponse={message}
      />
      <AddButton clickAction={openAddModal}></AddButton>
    </section>
  );
}

export default Tasks;
