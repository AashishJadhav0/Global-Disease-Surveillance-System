// Main Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize global trend chart
    initGlobalTrendChart();
    
    // Filter disease cards
    setupDiseaseFilters();
    
    // Search functionality
    setupSearch();
});

function initGlobalTrendChart() {
    const ctx = document.getElementById('globalTrendChart').getContext('2d');
    
    // Sample data - in a real app, this would come from an API
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'New Cases',
                data: [12000, 19000, 30000, 50000, 20000, 30000, 45000, 38000, 42000, 50000, 55000, 60000],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Recovered',
                data: [8000, 12000, 18000, 30000, 15000, 22000, 30000, 28000, 35000, 40000, 45000, 50000],
                borderColor: '#27ae60',
                backgroundColor: 'rgba(39, 174, 96, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Fatalities',
                data: [200, 300, 500, 800, 400, 600, 900, 750, 850, 900, 950, 1000],
                borderColor: '#7f8c8d',
                backgroundColor: 'rgba(127, 140, 141, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };
    
    new Chart(ctx, config);
}

function setupDiseaseFilters() {
    const filterButtons = document.querySelectorAll('.filter-controls button');
    const diseaseCards = document.querySelectorAll('.disease-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filter disease cards
            diseaseCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function setupSearch() {
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const diseaseCards = document.querySelectorAll('.disease-card');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        diseaseCards.forEach(card => {
            const diseaseName = card.querySelector('h3').textContent.toLowerCase();
            
            if (diseaseName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    searchButton.addEventListener('click', performSearch);
}
// diseases-data.js - Central repository for all disease information
const diseases = {
    "covid19": {
        name: "COVID-19",
        type: "viral",
        firstIdentified: "December 2019",
        origin: "Wuhan, China",
        transmission: "Airborne, Contact",
        cases: 654321098,
        activeCases: 12345678,
        fatalities: 6789012,
        growthRate: 1.2,
        countriesAffected: 192,
        severity: "high",
        description: "COVID-19 is an infectious disease caused by the SARS-CoV-2 virus...",
        symptoms: {
            common: ["Fever", "Cough", "Tiredness", "Loss of taste or smell"],
            lessCommon: ["Sore throat", "Headache", "Aches and pains", "Diarrhea", "Rash on skin"],
            serious: ["Difficulty breathing", "Loss of speech or mobility", "Chest pain", "Confusion"]
        },
        prevention: ["Get vaccinated", "Wear masks", "Physical distancing", "Hand washing"],
        treatment: ["Rest and hydration", "Fever-reducing medications", "Antiviral medications"]
    },
    // Add all 40+ diseases in this format
    "malaria": {
        name: "Malaria",
        type: "parasitic",
        // ... all malaria data
    },
    // Continue for all diseases
};

// Function to generate disease pages
function generateDiseasePage(diseaseId) {
    const disease = diseases[diseaseId];
    // This would generate the HTML structure similar to our COVID-19 example
    // and save it to diseases/[diseaseId].html
}


// api-integration.js
class DiseaseDataAPI {
    constructor() {
        this.sources = {
            who: 'https://disease-api.example.com/who',
            cdc: 'https://disease-api.example.com/cdc',
            // Add other sources
        };
    }

    async fetchData(disease, source = 'who') {
        try {
            const response = await fetch(`${this.sources[source]}/${disease}`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    // Specific API implementations
    async fetchWHOData(disease) {
        // WHO-specific implementation
    }

    async fetchCDCData(disease) {
        // CDC-specific implementation
    }
}

// Usage example
const api = new DiseaseDataAPI();
const covidData = await api.fetchData('covid19');


async fetchWHOData(disease) {
    const endpoint = `https://www.who.int/api/${disease}/data`;
    const response = await fetch(endpoint, {
        headers: {
            'Authorization': 'Bearer YOUR_API_KEY',
            'Accept': 'application/json'
        }
    });
    return await response.json();
}

async fetchCDCData(disease) {
    const endpoint = `https://data.cdc.gov/resource/${disease}.json`;
    const response = await fetch(endpoint);
    const data = await response.json();
    
    // Transform CDC-specific format to our standard format
    return {
        cases: data.total_cases,
        activeCases: data.current_cases,
        // ... other transformations
    };
}// auth-system.js
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.initAuthModal();
    }

    initAuthModal() {
        // Modal initialization code
    }

    async login(email, password) {
        // Authentication logic
    }

    async register(userData) {
        // Registration logic
    }

    checkPermissions() {
        // Role-based access control
    }
}// data-export.js
class DataExporter {
    exportToCSV(data) {
        let csv = 'Disease, Cases, Growth, Countries\n';
        data.forEach(disease => {
            csv += `${disease.name},${disease.cases},${disease.growthRate},${disease.countriesAffected}\n`;
        });
        this.downloadFile(csv, 'disease_data.csv', 'text/csv');
    }

    exportToJSON(data) {
        const json = JSON.stringify(data, null, 2);
        this.downloadFile(json, 'disease_data.json', 'application/json');
    }

    downloadFile(content, filename, type) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}// alert-system.js
class OutbreakAlert {
    constructor() {
        this.thresholds = {
            high: 10000,
            medium: 5000,
            low: 1000
        };
    }

    checkThresholds(diseaseData) {
        const alerts = [];
        
        diseaseData.forEach(disease => {
            if (disease.cases > this.thresholds.high) {
                alerts.push({
                    disease: disease.name,
                    level: 'high',
                    message: `High outbreak alert for ${disease.name} with ${disease.cases} cases`
                });
            } else if (disease.cases > this.thresholds.medium) {
                alerts.push({
                    disease: disease.name,
                    level: 'medium',
                    message: `Medium outbreak alert for ${disease.name}`
                });
            }
            // Add more conditions as needed
        });

        return alerts;
    }

    displayAlerts(alerts) {
        const alertContainer = document.getElementById('alertContainer');
        alertContainer.innerHTML = '';
        
        alerts.forEach(alert => {
            const alertElement = document.createElement('div');
            alertElement.className = `alert ${alert.level}`;
            alertElement.textContent = alert.message;
            alertContainer.appendChild(alertElement);
        });
    }
}// app.js
class DiseaseSurveillanceApp {
    constructor() {
        this.api = new DiseaseDataAPI();
        this.auth = new AuthSystem();
        this.exporter = new DataExporter();
        this.alertSystem = new OutbreakAlert();
        
        this.init();
    }

    async init() {
        // Load initial data
        const diseaseData = await this.loadDiseaseData();
        
        // Check for alerts
        const alerts = this.alertSystem.checkThresholds(diseaseData);
        this.alertSystem.displayAlerts(alerts);
        
        // Set up event listeners
        this.setupEventListeners();
    }

    async loadDiseaseData() {
        // Load from API or fallback to local data
        try {
            return await this.api.fetchData('all');
        } catch (error) {
            console.log('Using local data due to API error');
            return diseases; // From our diseases-data.js
        }
    }

    setupEventListeners() {
        // Export buttons
        document.getElementById('exportCSV').addEventListener('click', () => {
            this.exporter.exportToCSV(this.diseaseData);
        });
        
        // Other event listeners
    }
}

// Initialize the application
const app = new DiseaseSurveillanceApp();


// map-visualization.js
class DiseaseMap {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.map = L.map(containerId).setView([20, 0], 2);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
        
        this.diseaseLayers = {};
    }

    updateDiseaseData(diseaseData) {
        // Clear existing layers
        Object.values(this.diseaseLayers).forEach(layer => this.map.removeLayer(layer));
        
        // Add new data
        diseaseData.forEach(disease => {
            const layer = L.geoJSON(disease.geoData, {
                style: this.getStyleForSeverity(disease.severity),
                onEachFeature: this.bindPopup
            }).addTo(this.map);
            
            this.diseaseLayers[disease.id] = layer;
        });
    }

    getStyleForSeverity(severity) {
        const colors = {
            high: '#e74c3c',
            medium: '#f39c12',
            low: '#2ecc71'
        };
        
        return {
            fillColor: colors[severity],
            weight: 1,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7
        };
    }

    bindPopup(feature, layer) {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup(`
                <strong>${feature.properties.name}</strong><br>
                Cases: ${feature.properties.cases.toLocaleString()}<br>
                Growth: ${feature.properties.growth}%
            `);
        }
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Initialize main chart
    const mainChart = initGlobalTrendChart();
    
    // Initialize mini charts
    const regionChart = initMiniChart('casesByRegion', 'doughnut', ['Americas', 'Europe', 'Asia', 'Africa'], [35, 28, 25, 12], ['#e74c3c', '#3498db', '#f39c12', '#2ecc71']);
    const ageChart = initMiniChart('ageDistribution', 'bar', ['0-18', '19-35', '36-50', '51-65', '65+'], [15, 35, 25, 15, 10], '#3498db');
    const recoveryChart = initMiniChart('recoveryRate', 'line', ['Jan', 'Feb', 'Mar', 'Apr'], [75, 78, 82, 85], '#2ecc71');
    
    // Image Slider Functionality
    const sliderImages = document.querySelectorAll('.slider-container img');
    const slideCount = document.querySelector('.slide-count');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const pausePlayBtn = document.getElementById('pausePlay');
    const caption = document.getElementById('currentCaption');
    
    const captions = [
        "Global prevalence of top diseases based on WHO data",
        "Glasgow health statistics and metrics",
        "Oakfire party health care initiative data",
        "Withrildond health care network analysis",
        "Detailed health care data analysis breakdown",
        "FP code classification system for health data"
    ];
    
    let currentSlide = 0;
    let autoSlide = true;
    let slideInterval = setInterval(nextSlide, 3000);
    
    // Show initial slide
    showSlide(currentSlide);
    
    function showSlide(index) {
        sliderImages.forEach(img => img.classList.remove('active'));
        sliderImages[index].classList.add('active');
        slideCount.textContent = `${index + 1}/${sliderImages.length}`;
        caption.textContent = captions[index];
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % sliderImages.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + sliderImages.length) % sliderImages.length;
        showSlide(currentSlide);
    }
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    
    pausePlayBtn.addEventListener('click', () => {
        autoSlide = !autoSlide;
        pausePlayBtn.textContent = autoSlide ? '❚❚' : '►';
        if (autoSlide) {
            resetInterval();
        } else {
            clearInterval(slideInterval);
        }
    });
    
    function resetInterval() {
        if (autoSlide) {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 3000);
        }
    }
    
    // Chart Controls
    document.getElementById('zoomIn').addEventListener('click', () => {
        // Zoom in functionality would depend on your chart library
        console.log('Zoom In');
    });
    
    document.getElementById('zoomOut').addEventListener('click', () => {
        // Zoom out functionality
        console.log('Zoom Out');
    });
    
    document.getElementById('exportChart').addEventListener('click', () => {
        // Export chart as image
        const link = document.createElement('a');
        link.download = 'chart-export.png';
        link.href = document.getElementById('globalTrendChart').toDataURL('image/png');
        link.click();
    });
    
    document.getElementById('timeRange').addEventListener('change', (e) => {
        // Update chart based on time range
        console.log('Time range changed to:', e.target.value);
    });
    
    function initMiniChart(id, type, labels, data, backgroundColor) {
        const ctx = document.getElementById(id).getContext('2d');
        return new Chart(ctx, {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: Array.isArray(backgroundColor) ? backgroundColor : [backgroundColor],
                    borderColor: '#fff',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: type === 'doughnut',
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        display: type !== 'doughnut'
                    },
                    x: {
                        display: type !== 'doughnut'
                    }
                }
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('diseaseSearch');
    const searchButton = document.getElementById('searchButton');
    const diseaseCards = document.querySelectorAll('.disease-card');
    
    // Function to perform search
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            // If search is empty, show all cards
            diseaseCards.forEach(card => {
                card.style.display = 'block';
            });
            return;
        }
        
        let foundResults = false;
        
        diseaseCards.forEach(card => {
            const diseaseName = card.querySelector('h3').textContent.toLowerCase();
            const diseaseContent = card.querySelector('.card-content').textContent.toLowerCase();
            
            if (diseaseName.includes(searchTerm) {
                card.style.display = 'block';
                foundResults = true;
            } else if (diseaseContent.includes(searchTerm)) {
                card.style.display = 'block';
                foundResults = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show message if no results found
        const resultsMessage = document.getElementById('searchResultsMessage');
        if (!foundResults) {
            if (!resultsMessage) {
                const message = document.createElement('div');
                message.id = 'searchResultsMessage';
                message.textContent = 'No diseases found matching your search.';
                message.style.textAlign = 'center';
                message.style.padding = '1rem';
                message.style.color = '#e74c3c';
                document.querySelector('.disease-grid').insertAdjacentElement('afterend', message);
            }
        } else if (resultsMessage) {
            resultsMessage.remove();
        }
    }
    
    // Search on button click
    searchButton.addEventListener('click', performSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Clear search when input is empty
    searchInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            diseaseCards.forEach(card => {
                card.style.display = 'block';
            });
            const resultsMessage = document.getElementById('searchResultsMessage');
            if (resultsMessage) {
                resultsMessage.remove();
            }
        }
    });
});



// Main page JavaScript (for the button)
document.getElementById('emergencyAlertBtn').addEventListener('click', function() {
    window.location.href = 'emergency-contacts.html';
});

// Emergency contacts page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const countrySelect = document.getElementById('countrySelect');
    const emergencyNumbers = document.getElementById('emergencyNumbers');
    
    // Emergency numbers database
    const emergencyData = {
        'US': [
            { name: 'Police/Fire/Medical', number: '911', description: 'All emergencies' },
            { name: 'Poison Control', number: '1-800-222-1222', description: '24/7 poison assistance' },
            { name: 'Suicide Prevention', number: '988', description: 'Mental health crisis' }
        ],
        'GB': [
            { name: 'Police/Fire/Ambulance', number: '999', description: 'All emergencies' },
            { name: 'Non-emergency Police', number: '101', description: 'When not urgent' },
            { name: 'NHS Direct', number: '111', description: 'Medical advice' }
        ],
        'CA': [
            { name: 'Emergency Services', number: '911', description: 'All emergencies' },
            { name: 'Poison Control', number: '1-800-268-9017', description: 'Poison information' },
            { name: 'Kids Help Phone', number: '1-800-668-6868', description: 'Youth counseling' }
        ],
        // Add more countries as needed
        'AU': [
            { name: 'Emergency', number: '000', description: 'Police/Fire/Ambulance' },
            { name: 'Poisons Information', number: '13 11 26', description: '24/7 poison advice' },
            { name: 'Lifeline', number: '13 11 14', description: 'Crisis support' }
        ],
        'IN': [
            { name: 'Emergency', number: '112', description: 'All emergencies' },
            { name: 'Police', number: '100', description: 'Police emergency' },
            { name: 'Ambulance', number: '102', description: 'Medical emergency' }
        ]
    };
    
    countrySelect.addEventListener('change', function() {
        const countryCode = this.value;
        
        if (!countryCode) {
            emergencyNumbers.innerHTML = `
                <div class="no-selection">
                    <p>Please select a country to view emergency numbers</p>
                </div>
            `;
            return;
        }
        
        const numbers = emergencyData[countryCode];
        
        if (numbers && numbers.length > 0) {
            let html = '';
            
            numbers.forEach(item => {
                html += `
                    <div class="emergency-card">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <div class="emergency-number">
                            <i class="fas fa-phone"></i>
                            <a href="tel:${item.number}">${item.number}</a>
                        </div>
                    </div>
                `;
            });
            
            emergencyNumbers.innerHTML = html;
        } else {
            emergencyNumbers.innerHTML = `
                <div class="no-selection">
                    <p>No emergency numbers found for this country</p>
                </div>
            `;
        }
    });
    
    // Optional: Auto-select country based on user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                // In a real app, you would use a reverse geocoding API
                // This is just a simplified example
                console.log("User location detected, could auto-select country");
            },
            error => {
                console.log("Geolocation error:", error);
            }
        );
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const alertsBtn = document.getElementById('alertsBtn');
    const alertsPanel = document.getElementById('alertsPanel');
    const alertsOverlay = document.getElementById('alertsOverlay');
    const closePanel = document.querySelector('.close-panel');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const countrySelect = document.getElementById('countrySelect');
    const emergencyNumbers = document.getElementById('emergencyNumbers');
    
    // Emergency numbers database
    const emergencyData = {
        'US': [
            { name: 'Emergency', number: '911', type: 'police' },
            { name: 'Poison Control', number: '1-800-222-1222', type: 'medical' },
            { name: 'Suicide Prevention', number: '988', type: 'mental' }
        ],
        'GB': [
            { name: 'Emergency', number: '999', type: 'police' },
            { name: 'Non-emergency', number: '101', type: 'police' },
            { name: 'NHS Direct', number: '111', type: 'medical' }
        ],
        'CA': [
            { name: 'Emergency', number: '911', type: 'police' },
            { name: 'Poison Control', number: '1-800-268-9017', type: 'medical' },
            { name: 'Kids Help', number: '1-800-668-6868', type: 'mental' }
        ]
        // Add more countries
    };
    
    // Toggle alerts panel
    alertsBtn.addEventListener('click', function() {
        alertsPanel.classList.toggle('active');
        alertsOverlay.classList.toggle('active');
    });
    
    // Close panel
    closePanel.addEventListener('click', closeAlertsPanel);
    alertsOverlay.addEventListener('click', closeAlertsPanel);
    
    function closeAlertsPanel() {
        alertsPanel.classList.remove('active');
        alertsOverlay.classList.remove('active');
    }
    
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}Tab`) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Emergency numbers by country
    countrySelect.addEventListener('change', function() {
        const countryCode = this.value;
        
        if (!countryCode) {
            emergencyNumbers.innerHTML = `
                <div class="no-selection">
                    <p>Select a country to view emergency numbers</p>
                </div>
            `;
            return;
        }
        
        const numbers = emergencyData[countryCode];
        
        if (numbers && numbers.length > 0) {
            let html = '';
            
            numbers.forEach(item => {
                const icon = item.type === 'police' ? 'fa-police-box' : 
                            item.type === 'medical' ? 'fa-ambulance' : 'fa-head-side-virus';
                
                html += `
                    <div class="emergency-number">
                        <i class="fas ${icon}"></i>
                        <div>
                            <strong>${item.name}</strong>
                            <a href="tel:${item.number}">${item.number}</a>
                        </div>
                    </div>
                `;
            });
            
            emergencyNumbers.innerHTML = html;
        } else {
            emergencyNumbers.innerHTML = `
                <div class="no-selection">
                    <p>No emergency numbers found for this country</p>
                </div>
            `;
        }
    });
    
    // Optional: Close panel when clicking outside
    document.addEventListener('click', function(e) {
        if (!alertsPanel.contains(e.target) && e.target !== alertsBtn) {
            closeAlertsPanel();
        }
    });
});



















