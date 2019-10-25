import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, ModalBody,
} from 'reactstrap';

import { axiosWithAuth } from './utils/axiosWithAuth';


const ConfirmDelete = ({
  modal, toggleModal, url, item,
}) => {
  const handleDelete = () => {
    axiosWithAuth()
      .delete(url);
  };

  const handleCancel = () => {
    toggleModal();
  };

  return (
    <Modal isOpen={modal} toggle={toggleModal}>
      <ModalBody>
        <h6>{`Are you sure you wish to delete ${item}?`}</h6>
        <Button color="danger" onClick={handleDelete}>
          Confirm
        </Button>
        <Button color="secondary" onClick={handleCancel}>Cancel</Button>
      </ModalBody>
    </Modal>
  );
};

ConfirmDelete.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  item: PropTypes.string,
};

ConfirmDelete.defaultProps = {
  item: '',
};

export default ConfirmDelete;
