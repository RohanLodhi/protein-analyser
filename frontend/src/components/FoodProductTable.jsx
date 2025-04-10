import React, { useEffect, useState } from 'react';
import api from '../api';

function FoodProductTable() {
  const [products, setProducts] = useState([]);
  const [sortKey, setSortKey] = useState('price_per_100g');
  const [sortAsc, setSortAsc] = useState(true);
  const [proteinSourceFilter, setProteinSourceFilter] = useState('All'); // New filter state

  useEffect(() => {
    api.get('food-products/')
      .then(res => {
        const updatedProducts = res.data.map(product => ({
          ...product,
          price_per_100g: product.total_price && product.grams ? (product.total_price / product.grams) * 100 : 0,
          calories_per_100g: product.total_calories && product.grams ? (product.total_calories / product.grams) * 100 : 0,
        }));
        setProducts(updatedProducts);
      })
      .catch(err => console.error(err));
  }, []);

  const toggleSort = (key) => {
    if (key === sortKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sorted = [...products].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (aVal < bVal) return sortAsc ? -1 : 1;
    if (aVal > bVal) return sortAsc ? 1 : -1;
    return 0;
  });

  const filtered = sorted.filter(p => {
    if (proteinSourceFilter === 'All') return true;
    if (proteinSourceFilter === 'Veg') return p.protein_source === 'Veg' || p.protein_source === 'Dairy'; // Includes all vegetarian products
    if (proteinSourceFilter === 'Vegan') return p.protein_source === 'Veg';
    if (proteinSourceFilter === 'Non-Veg') return p.protein_source === 'Non Veg' || p.protein_source === 'Egg'; // Includes Non-Veg and Egg
    return true;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
        Food Products
      </h2>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Protein Source:&nbsp;
          <select
            value={proteinSourceFilter}
            onChange={e => setProteinSourceFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Vegan">Vegan</option>
          </select>
        </label>
      </div>

      {/* Add a wrapper with overflow-x: auto */}
      <div style={{ overflowX: "auto" }}>
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ backgroundColor: "#333", cursor: "pointer", color: "#fff" }}>
              <th onClick={() => toggleSort('product_name')}>Product Name</th>
              <th onClick={() => toggleSort('total_price')}>Price (₹)</th>
              <th onClick={() => toggleSort('grams')}>Weight (g)</th>
              <th onClick={() => toggleSort('total_calories')}>Calories</th>
              <th onClick={() => toggleSort('total_protein')}>Protein (g)</th>
              <th onClick={() => toggleSort('price_per_100g')}>₹/g Protein</th>
              <th onClick={() => toggleSort('calories_per_100g')}>kcal/g Protein</th>
              <th onClick={() => toggleSort('protein_source')}>Protein Source</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>{p.product_name}</td>
                <td>{p.total_price}</td>
                <td>{p.grams}</td>
                <td>{p.total_calories}</td>
                <td>{p.total_protein}</td>
                <td>{p.price_per_100g.toFixed(0)}</td>
                <td>{p.calories_per_100g.toFixed(0)}</td>
                <td>{p.protein_source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FoodProductTable;