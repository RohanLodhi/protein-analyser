import React, { useState } from 'react';
import ProteinPowderTable from './components/ProteinPowderTable';
import FoodProductTable from './components/FoodProductTable';
import ProteinSubmissionForm from './components/ProteinSubmissionForm';
import FoodSubmissionForm from './components/FoodSubmissionForm';

function App() {
  const [showProteinForm, setShowProteinForm] = useState(false);
  const [showFoodForm, setShowFoodForm] = useState(false);

  const openProteinForm = () => setShowProteinForm(true);
  const closeProteinForm = () => setShowProteinForm(false);

  const openFoodForm = () => setShowFoodForm(true);
  const closeFoodForm = () => setShowFoodForm(false);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column", // Stack content vertically
      minHeight: "100vh",
      width: "100vw",
      backgroundColor: "#121212",
      padding: "20px",
      boxSizing: "border-box"
    }}>
      <div style={{
        maxWidth: "900px",
        width: "100%",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#1e1e1e",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
        color: "#fff",
        overflowX: "auto"
      }}>
        <h1 style={{
          fontSize: "32px",
          fontWeight: "bold",
          color: "#fff",
          marginBottom: "20px",
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}>
          Protein Analyzer
        </h1>
        <div style={{ overflowX: "auto" }}>
          <ProteinPowderTable />
          <button
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
            onClick={openProteinForm}
          >
            Add New Protein Powder
          </button>
          <FoodProductTable />
          <button
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
            onClick={openFoodForm}
          >
            Add New Food Product
          </button>
        </div>
      </div>

      {/* Protein Submission Form Modal */}
      {showProteinForm && (
        <div style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "1000"
        }}>
          <div style={{
            backgroundColor: "#1e1e1e",
            padding: "20px",
            borderRadius: "10px",
            width: "90%",
            maxWidth: "500px",
            color: "#fff"
          }}>
            <h2 style={{ marginBottom: "20px" }}>Add New Protein Powder</h2>
            <ProteinSubmissionForm />
            <button
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
              onClick={closeProteinForm}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Food Submission Form Modal */}
      {showFoodForm && (
        <div style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "1000"
        }}>
          <div style={{
            backgroundColor: "#1e1e1e",
            padding: "20px",
            borderRadius: "10px",
            width: "90%",
            maxWidth: "500px",
            color: "#fff"
          }}>
            <h2 style={{ marginBottom: "20px" }}>Add New Food Product</h2>
            <FoodSubmissionForm />
            <button
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
              onClick={closeFoodForm}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer style={{
        marginTop: "20px",
        textAlign: "center",
        color: "#aaa",
        fontSize: "14px"
      }}>
        <p>
          Thanks to <a href="https://www.reddit.com/r/Fitness_India/comments/1jvtqwt/by_popular_demand_the_protein_comparison_table_in/" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ color: "#4CAF50", textDecoration: "none" }}>
            u/rockyourhead
          </a> for the idea.
        </p>
      </footer>
    </div>
  );
}

export default App;