import { useState, useEffect } from 'react';
import './Discovery.css';

function Discovery() {
    const [eventType, setEventType] = useState('');
    const [groupSize, setGroupSize] = useState('');
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [validationError, setValidationError] = useState(false);

    useEffect(() => {
        // Clear validation error once both fields are filled
        if (eventType.trim() && groupSize.trim()) {
            setValidationError(false);
        }
    }, [eventType, groupSize]);

    const getRecommendation = async () => {
        if (!eventType.trim() || !groupSize.trim()) {
            setValidationError(true);
            return;
        }

        setLoading(true);
        setError('');
        setData('');

        try {
            const response = await fetch('http://localhost:3000/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventType, groupSize })
            });

            if (!response.ok) throw new Error('Failed to fetch recommendation');
            const result = await response.json();
            setData(result.recommendation);
        } catch (err) {
            console.error(err);
            setError('Could not fetch recommendation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Discovery</h1>
        <div className="discovery-page">
            <div className="discovery-card">
                <div className="form-group">
                    <label>Event Type:</label>
                    <input
                        className="input-field"
                        type="text"
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        placeholder="e.g. matcha party"
                    />
                </div>
                <div className="form-group">
                    <label>Group Size:</label>
                    <input
                        className="input-field"
                        type="number"
                        value={groupSize}
                        onChange={(e) => setGroupSize(e.target.value)}
                        placeholder="e.g. 4"
                    />
                </div>

                {validationError && (
                    <p className="validation-error">Please fill out both boxes</p>
                )}

                <button
                    className="recommendation-btn"
                    onClick={getRecommendation}
                    disabled={loading}
                >
                    {loading ? 'Getting...' : 'Get Recommendation'}
                </button>

                <div className="response-section">
                    {error && <p className="error-text">{error}</p>}
                    {data && (
                        <p>
                            <strong>Recommendation:</strong> {data}
                        </p>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
}

export default Discovery;
