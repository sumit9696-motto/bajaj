import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    // Backend API endpoint (replace with your actual deployed backend URL)
    const API_ENDPOINT = 'http://localhost:5000/bfhl';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Validate JSON
            const parsedInput = JSON.parse(jsonInput);

            // Send request to backend
            const res = await axios.post(API_ENDPOINT, parsedInput);
            setResponse(res.data);
        } catch (err) {
            setError('Invalid JSON or API request failed');
        }
    };

    const renderResponseData = () => {
        if (!response) return null;

        return (
            <div>
                {selectedOptions.includes('Numbers') && (
                    <div>
                        <h3>Numbers:</h3>
                        <p>{response.numbers.join(', ')}</p>
                    </div>
                )}
                {selectedOptions.includes('Alphabets') && (
                    <div>
                        <h3>Alphabets:</h3>
                        <p>{response.alphabets.join(', ')}</p>
                    </div>
                )}
                {selectedOptions.includes('Highest lowercase alphabet') && (
                    <div>
                        <h3>Highest Lowercase Alphabet:</h3>
                        <p>{response.highest_lowercase_alphabet.join(', ')}</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="App">
            {/* <h1>{ROLL_NUMBER}</h1> */}
            <form onSubmit={handleSubmit}>
                <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='Enter JSON (e.g., { "data": ["A","C","z"] })'
                    rows={4}
                />
                <button type="submit">Submit</button>
            </form>

            {error && <div className="error">{error}</div>}

            {response && (
                <div>
                    <h2>Select Display Options:</h2>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="Numbers"
                                checked={selectedOptions.includes('Numbers')}
                                onChange={(e) => 
                                    setSelectedOptions(
                                        e.target.checked 
                                        ? [...selectedOptions, 'Numbers']
                                        : selectedOptions.filter(opt => opt !== 'Numbers')
                                    )
                                }
                            />
                            Numbers
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Alphabets"
                                checked={selectedOptions.includes('Alphabets')}
                                onChange={(e) => 
                                    setSelectedOptions(
                                        e.target.checked 
                                        ? [...selectedOptions, 'Alphabets']
                                        : selectedOptions.filter(opt => opt !== 'Alphabets')
                                    )
                                }
                            />
                            Alphabets
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Highest lowercase alphabet"
                                checked={selectedOptions.includes('Highest lowercase alphabet')}
                                onChange={(e) => 
                                    setSelectedOptions(
                                        e.target.checked 
                                        ? [...selectedOptions, 'Highest lowercase alphabet']
                                        : selectedOptions.filter(opt => opt !== 'Highest lowercase alphabet')
                                    )
                                }
                            />
                            Highest Lowercase Alphabet
                        </label>
                    </div>

                    {renderResponseData()}
                </div>
            )}
        </div>
    );
}

export default App;