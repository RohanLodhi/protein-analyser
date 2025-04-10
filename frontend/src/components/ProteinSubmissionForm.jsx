import React, { useState } from 'react';
import { submitProtein } from '../api';

const ProteinSubmissionForm = () => {
  const [form, setForm] = useState({
    product_name: '',
    brand: '',
    total_price: '',
    grams: '',
    total_calories: '',
    total_protein: '',
    trustified: '', // Added trustified field
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitProtein(form);
    alert('Submitted for review!');
    setForm({
      product_name: '',
      brand: '',
      total_price: '',
      grams: '',
      total_calories: '',
      total_protein: '',
      trustified: '', // Reset trustified field
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#1e1e1e',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        color: '#fff',
      }}
    >
      <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#4CAF50' }}>
        Submit New Protein Powder
      </h3>
      <div style={{ marginBottom: '15px' }}>
        <input
          name="product_name"
          placeholder="Product Name"
          value={form.product_name}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '10px',
          }}
        />
        <input
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '10px',
          }}
        />
        <input
          name="total_price"
          placeholder="Price (₹)"
          type="number"
          value={form.total_price}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '10px',
          }}
        />
        <input
          name="grams"
          placeholder="Weight (g)"
          type="number"
          value={form.grams}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '10px',
          }}
        />
        <input
          name="total_calories"
          placeholder="Calories"
          type="number"
          value={form.total_calories}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '10px',
          }}
        />
        <input
          name="total_protein"
          placeholder="Protein (g)"
          type="number"
          value={form.total_protein}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '10px',
          }}
        />
        <input
          name="trustified"
          placeholder="Trustified"
          value={form.trustified}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '10px',
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default ProteinSubmissionForm;