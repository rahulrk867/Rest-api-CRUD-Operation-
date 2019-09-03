const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

//giving data to the server 
const customers = [
    {title: 'Rahul', id: 1},
    {title: 'Raja', id: 2},
    {title: 'Rakesh', id: 3},
    {title: 'Vishal', id: 4},
    {title: 'ronaldo', id: 5}
    
] 

//read request handler 
app.get('/' , (req, res) => {
    res.send("wlcome to my first rest api code");
});

//display the list of customer 
app.get('/api/customers', (req,res) => 
{
    res.send(customers);
});

app.get('/api/customers/:id',(req,res) => {
    const customer=customers.find(c=> c.id === parseInt(req.params.id));
    //if there is no valid customer id , then displaying the error message 
    if(!customer)res.status(404).send('<h2 style="font-family: Malgum Gothic; color: darkred;"> OOps .. cant find what are you looking!</h2> ');
    res.send(customer);
});

//create new customer information 

app.post('/api/customers', (req,res) => 
{
    const {error} = validateCustomer(req.body);
    if(error)
    {
        res.status(400).send(error.details[0].message)
        return;
    }
    //Increment the custome id 
    const customer = {
         id: customers.length + 1,
         title: req.body.title
    };
    customers.push(customer);
    res.send(customer);
});



//To update the existing customer information
app.put('/api/customers/:id', (req,res) =>
{
    const customer = customers.find(c =>c.id === parseInt(req.params.id));
    if(!customer)res.status(404).send('<h2 style="font-family: Malgum Gothic; color: darkred;"> Not found</h2> ');
     
    const {error} = validateCustomer(req.body);
    if(error)
    {
        res.status(400).send(error.details[0].message);
        return;
    }
    customer.title=req.body.title;
    res.send(customer);
});


//to delete the customer information 
app.delete('/api/customers/:id', (req,res) =>
{
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if(!customer)res.status(404).send('<h2 style="font-family: Malgum Gothic; color: darkred;"> Not found</h2> ');
    const index=customers.indexOf(customer);
    customers.splice(index, 1)


    res.send(customer);

});

//validate information 
function validateCustomer(customer)
{
    const schema =
    {
        title: Joi.string().min(3).required()
    };
    return Joi.validate(customer, schema);
}

//port enviroment variable 
const port = process.env.PORT || 8090;
app.listen(port , () => console.log('Listening on port ${port}..'));