


const transectionModel = require('../models/transectionModel');
const moment = require('moment');

const getAllTransection = async (req, res) => {
    try {
        const { frequency, selectedDate,type } = req.body;

        // Ensure selectedDate is defined when frequency is 'custom'
        if (frequency === 'custom' && (!selectedDate || selectedDate.length !== 2)) {
            return res.status(400).json({ error: 'Invalid custom date range' });
        }

        const transections = await transectionModel.find({
            ...(frequency !== 'custom'
                ? {
                    date: {
                        $gt: moment().subtract(Number(frequency), 'd').toDate(),
                    },
                }
                : {
                    date: {
                        $gte: new Date(selectedDate[0]),
                        $lte: new Date(selectedDate[1]),
                    },
                }),
            userid: req.body.userid,
            ...(type != 'all' && {type})
        });


        res.status(200).json(transections);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const deleteTransection = async(req,res)=>{
    try{
        await transectionModel.findOneAndDelete({_id:req.body.transactionId})
        res.status(200).send('Transaction deleted ')
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json(error)
    }
}

const editTransection=async(req,res)=>{
    try{
        await transectionModel.findOneAndUpdate({_id:req.body.transactionId},req.body.payload);
        res.status(200).send('Edit successfully');
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json(error)
    }
}

const addTransection = async (req, res) => {
    try {
        console.log('Request body:', req.body); // Log the request body

        const { userid, amount, type, Category,description, date } = req.body;

        // Check for missing fields
        if (!userid) return res.status(400).json({ error: 'User ID is required' });
        if (!amount) return res.status(400).json({ error: 'Amount is required' });
        if (!type) return res.status(400).json({ error: 'Type is required' });
        if (!Category) return res.status(400).json({ error: 'Category is required' });
        if (!description) return res.status(400).json({ error: 'Description is required' });
        if (!date) return res.status(400).json({ error: 'Date is required' });

        const newTransection = new transectionModel({
            userid,
            amount,
            type,
            Category,
            description,
            date,
        });

        await newTransection.save();
        res.status(201).send("Transaction Created");
    } catch (error) {
        console.error('Error saving transaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getAllTransection, addTransection,editTransection,deleteTransection };