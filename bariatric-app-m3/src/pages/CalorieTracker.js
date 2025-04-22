import React, { useState, useEffect } from 'react';
import './NutritionTracker.css';
import './Sliders.css';
import CircularSlider from '@fseehawer/react-circular-slider';



const CalorieTracker = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [calories, setCalories] = useState(0);
    const [protein, setProtein] = useState(0);
    const [fat, setFat] = useState(0);
    const [water, setWater] = useState(0);
    const [calorieGoal, setCaloriesGoal] = useState(2000);
    const [proteinGoal, setProteinGoal] = useState(200);
    const [fatGoal, setFatGoal] = useState(50);
    const [waterGoal, setWaterGoal] = useState(1000);
    const [showSettings, setShowSettings] = useState(false);
    const [selectedFoods, setSelectedFoods] = useState([]);

    const [waterInput, setWaterInput] = useState(0);


    const handleFoodClick = (food) => {
        setCalories((prevCalories) => prevCalories + food.calories);
        setProtein((prevProtein) => prevProtein + food.protein);
        setFat((prevFat) => prevFat + food.fat);
        setSelectedFoods((prevFoods) => [...prevFoods, food]);
    };

    const handleRemoveFood = (index) => {
        const removed = selectedFoods[index];
    
        setCalories((prev) => prev - removed.calories);
        setProtein((prev) => prev - removed.protein);
        setFat((prev) => prev - removed.fat);
    
        setSelectedFoods((prevFoods) => prevFoods.filter((_, i) => i !== index));
    };
    

    // Fetch food data from foods.json
    useEffect(() => {
        fetch("/foods.json")
            .then(response => response.json())
            .then(data => setFoods(data))
            .catch(error => console.error("Error loading food data:", error));
    }, []);

    // Filter foods based on search term
    useEffect(() => {
        if (searchTerm === "") {
            setFilteredFoods([]);
        } else {
            const results = foods.filter(food =>
                food.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredFoods(results);
        }
    }, [searchTerm, foods]);

    const menuBtn = document.getElementById('setting-container');


    return (
        <>
            <section className="container track-container">
                <div className="search">
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search for a food item..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredFoods.length > 0 && (
                    <ul className="food-list">
                        {filteredFoods.map((food, index) => (
                            <li key={index} >
                                <button
                                className="food-item"
                                onClick={() => handleFoodClick(food)}
                                >
                                <h3>{food.name}</h3>
                                <p>Calories: {food.calories} kcal</p>
                                <p>Protein: {food.protein} g</p>
                                <p>Carbs: {food.carbs} g</p>
                                <p>Fat: {food.fat} g</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

            </section>
                        
            <section className="container4 track-container">
                <div className="tracker-wrapper">
                <h3>Selected Foods</h3>
                <ul className="food-list">
                    {selectedFoods.map((food, index) => (
                    <li key={index} className="food-item">
                        <div>
                        <strong>{food.name}</strong> – {food.calories} kcal, {food.carbs} carbs, {food.protein}g protein, {food.fat}g fat
                        </div>
                        <button onClick={() => handleRemoveFood(index)}>Remove</button>
                    </li>
                    ))}
                </ul>
                </div>
            </section>

            <section className="container2 track-container">   
                <div className="tracker-wrapper">
                    <h2>Nutrition Goals</h2>
                    
                    <div className="progress-container">
                        <label>Calories: {calories} / {calorieGoal} kcal</label>
                        <progress className="progress-bar yellow" value={calories} max={calorieGoal}></progress>
                    </div>
                    
                    <div className="progress-container">
                        <label>Protein: {protein} / {proteinGoal} g</label>
                        <progress className="progress-bar yellow" value={protein} max={proteinGoal}></progress>
                    </div>
                    
                    <div className="progress-container">
                        <label>Fat: {fat} / {fatGoal} g</label>
                        <progress className="progress-bar yellow" value={fat} max={fatGoal}></progress>
                    </div>
                      
                    <div className="progress-container">
                        <label>Water: {water} / {waterGoal} oz</label>
                        <progress className="progress-bar blue" value={water} max={waterGoal}></progress>
                    </div>
                </div>
            </section>
            <section className="container3 track-container">         
                    <div className = "settings-Water-Wrapper">
                    <div className="settings-container">
                    <button className= "settings-container-button" onClick={() => setShowSettings(!showSettings)}>
                    {showSettings ? "Hide Settings" : "Adjust Goal"}
                    </button>

                    {showSettings && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="setting-box">Adjust Your Goals
                            <button onClick={() => setShowSettings(false)} className="close-button">Close</button>
                            
                            <div className="circular-slider-group">
                                <div className="circular-slider-control">
                                    <label>Calories</label>
                                    <CircularSlider
                                    label=""
                                    width={200}
                                    data={Array.from({ length: 51 }, (_, i) => i * 100)}
                                    dataIndex={calorieGoal / 100}
                                    onChange={setCaloriesGoal}
                                    knobColor="#f44336"
                                    progressColorFrom="#ff9800"
                                    progressColorTo="#f44336"
                                    trackColor="#eee"
                                    trackSize={20}
                                    knobSize={50}
                                    progressSize={21}
                                    />
                                    <input
                                    type="number"
                                    value={calorieGoal}
                                    onChange={(e) => setCaloriesGoal(Number(e.target.value))}
                                    />
                                </div>

                                <div className="circular-slider-control">
                                    <label>Protein (g)</label>
                                    <CircularSlider
                                    label=""
                                    width={200}
                                    data={Array.from({ length: 31 }, (_, i) => i * 10)}
                                    dataIndex={proteinGoal / 10}
                                    onChange={setProteinGoal}
                                    knobColor="#3f51b5"
                                    progressColorFrom="#03a9f4"
                                    progressColorTo="#3f51b5"
                                    trackColor="#eee"
                                    trackSize={20}
                                    knobSize={50}
                                    progressSize={21}
                                    />
                                    <input
                                    type="number"
                                    value={proteinGoal}
                                    onChange={(e) => setProteinGoal(Number(e.target.value))}
                                    />
                                </div>

                                <div className="circular-slider-control">
                                    <label>Fat (g)</label>
                                    <CircularSlider
                                    label=""
                                    width={200}
                                    data={Array.from({ length: 41 }, (_, i) => i * 5)}
                                    dataIndex={fatGoal / 5}
                                    onChange={setFatGoal}
                                    knobColor="#ff9800"
                                    progressColorFrom="#ffb74d"
                                    progressColorTo="#ff9800"
                                    trackColor="#eee"
                                    trackSize={20}
                                    knobSize={50}
                                    progressSize={21}
                                    />
                                    <input
                                    type="number"
                                    value={fatGoal}
                                    onChange={(e) => setFatGoal(Number(e.target.value))}
                                    />
                                </div>

                                <div className="circular-slider-control">
                                    <label>Water (oz)</label>
                                    <CircularSlider
                                    label=""
                                    width={200}
                                    data={Array.from({ length: 21 }, (_, i) => i * 10)}
                                    dataIndex={waterGoal / 10}
                                    onChange={setWaterGoal}
                                    knobColor="#2196f3"
                                    progressColorFrom="#b2ebf2"
                                    progressColorTo="#00bcd4"
                                    trackColor="#eee"
                                    trackSize={20}
                                    knobSize={50}
                                    progressSize={21}

                                    />
                                    <input
                                    type="number"
                                    value={waterGoal}
                                    onChange={(e) => setWaterGoal(Number(e.target.value))}
                                    />
                                </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )}
                </div>

                <div className="water-input-container">
                <label htmlFor="waterInput">Enter water intake (oz):</label>
                    <input 
                        type="number" 
                        id="waterInput" 
                        value={waterInput} 
                        onChange={(e) => setWaterInput(e.target.value)} 
                        min="0"
                    />
                    <button onClick={() => {
                        setWater(water + Number(waterInput)); 
                        setWaterInput(""); 
                    }}>
                        Add Water
                    </button>
                </div>
                
            </div>
            </section>

          

        </>
    );
};

export default CalorieTracker;
