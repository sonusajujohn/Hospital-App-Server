const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const filePath = path.join(__dirname, '../hospital.json');

// Function to read data from hospitals.json
const getData = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};

// Function to write data to hospitals.json
const saveData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// GET Operation - get details of all hospitals

router.get('/', (req, res) => {
    const hospitals = getData();
    res.json(hospitals);
});

// POST Operation - to post a new hospital

router.post('/', (req, res) => {
    const hospitals = getData();
    const newId = hospitals.length + 1; // Incrementing id based on the current length
    const newHospital = {
        id: newId,
        name: req.body.name,
        patientCount: req.body.patientCount,
        location: req.body.location
    };
    hospitals.push(newHospital);
    saveData(hospitals);
    res.status(201).json(newHospital);
});

// PUT (update) a hospital by ID

router.put('/:id', (req, res) => {
    const hospitals = getData();
    const hospitalId = parseInt(req.params.id);

    for (let i = 0; i < hospitals.length; i++) {
        if (hospitals[i].id === hospitalId) {
            // Updating hospital data
            hospitals[i].name = req.body.name;
            hospitals[i].patientCount = req.body.patientCount;
            hospitals[i].location = req.body.location;
            saveData(hospitals);
            return res.json(hospitals[i]); // Returning the updated hospital
        }
    }
    res.status(404).json({ message: 'Hospital not found' });
});

// DELETE a hospital by ID

router.delete('/:id', (req, res) => {
    let hospitals = getData();
    const hospitalId = parseInt(req.params.id);
    hospitals = hospitals.filter(h => h.id !== hospitalId);
    saveData(hospitals);
    res.status(200).json({ message: 'Hospital deleted' });
});

module.exports = router;
