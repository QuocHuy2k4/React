import React from "react";
import { Link } from "react-router-dom";

const Adminn = ({ data, removeProduct }) => {
  return (
    <div>
      <Link to="/admin/product-add">
        <button className="btn btn-success">them moi</button>
      </Link>
      <table className="table table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>name</th>
            <th>img</th>
            <th>price</th>
            <th>Description</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>
                <img src={p.thumbnail} alt="" />
              </td>
              <td>{p.price}</td>
              <td>{p.description}</td>
              <td>
                <button
                  onClick={() => removeProduct(p.id)}
                  className="btn btn-danger"
                >
                  delete
                </button>
                <Link
                  className="btn btn-info"
                  to={`/admin/product-edit/${p.id}`}
                >
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Adminn;
