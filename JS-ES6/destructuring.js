const id = 1;
const productName = "Suzuki";
const rate = 70000;

const product = {
    id,
    productName,
    rate,
};
const product2 = {
   description : "product2 Description",
   id,
   productName,
   rate, 

};
const {description}= product2;
console.log(product,description);