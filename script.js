// GLOBAL STATE
let appLang = "en";
let data = {};

// INITIAL LOAD
window.onload = async () => {
    await loadLanguage();
    await loadAllData();
    renderLanguageSelector();
    updateDashboard();
};

// LOAD LOCAL JSON DATA
async function loadAllData() {
    data.dua = await fetch("data/dua.json").then(r => r.json());
    data.zikr = await fetch("data/zikr.json").then(r => r.json());
    data.quotes = await fetch("data/quotes.json").then(r => r.json());
    data.prayers = await fetch("data/prayers.json").then(r => r.json());
    data.exercises = await fetch("data/exercises.json").then(r => r.json());
    data.translations = await fetch("data/translations.json").then(r => r.json());
}

// LANGUAGE SYSTEM
async function loadLanguage() {
    appLang = localStorage.getItem("lang") || "en";
}

function renderLanguageSelector() {
    const select = document.getElementById("languageSelector");
    select.innerHTML = `
        <option value="en">English</option>
        <option value="bn">Bangla</option>
        <option value="ar">Arabic</option>
    `;
    select.value = appLang;
    select.onchange = () => {
        appLang = select.value;
        localStorage.setItem("lang", appLang);
        updateDashboard();
    };
}

// TRANSLATION FUNCTION
function t(key) {
    return data.translations[appLang][key] || key;
}

// UPDATE DASHBOARD TEXTS
function updateDashboard() {
    document.getElementById("appTitle").innerText = t("Alor Poth");

    const next = data.prayers[0].name + " - " + data.prayers[0].time;
    document.getElementById("nextPrayer").innerText = next;
}

// PAGE LOADER
function openPage(page) {
    if (page === "dua") loadDuaPage();
    if (page === "prayer") loadPrayerPage();
    if (page === "fitness") loadFitnessPage();
    if (page === "routine") loadRoutinePage();
    if (page === "mental") loadMentalPage();
    if (page === "finance") loadFinancePage();
}

function loadDuaPage() {
    let html = "<h2>Dua List</h2>";
    data.dua.forEach(d => {
        html += `<div class='card'><h3>${d.title}</h3><p>${d.text}</p></div>`;
    });
    document.getElementById("pageContainer").innerHTML = html;
}

function loadPrayerPage() {
    let html = "<h2>Prayer Times</h2>";
    data.prayers.forEach(p => {
        html += `<div class="card"><h3>${p.name}</h3><p>${p.time}</p></div>`;
    });
    document.getElementById("pageContainer").innerHTML = html;
}

function loadFitnessPage() {
    let html = "<h2>Daily Fitness</h2>";
    data.exercises.forEach(e => {
        html += `<div class="card"><h3>${e.name}</h3><p>${e.reps}</p></div>`;
    });
    document.getElementById("pageContainer").innerHTML = html;
}

function loadRoutinePage() {
    document.getElementById("pageContainer").innerHTML = `
        <h2>Daily Routine</h2>
        <ul>
            <li>🌅 Fajr → Morning Dua</li>
            <li>💼 Work / Study</li>
            <li>🕌 Dhuhr</li>
            <li>💪 Exercise</li>
            <li>🕌 Asr</li>
            <li>📖 Learning Time</li>
            <li>🕌 Maghrib</li>
            <li>🍽️ Dinner</li>
            <li>🕌 Isha → Sleep Prep</li>
        </ul>
    `;
}

function loadMentalPage() {
    document.getElementById("pageContainer").innerHTML = `
        <h2>Mental Health</h2>
        <div class='card'>${data.quotes[Math.floor(Math.random()*data.quotes.length)]}</div>
        <button onclick="breathingExercise()">Start Breathing Exercise</button>
    `;
}

function loadFinancePage() {
    document.getElementById("pageContainer").innerHTML = `
        <h2>Finance Tracker</h2>
        <p>Expense, Savings, Goal system coming soon (works offline)</p>
    `;
}

function breathingExercise(){
    alert("Breathe in… Hold… Breathe out…");
}
