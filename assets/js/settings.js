$(document).ready(function() {
    loadNames();
});

function loadNames() {
    const storedNames = JSON.parse(localStorage.getItem('names')) || [];
    if (storedNames.length > 0) {
        $('#settingsTxtList').val(storedNames.map(name => `${name.nama}, ${name.iswin}`).join('\n'));
    }
}

function saveNames() {
    const namesText = $('#settingsTxtList').val().trim();
    const namesArray = namesText.split('\n').map(name => {
        const [nama, iswin] = name.split(',').map(item => item.trim());
        return { nama, iswin: parseInt(iswin) };
    });
    localStorage.setItem('names', JSON.stringify(namesArray));
    alert('Names saved successfully!');
}

function generateRandomNames() {
    const firstNames = [
        "Budi", "Agus", "Dewi", "Rina", "Andi", "Rudi", "Siti", "Ayu", "Sri", "Joko",
        "Dian", "Ricky", "Nina", "Hadi", "Rina", "Hana", "Dito", "Lia", "Fajar", "Sari",
        "Eka", "Yudi", "Citra", "Beni", "Fani", "Lina", "Rizki", "Gita", "Dewi", "Arif",
        "Maya", "Rian", "Vina", "Bayu", "Nanda", "Dodi", "Faisal", "Diana", "Rani", "Tono"
    ];
    const lastNames = [
        "Santoso", "Wibowo", "Putri", "Sari", "Prasetyo", "Gunawan", "Susilo", "Wijaya", "Saputra", "Nugroho",
        "Setiawan", "Bambang", "Husni", "Yuliana", "Kusuma", "Wulandari", "Raharjo", "Surya", "Hidayat", "Maulana",
        "Ayu", "Kartika", "Bastian", "Nugraha", "Fitri", "Nugroho", "Sulistyo", "Eka", "Saputra", "Dewi"
    ];

    let randomNames = [];
    for (let i = 0; i < 100; i++) {
        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const randomName = `${randomFirstName} ${randomLastName}, 0`;
        randomNames.push(randomName);
    }
    
    let currentNames = $('#settingsTxtList').val().trim();
    currentNames = currentNames ? `${currentNames}\n${randomNames.join('\n')}` : randomNames.join('\n');
    
    $('#settingsTxtList').val(currentNames);
}
