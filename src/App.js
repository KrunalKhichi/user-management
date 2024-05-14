import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./App.css";
import useDebounce from './hooks/useDebounce';
import SearchBox from './components/SearchBox';
import Button from './components/Common/Button';
import CommonModal from './components/Modals/CommonModal'
import DeletePopup from './components/Modals/DeletePopup';
import Table from './components/Table/Table';
import UserForm from './components/UserForm';
import { deleteUser } from './redux/userSlice';
import { successToast } from './utils/helper';

const App = () => {
  const userRef = useRef();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.users);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([])
  const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const debouncedSearch = useDebounce(search, 500);

  const handleSearch = (value) => {
    setSearch(value);

    if(value === ''){
      setFilteredData(users);
    }
  }

  const editHandler = (user) => {
    setCurrentUser(user);
    setAddEditModalOpen(true);
  };

  const deleteHandler = (data) => {
    setCurrentUser(data);
    setDeleteModalOpen(true);
  };

  const deleteUserFromList = () => {
    dispatch(deleteUser(currentUser.id));
    setDeleteModalOpen(false);
    successToast('User deleted successfully');
  }

  useEffect(() => {
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(debouncedSearch?.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedSearch?.toLowerCase())
    );
    setFilteredData(filteredUsers);
  }, [debouncedSearch, users]);

  return (
    <div className="container">
      <div className='flex justify-between items-center'>
        <SearchBox onSearch={handleSearch} />
        <Button className='bg-blue-500 text-white' onClick={() => {
            setAddEditModalOpen(true);
            setCurrentUser(null);
            setSearch('')
          }}>
          Add New User
        </Button>
      </div>

      <Table searchTerm={search} searchData={filteredData} editHandler={editHandler} deleteHandler={deleteHandler} />
      
      {isAddEditModalOpen && 
        <CommonModal 
          isOverflow={true}
          maxWidth='sm:max-w-xl'
          ModalHeader={`${currentUser?.id ? "Edit" : "Add"} User`}
          isOpen={isAddEditModalOpen}
          onClose={setAddEditModalOpen}
          onSuccess={() => userRef?.current?.handleSubmit()}
        >
          <UserForm ref={userRef} allUsers={users} user={currentUser} onClose={() => setAddEditModalOpen(false)} />
        </CommonModal>
      }

      {isDeleteModalOpen && 
        <DeletePopup
          open={isDeleteModalOpen}
          setOpen={setDeleteModalOpen}
          title='user'
          message={
            <>
              Are you sure you want to delete{' '}
              <strong>{currentUser?.name}</strong> user?
            </>
          }
          setDelete={(delPass) => {
            deleteUserFromList(delPass);
          }}
        />
      }
    </div>
  );
};

export default App;
