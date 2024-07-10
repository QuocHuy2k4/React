import React, { useEffect, useState } from "react";
import "./App.scss";
import NotFound from "./pages/NotFound";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
import api from "./axios/index";
import PrivateRoute from "./pages/admin/PrivateRoute ";
import Adminn from "./pages/admin/Adminn";
import ProductForm from "./pages/admin/ProductForm";
import AuthForm from "./pages/admin/AuthForm";

function App() {
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/products");
      setproducts(data);
    })();
  }, []);

  const removeProduct = async (id) => {
    if (confirm("Are you sure?")) {
      await api.delete(`/products/${id}`);
      const newData = products.filter((item) => item.id !== id && item);
      setproducts(newData);
    }
  };
  const handleProduct = async (data) => {
    if (data.id) {
      // logic cho edit product
      await api.patch(`/products/${data.id}`, data);
      const newData = await api.get("/products");
      setproducts(newData.data);
    } else {
      // logic cho add product
      const res = await api.post("/products", data);
      setproducts([...products, res.data]);
    }
    if (confirm("Successfully, redirect to admin page?")) {
      navigate("/admin");
    }
  };
  const logout = () => {
    if (confirm("Are you sure?")) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };
  return (
    <div>
      <header>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">about</Link>
          </li>
          <li>
            <Link to="/admin">admin</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          {user ? (
            <li>
              <button onClick={logout} className="btn btn-danger">
                Hello {user?.user?.email} - Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home data={products} />} />

          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/register" element={<AuthForm isRegister />} />
          <Route path="/" element={<Navigate to="/admin" />} />

          <Route path="/admin" element={<PrivateRoute />}>
            <Route
              path="/admin"
              element={<Adminn data={products} removeProduct={removeProduct} />}
            />
            <Route
              path="/admin/product-add"
              element={<ProductForm handleProduct={handleProduct} />}
            />
            <Route
              path="/admin/product-edit/:id"
              element={<ProductForm handleProduct={handleProduct} />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
