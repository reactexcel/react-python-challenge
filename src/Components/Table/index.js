import React, { useEffect, useState } from "react";
import "carbon-components/css/carbon-components.min.css";
import { useHistory } from "react-router-dom";
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Button,
  TableBatchActions,
  TableBatchAction,
} from "carbon-components-react";

import { headerData } from "./util";
import axios from "axios";
import Check from "../../assets/checkmark.svg";

import Delete from "../../assets/close.svg";
import './index.scss'

const BASEURL = "http://5.9.18.28:8030";

const TableComponent = (props) => {
  const [tableList, setTableList] = useState([]);
  const history = useHistory();
  const getTableData = async () => {
    const response = await axios.get(`${BASEURL}/auth/user/list/`);
    if (response.status === 200) {
      setTableList([...response.data]);
    }
  };
  useEffect(() => {
    getTableData();
  }, []);

  const getTableDatas = (data) => {
    if (
      data.info.header === "is_active" ||
      data.info.header === "is_staff" ||
      data.info.header === "is_superuser"
    ) {
      if (data.value) {
        return (
          <TableCell>
            <img src={Check} />
          </TableCell>
        );
      } else {
        return (
          <TableCell>
            <img src={Delete} />
          </TableCell>
        );
      }
    } else {
      return <TableCell>{data.value}</TableCell>;
    }
  };

  const handleActive = async (email) => {
    const payload = {
      email,
      is_active: true,
    };
    await axios.patch(`${BASEURL}/auth/user/profile/`, { ...payload });
  };

  const handleDelete = async (email) => {
    const payload = {
      email,
    };
    await axios.delete(`${BASEURL}/auth/user/delete/`, { data:payload });
  };

  const handleDeactive = async (email) => {
    const payload = {
      email,
      is_active: false,
    };
    await axios.patch(`${BASEURL}/auth/user/profile/`, { ...payload });
  };

  const handleActivateClick = (val) => {
    const selectedData = [...val];
    let promises = [];

    const filteredList = tableList.filter((o) =>
      selectedData.some(({ id }) => o.id === id)
    );
    filteredList.map((val) => {
      promises.push(handleActive(val.email));
    });
    Promise.all([...promises])
      .then((res) => {
        getTableData();
      })
      .catch((err) => console.log(err));
  };

  const handleActionDeleteClick = (val) => {
    const selectedData = [...val];
    let promises = [];

    const filteredList = tableList.filter((o) =>
      selectedData.some(({ id }) => o.id === id)
    );
    filteredList.map((val) => {
      promises.push(handleDelete(val.email));
    });

    Promise.all([...promises])
      .then((res) => {
        getTableData();
      })
      .catch((err) => console.log(err));
  };

  const handleDeactivateClick = (val) => {
    const selectedData = [...val];
    let promises = [];

    const filteredList = tableList.filter((o) =>
      selectedData.some(({ id }) => o.id === id)
    );
    filteredList.map((val) => {
      promises.push(handleDeactive(val.email));
    });

    Promise.all([...promises])
      .then((res) => {
        getTableData();
      })
      .catch((err) => console.log(err));
  };

  const handleAddNewRow = () => {
    history.push("/add-new-user");
  };
  return (
    <div className='table-wrapper'>
      <DataTable rows={tableList} headers={headerData}>
        {({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getSelectionProps,
          getToolbarProps,
          getBatchActionProps,
          onInputChange,
          selectedRows,
          getTableProps,
          getTableContainerProps,
        }) => (
          <TableContainer
            title="Users"
            {...getTableContainerProps()}
          >
            <TableToolbar {...getToolbarProps()}>
              <TableBatchActions {...getBatchActionProps()}>
                <TableBatchAction
                  tabIndex={
                    getBatchActionProps().shouldShowBatchActions ? 0 : -1
                  }

                  onClick={() => handleActionDeleteClick(selectedRows)}
                >
                  Delete
                </TableBatchAction>
                <TableBatchAction
                  tabIndex={
                    getBatchActionProps().shouldShowBatchActions ? 0 : -1
                  }

                  onClick={() => handleActivateClick(selectedRows)}
                >
                  Activate
                </TableBatchAction>
                <TableBatchAction
                  tabIndex={
                    getBatchActionProps().shouldShowBatchActions ? 0 : -1
                  }
                  onClick={() => handleDeactivateClick(selectedRows)}
                >
                  Deactivate
                </TableBatchAction>
              </TableBatchActions>
              <TableToolbarContent>
                <TableToolbarSearch
                  persistent='true'
                  tabIndex={
                    getBatchActionProps().shouldShowBatchActions ? -1 : 0
                  }
                  onChange={onInputChange}
                />
                <Button
                  tabIndex={
                    getBatchActionProps().shouldShowBatchActions ? -1 : 0
                  }
                  onClick={() => handleAddNewRow()}
                  size='small'
                  kind='primary'
                >
                  Add new
                </Button>
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  <TableSelectAll {...getSelectionProps()} />
                  {headers.map((header, i) => (
                    <TableHeader key={i} {...getHeaderProps({ header })} >
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow key={i} {...getRowProps({ row })}>
                    <TableSelectRow {...getSelectionProps({ row })} />
                    {row.cells.map((cell) => getTableDatas(cell))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>


    </div>
  );
};

export default TableComponent;
