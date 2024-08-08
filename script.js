const surahs = [
    { name: "At-Takaatsur", number: 102, ayahs: 8 },
    { name: "Al-Ashr", number: 103, ayahs: 3 },
    { name: "Al-Humazah", number: 104, ayahs: 9 },
    { name: "Al-Fiil", number: 105, ayahs: 5 },
    { name: "Al-Quraisy", number: 106, ayahs: 4 },
    { name: "Al-Maa'uun", number: 107, ayahs: 7 },
    { name: "Al-Kautsar", number: 108, ayahs: 3 },
    { name: "Al-Kaafiruun", number: 109, ayahs: 6 },
    { name: "An-Nashr", number: 110, ayahs: 3 },
    { name: "Al-Lahab", number: 111, ayahs: 5 },
    { name: "Al-Ikhlas", number: 112, ayahs: 4 },
    { name: "Al-Falaq", number: 113, ayahs: 5 },
    { name: "An-Naas", number: 114, ayahs: 6 }
];

document.getElementById("fetchAyahBtn").addEventListener("click", async () => {
    const randomSurah = surahs[Math.floor(Math.random() * surahs.length)];
    const randomAyahNumber = Math.floor(Math.random() * (randomSurah.ayahs - 1)) + 1;

    const response1 = await fetch(`https://api.alquran.cloud/v1/ayah/${randomSurah.number}:${randomAyahNumber}/editions/quran-uthmani,en.asad,en.pickthall`);
    const ayah1 = await response1.json();

    const response2 = await fetch(`https://api.alquran.cloud/v1/ayah/${randomSurah.number}:${randomAyahNumber + 1}/editions/quran-uthmani,en.asad,en.pickthall`);
    const ayah2 = await response2.json();

    const audioResponse1 = await fetch(`https://api.alquran.cloud/v1/ayah/${randomSurah.number}:${randomAyahNumber}/ar.alafasy`);
    const audio1 = await audioResponse1.json();

    const audioResponse2 = await fetch(`https://api.alquran.cloud/v1/ayah/${randomSurah.number}:${randomAyahNumber + 1}/ar.alafasy`);
    const audio2 = await audioResponse2.json();

    const ayahContainer = document.getElementById("ayahContainer");
    ayahContainer.innerHTML = `
        <div class="ayah">
            <h3>${ayah1.data[0].surah.englishName} (Surah ${ayah1.data[0].surah.number}, Ayah ${ayah1.data[0].numberInSurah})</h3>
            <p><strong>Arabic:</strong> ${ayah1.data[0].text}</p>
            <p><strong>English (Asad):</strong> ${ayah1.data[1].text}</p>
            <p><strong>English (Pickthall):</strong> ${ayah1.data[2].text}</p>
            <audio controls>
                <source src="${audio1.data.audio}" type="audio/mp3">
                Your browser does not support the audio element.
            </audio>
        </div>
        <div class="ayah">
            <h3>${ayah2.data[0].surah.englishName} (Surah ${ayah2.data[0].surah.number}, Ayah ${ayah2.data[0].numberInSurah})</h3>
            <p><strong>Arabic:</strong> ${ayah2.data[0].text}</p>
            <p><strong>English (Asad):</strong> ${ayah2.data[1].text}</p>
            <p><strong>English (Pickthall):</strong> ${ayah2.data[2].text}</p>
            <audio controls>
                <source src="${audio2.data.audio}" type="audio/mp3">
                Your browser does not support the audio element.
            </audio>
        </div>
    `;
});
