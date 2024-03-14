import { useEffect, useState } from "react";
import { bringAllUsers, removeUser } from "../../Services/apiCalls";
import { useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { userData } from "../userSlice";

export const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;

  useEffect(() => {
    if (users.length === 0) {
      bringAllUsers(token).then((res) => {
        setUsers(res.results);
      });
    }
  }, []);

  const removeButtonHandler = (id) => {
    removeUser(token, id).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4">All users</h1>
      {users && users.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>ROLE</th>
              <th>Name</th>
              <th className="d-none d-md-table-cell">Last Name</th>
              <th className="d-none d-md-table-cell">Email</th>
              <th className="d-none d-md-table-cell">Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.role_name}</td>
                <td>{user.name}</td>
                <td className="d-none d-md-table-cell">{user.last_name}</td>
                <td className="d-none d-md-table-cell">{user.email}</td>
                <td className="d-none d-md-table-cell">{user.phone_number}</td>

                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeButtonHandler(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No hay usuarios para mostrar.</p>
      )}
    </div>
  );
};
