// colombiaData.js
const axios = require("axios");

// Función para obtener los departamentos desde la API
async function getDepartments() {
  try {
    const response = await axios.get(
      "https://www.datos.gov.co/resource/xdk5-pm3f.json"
    );
    const departments = response.data.map((item) => item.departamento);
    return departments;
  } catch (error) {
    console.error("Error al obtener departamentos", error);
    throw error;
  }
}

// Función para obtener los municipios por departamento desde la API
async function getMunicipalitiesByDepartment(department) {
  try {
    const response = await axios.get(
      `https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=${department}`
    );
    const municipalities = response.data.map((item) => item.municipio);
    return municipalities;
  } catch (error) {
    console.error("Error al obtener municipios", error);
    throw error;
  }
}

module.exports = {
  getDepartments,
  getMunicipalitiesByDepartment,
};
