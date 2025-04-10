import React, { useEffect, useState } from 'react';
import api from '../api';

function ProteinPowderTable() {
  const [powders, setPowders] = useState([]);
  const [sortKey, setSortKey] = useState('price_per_protein');
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  useEffect(() => {
    api.get('protein-powders/')
      .then(res => setPowders(res.data))
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

  const sorted = [...powders].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (aVal < bVal) return sortAsc ? -1 : 1;
    if (aVal > bVal) return sortAsc ? 1 : -1;
    return 0;
  });

  const uniqueBrands = [...new Set(powders.map(p => p.brand))];

  const filtered = sorted.filter(p => {
    return (selectedBrand === 'All' || p.brand === selectedBrand) &&
           (!showVerifiedOnly || p.verified);
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
        Protein Powders
      </h2>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Brand:&nbsp;
          <select value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)}>
            <option value="All">All</option>
            {uniqueBrands.map((b, i) => (
              <option key={i} value={b}>{b}</option>
            ))}
          </select>
        </label>
        &nbsp;&nbsp;
        <label>
          <input
            type="checkbox"
            checked={showVerifiedOnly}
            onChange={e => setShowVerifiedOnly(e.target.checked)}
          />
          &nbsp;Show Verified Only
        </label>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ backgroundColor: "#333", color: "#fff", cursor: "pointer" }}>
              <th onClick={() => toggleSort('product_name')}>Product Name</th>
              <th onClick={() => toggleSort('brand')}>Brand</th>
              <th onClick={() => toggleSort('total_price')}>Price (₹)</th>
              <th onClick={() => toggleSort('grams')}>Weight (g)</th>
              <th onClick={() => toggleSort('total_calories')}>Calories</th>
              <th onClick={() => toggleSort('total_protein')}>Protein (g)</th>
              <th onClick={() => toggleSort('price_per_protein')}>₹/g Protein</th>
              <th onClick={() => toggleSort('calories_per_protein')}>kcal/g Protein</th>
              <th onClick={() => toggleSort('trustified')}>Trustified</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.affiliate_link ? (
                    <a href={p.affiliate_link} target="_blank" rel="noopener noreferrer" style={{ color: "#4CAF50" }}>
                      {p.product_name}
                    </a>
                  ) : (
                    p.product_name
                  )}
                </td>
                <td>{p.brand}</td>
                <td>{p.total_price}</td>
                <td>{p.grams}</td>
                <td>{p.total_calories}</td>
                <td>{p.total_protein}</td>
                <td>{p.price_per_protein.toFixed(2)}</td>
                <td>{p.calories_per_protein.toFixed(2)}</td>
                <td>
                  {p.trustified && p.trustified.toLowerCase().includes('pass') ? (
                    <span style={{ color: "green" }}>👍</span>
                  ) : (
                    <span style={{ color: "red" }}>👎</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProteinPowderTable;