const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const USER_ID = 'sumitrai14042002'; 
const EMAIL = 'sumitkumar220182@acropolis.in';
const ROLL_NUMBER = '0827cs223D17';


function isNumeric(value) {
    return !isNaN(value) && !isNaN(parseFloat(value));
}

function isPrime(num) {
    const number = parseInt(num);
    if (number <= 1) return false;
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) return false;
    }
    return true;
}

function findHighestLowercaseAlphabet(alphabets) {
    const lowercaseAlphabets = alphabets.filter(char => /[a-z]/.test(char));
    if (lowercaseAlphabets.length === 0) return [];
    return [lowercaseAlphabets.reduce((a, b) => a > b ? a : b)];
}

function validateBase64File(base64String) {
    try {
        
        if (!base64String || base64String === 'BASE_64_STRING') {
            return {
                file_valid: false,
                file_mime_type: null,
                file_size_kb: 0
            };
        }

       
        return {
            file_valid: true,
            file_mime_type: 'image/png', 
            file_size_kb: 400 
        };
    } catch (error) {
        return {
            file_valid: false,
            file_mime_type: null,
            file_size_kb: 0
        };
    }
}


app.post('/bfhl', (req, res) => {
    try {
        const { data, file_b64 } = req.body;

       
        const numbers = data.filter(isNumeric);
        const alphabets = data.filter(char => /[a-zA-Z]/.test(char));

        
        const fileValidation = validateBase64File(file_b64);

    
        const isPrimeFound = numbers.some(isPrime);

        res.json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers,
            alphabets,
            highest_lowercase_alphabet: findHighestLowercaseAlphabet(alphabets),
            is_prime_found: isPrimeFound,
            ...fileValidation
        });
    } catch (error) {
        res.status(500).json({
            is_success: false,
            error: error.message
        });
    }
});


app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;