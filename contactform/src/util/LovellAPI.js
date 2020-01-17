
const products = [{
  productId:1747,
  name: "Copa Mundial FG Football Boots",
  brand: "adidas",
  price: "£100",
  demographic: "mens",
  colours:["black", "blue"],
  imgSrc: "https://localhost/lovellrugby/products/1747.jpg",
  discount:"£20 off",
  link:"",

},
{
  productId:1746,
  name: "World Cup SG Football Boots",
  brand: "adidas",
  price: "£90",
  demographic: "mens",
  colours:["black", "white"],
  imgSrc: "https://localhost/lovellrugby/products/1746.jpg",
  discount:"£38 off",
  link:"",
},
{
  productId:24640,
  name: "F10 TRX FG Kids Football Boots Core White/Rich Blue/Solar Green",
  brand: "adidas",
  price: "£35.99",
  demographic: "kids",
  colours:["white", "blue"],
  imgSrc: "https://localhost/lovellrugby/products/24640.jpg",
  discount:"£15 off",
  link:"",
}
];

const validFilters = [{
  filterName: "Gender",
  filterKeys: [
    {
      keyName:"kids'",
      keyValue:"kids"
    },
    {
      keyName:"men's",
      keyValue:"mens"
    },
  ]
},
{
filterName: "Colour",
filterKeys: [
  {
    keyName:"Black",
    keyValue:"black"
  },
  {
    keyName:"White",
    keyValue:"white"
  },
  {
    keyName:"Blue",
    keyValue:"blue"
  },
]
},
{
  filterName: "Adult Sizes",
  filterKeys: [
    {
      keyName:"6'",
      keyValue:"6"
    },
    {
      keyName:"6.5",
      keyValue:"6H"
    },
    {
      keyName:"7",
      keyValue:"7"
    },
    {
      keyName:"7.5",
      keyValue:"7H"
    },
    {
      keyName:"8",
      keyValue:"8"
    },
    {
      keyName:"8.5",
      keyValue:"8H"
    },
  ]
},
{
  filterName: "Kids' Sizes",
  filterKeys: [
    {
      keyName:"10K'",
      keyValue:"10K"
    },
    {
      keyName:"11K",
      keyValue:"11K"
    },
    {
      keyName:"12K",
      keyValue:"12K"
    },
    {
      keyName:"13K",
      keyValue:"13K"
    },
    {
      keyName:"13.5K",
      keyValue:"13HK"
    },
    {
      keyName:"1",
      keyValue:"1"
    },
    {
      keyName:"2",
      keyValue:"2"
    },
  ]
},
];


const apikey = "api key "

const LovellAPI = {
    chooser: function(filters){

      let urlParams="";
      Object.keys(filters).forEach(key =>{
        urlParams += key+"="+filters[key]+"&";
      })
      urlParams = urlParams.replace(/&$/g,"");
      console.log(urlParams);

    return fetch(`http://api.localhost/chooser?`+urlParams,
      {
      header: {
        "Access-Control-Allow-Origin" : "*"
      }
    }).then(response => {
      return response.json();
    }).then( jsonResponse =>{
      let productList = Object.keys(jsonResponse).map(productID => {

        jsonResponse[productID].imgSrc = `https://www.lovell-rugby.co.uk/products/${productID}.jpg`
        return jsonResponse[productID];
      })
      console.log(productList);
      return {
        products:productList,
        filters: validFilters,
        invalidFilters: [],
      }
    });
  }
}







// const LovellAPI = {
//     chooser: function(filters){
//       //api json-y stuff to get valid filters and products from perl
//       console.log(JSON.stringify(filters));
//     return fetch(`http://api.localhost/chooser/?`+JSON.stringify(filters),
//       {
//       headers: {
//         filters: filters
//       }
//
//     }).then( (response) => {
//       let invalidFilters=[];
//       //console.log(filters);
//       if(filters.Gender === "mens" || filters.Gender === "womens"){
//         //console.log(filters);
//         invalidFilters.push("Kids' Sizes");
//
//       } else if (filters.Gender === "kids") {
//         invalidFilters.push("mens");
//         invalidFilters.push("womens");
//         invalidFilters.push("Adult Sizes")
//
//       }
//
//       // if(filterKey === "Gender" && keyvalue==="mens" || keyValue === "womens"){
//       //   invalidFilters.push("Kids' Sizes");
//       // }
//       // if(filterKey === "kids"){
//       //   invalidFilters.push("mens");
//       //   invalidFilters.push("womens");
//       // }
//       let validProducts = products.filter( product => {
//         let validProduct = true;
//         Object.keys(filters).forEach( filterKey => {
//
//
//           if(filterKey === "Colour"){
//             let validColour = false;
//             product.colours.forEach( colour =>{
//
//               if(colour === filters.Colour){
//                 validColour=true;
//               }
//             })
//             if( validColour === false){
//               validProduct = false;
//             }
//           }else if(filters[filterKey] !== product[filterKey==='Gender'?"demographic":filterKey]){
//             ;
//             validProduct = false;
//           }
//         })
//         return validProduct;
//       })
//       //console.log(validProducts);
//
//       return {
//         products: validProducts,
//         filters: validFilters,
//         invalidFilters: invalidFilters
//       }
//       return response.json()
//     }).then( (jsonResponse) => {
//
//       return { chooserPageVariables: jsonResponse};
//       // return{ chooserPageVariables: {
//       //     filters:filters,
//       //     products: products,
//       //   }
//       // }
//
//
//     });
//
//
//     }
//   };

  export default LovellAPI;
