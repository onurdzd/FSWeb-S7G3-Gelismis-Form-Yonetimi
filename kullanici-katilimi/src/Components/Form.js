import React from "react";
import { useState } from "react";
import * as Yup from "yup";

const initialValue = {
  isim: "",
  email: "",
  şifre: "",
  şart: false,
};

const formSema = Yup.object({
  isim: Yup.string()
    .min(3, "En az 3 karakter olmalı")
    .max(6, "İsim en çok 6 karakter olmalıdır")
    .required("Bu alan gereklidir"),
  email: Yup.string().email().required("Bu alan gereklidir"),
  şifre: Yup.string()
    .min(5, "Şifre en az 5 karakter olmalıdır")
    .required("Bu alan gereklidir"),
  şart: Yup.boolean().oneOf([true], "Kabul etmeniz gereklidir"),
});

const Form = (props) => {
  const { handlerPost } = props;
  const [data, setData] = useState(initialValue);
  const [icerikler, setIcerikler] = useState([]);
  const [formError, setFormError] = useState({
    isim: "",
    email: "",
    şifre: "",
    şart: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({ ...data, [name]: type === "checkbox" ? checked : value });
    errorCheck(name, value, checked, type);
  };

  const errorCheck = (name, value, checked, type) => {
    Yup.reach(formSema, name)
      .validate(type === "checkbox" ? checked : value)
      .then(() => {
        setFormError({
          ...formError,
          [name]: "",
        });
      })
      .catch((error) => {
        setFormError({
          ...formError,
          [name]: error.errors[0],
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIcerikler([...icerikler, data]);
    setData("");
    handlerPost(icerikler[0]);
  };

  const handleClear = () => {
    setData(initialValue);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="labels">
          İsim
          <input
            type="text"
            name="isim"
            value={data.isim}
            onChange={handleChange}
          ></input>
        </label>
        <div className="error">{formError.isim}</div>
        <label className="labels">
          Email
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          ></input>
        </label>
        <div className="error">{formError.email}</div>
        <label className="labels">
          Şifre
          <input
            type="password"
            name="şifre"
            value={data.şifre}
            onChange={handleChange}
          ></input>
        </label>
        <div className="error">{formError.şifre}</div>
        <label className="labels">
          Kullanım Şartları(Terms of Service)
          <input
            className="labels"
            type="checkbox"
            name="şart"
            checked={data.şart}
            onChange={handleChange}
          ></input>
        </label>
        <div className="error">{formError.şart}</div>
        <button type="submit">Gönder</button>
        <button type="button" onClick={handleClear}>
          Temizle
        </button>
      </form>
      {icerikler.map((item, index) => (
        <div key={index}>{item.isim}</div>
      ))}
    </div>
  );
};

export default Form;
