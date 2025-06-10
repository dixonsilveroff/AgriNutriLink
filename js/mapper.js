// Crop-Nutrition Mapper functionality

// Sample crop data (in a real application, this would come from a database)
const cropData = [
    
    {
        id: 2,
        name: 'Sweet Potato',
        nutrients: {
            protein: 1.6,
            vitamins: ['A', 'C', 'B6'],
            minerals: ['Potassium', 'Manganese'],
            fiber: 3.0
        },
        season: ['dry', 'wet'],
        months: ['April', 'May', 'June', 'July', 'August', 'September'],
        image: 'assets/images/potatoes.jpg'
    },
    {
        id: 3,
        name: 'Rice',
        nutrients: {
            protein: 2.7,
            vitamins: ['B1', 'B3', 'B6'],
            minerals: ['Magnesium', 'Phosphorus'],
            fiber: 0.4
        },
        season: ['wet'],
        months: ['May', 'June', 'July', 'August', 'September', 'October'],
        image: 'assets/images/rice.jpeg'
    },
    {
        id: 4,
        name: 'Brown Beans',
        nutrients: {
            protein: 8.9,
            vitamins: ['B1', 'B6', 'Folate'],
            minerals: ['Iron', 'Magnesium', 'Potassium'],
            fiber: 6.4
        },
        season: ['wet', 'dry'],
        months: ['March', 'April', 'May', 'August', 'September', 'October'],
        image: 'assets/images/brown-beans.jpg'
    },
    {
        id: 5,
        name: 'Pumpkin Leaf',
        nutrients: {
            protein: 2.7,
            vitamins: ['A', 'C', 'E'],
            minerals: ['Calcium', 'Iron'],
            fiber: 1.2
        },
        season: ['wet'],
        months: ['April', 'May', 'June', 'July', 'August', 'September'],
        image: 'assets/images/ugu-fruit.jpg'
    },
    {
        id: 6,
        name: 'Cassava',
        nutrients: {
            protein: 1.4,
            vitamins: ['C', 'B6'],
            minerals: ['Calcium', 'Magnesium'],
            fiber: 1.8
        },
        season: ['dry', 'wet'],
        months: ['March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
        image: 'assets/images/cassava.jpeg'
    }
    // Add more crops as needed
];

// DOM Elements
const cropSearch = document.getElementById('cropSearch');
const searchBtn = document.getElementById('searchBtn');
const nutrientFilter = document.getElementById('nutrientFilter');
const seasonFilter = document.getElementById('seasonFilter');
const cropGrid = document.getElementById('cropGrid');
const nutritionChart = document.getElementById('nutritionChart');
const nutritionDetails = document.getElementById('nutritionDetails');

// Initialize the mapper
document.addEventListener('DOMContentLoaded', () => {
    displayCrops(cropData);
    setupEventListeners();
});

// Set up event listeners
function setupEventListeners() {
    searchBtn.addEventListener('click', handleSearch);
    nutrientFilter.addEventListener('change', handleFilter);
    seasonFilter.addEventListener('change', handleFilter);
}

// Handle search functionality
function handleSearch() {
    const searchTerm = cropSearch.value.toLowerCase();
    const filteredCrops = cropData.filter(crop => 
        crop.name.toLowerCase().includes(searchTerm)
    );
    displayCrops(filteredCrops);
}

// Handle filter functionality
function handleFilter() {
    const nutrientValue = nutrientFilter.value;
    const seasonValue = seasonFilter.value;
    
    let filteredCrops = cropData;
    
    if (nutrientValue) {
        filteredCrops = filteredCrops.filter(crop => 
            crop.nutrients[nutrientValue] !== undefined
        );
    }
    
    if (seasonValue) {
        filteredCrops = filteredCrops.filter(crop => 
            crop.season.includes(seasonValue)
        );
    }
    
    displayCrops(filteredCrops);
}

// Display crops in the grid
function displayCrops(crops) {
    cropGrid.innerHTML = '';
    
    crops.forEach(crop => {
        const cropCard = createCropCard(crop);
        cropGrid.appendChild(cropCard);
    });
}

// Create a crop card element
function createCropCard(crop) {
    const card = document.createElement('div');
    card.classList.add('crop-card');
    
    card.innerHTML = `
        <img src="${crop.image}" alt="${crop.name}" onerror="this.src='assets/images/placeholder.jpg'">
        <h3>${crop.name}</h3>
        <div class="crop-info">
            <p>Season: ${crop.season.join(', ')}</p>
            <p>Months: ${crop.months ? crop.months.join(', ') : 'N/A'}</p>
            <p>Key Nutrients: ${Object.keys(crop.nutrients).join(', ')}</p>
        </div>
        <button class="btn secondary" onclick="showNutritionDetails(${crop.id})">
            View Details
        </button>
    `;
    
    return card;
}

// Show detailed nutrition information
function showNutritionDetails(cropId) {
    const crop = cropData.find(c => c.id === cropId);
    if (!crop) return;
    
    nutritionDetails.innerHTML = `
        <h3>${crop.name} - Nutritional Information</h3>
        <div class="nutrition-stats">
            <p>Protein: ${crop.nutrients.protein}g per 100g</p>
            <p>Fiber: ${crop.nutrients.fiber}g per 100g</p>
            <p>Vitamins: ${crop.nutrients.vitamins.join(', ')}</p>
            <p>Minerals: ${crop.nutrients.minerals.join(', ')}</p>
            <p><strong>Season:</strong> ${crop.season.join(', ')}</p>
            <p><strong>Cultivation Months:</strong> ${crop.months ? crop.months.join(', ') : 'N/A'}</p>
        </div>
    `;
    
    // In a real application, you would render a chart here
    // using a library like Chart.js
    nutritionChart.innerHTML = '<p>Nutrition chart will be displayed here</p>';
}

// Add CSS classes for the mapper interface
const style = document.createElement('style');
style.textContent = `
    .mapper-tools {
        padding: 2rem;
        background: var(--light-gray);
    }
    
    .search-section {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .filter-section {
        margin-top: 1rem;
    }
    
    .filter-options {
        display: flex;
        gap: 1rem;
    }
    
    .crop-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 2rem;
        padding: 2rem;
    }
    
    .crop-card {
        background: white;
        border-radius: 10px;
        padding: 1rem;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    .crop-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 5px;
    }
    
    .nutrition-info {
        padding: 2rem;
        background: var(--light-gray);
    }
    
    .nutrition-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }
`;

document.head.appendChild(style); 