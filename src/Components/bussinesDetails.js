//This is an array object for business type

const bussinesTypeList = [
  { id: "01", bussiness_type: "Online Business", bussine_type_code: "001" },
  { id: "02", bussiness_type: "Home-based Business", bussine_type_code: "002" },
  {
    id: "03",
    bussiness_type: "Service-based Business",
    bussine_type_code: "003",
  },
];

//This are business list of each business type
const bussinessList = [
  {
    id: "01",
    bussiness_name: "Online Retail Store",
    bussine_type_code: "001",
    bussiness_type: "Online Business",
  },
  {
    id: "02",
    bussiness_name: "Dropshipping Business",
    bussine_type_code: "001",
    bussiness_type: "Online Business",
  },
  {
    id: "03",
    bussiness_name: "Home-based Bakery",
    bussine_type_code: "002",
    bussiness_type: "Home-based Business",
  },
  {
    id: "04",
    bussiness_name: "Sari-sari store",
    bussine_type_code: "002",
    bussiness_type: "Home-based Business",
  },
  {
    id: "05",
    bussiness_name: "Cellphone load business",
    bussine_type_code: "002",
    bussiness_type: "Home-based Business",
  },
  {
    id: "06",
    bussiness_name: "Baking",
    bussine_type_code: "002",
    bussiness_type: "Home-based Business",
  },
  {
    id: "07",
    bussiness_name: "Catering",
    bussine_type_code: "002",
    bussiness_type: "Home-based Business",
  },
  {
    id: "08",
    bussiness_name: "Candle making",
    bussine_type_code: "002",
    bussiness_type: "Home-based Business",
  },

  {
    id: "09",
    bussiness_name: "Housekeeping",
    bussine_type_code: "003",
    bussiness_type: "Service-based Business",
  },
  {
    id: "10",
    bussiness_name: "Maintenance service",
    bussine_type_code: "003",
    bussiness_type: "Service-based Business",
  },
  {
    id: "11",
    bussiness_name: "Graphic design",
    bussine_type_code: "003",
    bussiness_type: "Service-based Business",
  },
  {
    id: "12",
    bussiness_name: "Auto mechanic shop",
    bussine_type_code: "003",
    bussiness_type: "Service-based Business",
  },
  {
    id: "13",
    bussiness_name: "Car washes",
    bussine_type_code: "003",
    bussiness_type: "Service-based Business",
  },
  {
    id: "14",
    bussiness_name: "House painting",
    bussine_type_code: "003",
    bussiness_type: "Service-based Business",
  },
  {
    id: "15",
    bussiness_name: "Appliance repair",
    bussine_type_code: "002",
    bussiness_type: "Home-based Business",
  },
  {
    id: "16",
    bussiness_name: "Siomai",
    bussine_type_code: "002",
    bussiness_type: "Home-based Business",
  },
];

//When you call this function in your .js file this will return all the business type
function bussinessTypes() {
  return bussinesTypeList;
}

//When you call this function it has a parameteres which is the code of the business type
//and it will return the business list that has the busiess type code of it
function bussinessesName(code) {
  //This function use to filter the business type code of the business list that is match on the code you pass as a parameters
  return bussinessList.filter((item) => item.bussine_type_code === code);
}

export { bussinessTypes, bussinessesName };
