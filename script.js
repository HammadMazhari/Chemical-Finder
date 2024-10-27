async function searchChemical() {
  const chemicalName = document.getElementById("chemicalName").value.trim();
  const resultDiv = document.getElementById("result");

  // Clear previous results or errors
  resultDiv.innerHTML = "";
  
  if (!chemicalName) {
    resultDiv.innerHTML = "<p class='error'>Please enter a chemical name.</p>";
    return;
  }

  try {
    const response = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${chemicalName}/property/IUPACName,MolecularFormula,MolecularWeight/JSON`);

    // Check if response is OK, if not throw an error
    if (!response.ok) {
      throw new Error(`No information found for '${chemicalName}'.`);
    }

    const data = await response.json();
    const compound = data.PropertyTable.Properties[0];

    // Display compound information if found
    resultDiv.innerHTML = `
      <p>IUPAC Name: ${compound.IUPACName || "N/A"}</p>
      <p>Common Name: ${chemicalName}</p>
      <p>Molecular Weight: ${compound.MolecularWeight} g/mol</p>
      <p>Formula: ${compound.MolecularFormula}</p>
    `;

  } catch (error) {
    // Display error message in result area
    resultDiv.innerHTML = `<p class='error'>${error.message}</p>`;
  }
}
