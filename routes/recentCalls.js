const express = require('express');
const router = express.Router();
const RecentCall = require('../models/recentCall');

// POST: Create or update a recent call
router.post('/', async (req, res) => {
    try {
        const existingCall = await RecentCall.findOne({ id: req.body.id });

        if (existingCall) {
            // Update the existing call
            const updatedCall = await RecentCall.findOneAndUpdate(
                { id: req.body.id }, 
                { ...req.body }, 
                { new: true }
            );
            res.status(200).json(updatedCall);
        } else {
            // Create a new call
            const newCall = new RecentCall(req.body);
            const savedCall = await newCall.save();
            res.status(201).json(savedCall);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// GET: Retrieve all recent calls
router.get('/', async (req, res) => {
    try {
        const recentCalls = await RecentCall.find();
        res.json(recentCalls);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Retrieve a specific recent call by ID
router.get('/:id', async (req, res) => {
    try {
        const recentCall = await RecentCall.findById(req.params.id);
        if (!recentCall) return res.status(404).json({ message: 'Call not found' });
        res.json(recentCall);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Retrieve a specific recent call by custom ID (not MongoDB _id)
router.get('/by-id/:id', async (req, res) => {
    try {
        const recentCall = await RecentCall.findOne({ id: req.params.id });
        if (!recentCall) return res.status(404).json({ message: 'Call not found' });
        res.json(recentCall);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// PUT: Update a specific recent call by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedCall = await RecentCall.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCall) return res.status(404).json({ message: 'Call not found' });
        res.json(updatedCall);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT: Update a specific recent call by custom ID (not MongoDB _id)
router.put('/by-id/:id', async (req, res) => {
    try {
        const updatedCall = await RecentCall.findOneAndUpdate(
            { id: req.params.id }, 
            { ...req.body }, // Allow updating all fields including status
            { new: true }
        );
        if (!updatedCall) return res.status(404).json({ message: 'Call not found' });
        res.json(updatedCall);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// DELETE: Delete a specific recent call by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedCall = await RecentCall.findByIdAndDelete(req.params.id);
        if (!deletedCall) return res.status(404).json({ message: 'Call not found' });
        res.json({ message: 'Call deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE: Delete a specific recent call by custom ID (not MongoDB _id)
router.delete('/by-id/:id', async (req, res) => {
    try {
        const recentCall = await RecentCall.findOne({ id: req.params.id });
        if (!recentCall) return res.status(404).json({ message: 'Recent call not found' });
        await RecentCall.deleteOne({ id: req.params.id });
        res.json({ message: 'Recent call deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




module.exports = router;
