const baseUrl = "https://raw.githubusercontent.com/penggguna/QuranJSON/master/";
const allEndPoin = `${baseUrl}quran.json`;
const surahEndPoin = `${baseUrl}surah/1.json`;
const proxyurl = "https://cors-anywhere.herokuapp.com/";

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");

function getAllSurah() {
    title.innerHTML = "Daftar Surah dalam Al-Quran"
    fetch(allEndPoin)
        .then(response => response.json())
        .then(resJson => {
            let datas = "";
            resJson.forEach(data => {
                datas += `
                    <li class="collection-item">
                        <span class="title"><b>${data.name}</b></span><br>
                        Terjemah Nama Surah : ${data.name_translations.id}
                        Jumlah Ayat: ${data.number_of_ayah}<br>
                        Nomor Surah: ${data.number_of_surah}<br>
                        Surah ${data.type}<br>
                        Diturunkan di ${data.place}
                    </li>`
            });
            contents.innerHTML = `<ul class="collection">${datas}</ul>`;
            const detil = document.querySelectorAll('.secondary-content');
        }).catch(err => {
            console.error(err);
        })
}

function getSurahByType(tipeSurah) {
    title.innerHTML = `Daftar Surah ${tipeSurah}`
    console.log(tipeSurah)
    fetch(allEndPoin)
        .then(response => response.json())
        .then(resJson => {
            let datas = "";
            resJson.forEach(data => {
                if(data.type == tipeSurah) {
                datas += `
                    <li class="collection-item">
                        <span class="title"><b>${data.name}</b></span><br>
                        Terjemah Nama Surah : ${data.name_translations.id}
                        Jumlah Ayat: ${data.number_of_ayah}<br>
                        Nomor Surah: ${data.number_of_surah}<br>
                        Surah ${data.type}<br>
                        Diturunkan di ${data.place}
                    </li>`
                }
            });
            contents.innerHTML = `<ul class="collection">${datas}</ul>`;
            const detil = document.querySelectorAll('.secondary-content');
        }).catch(err => {
            console.error(err);
        })
}

function loadPage(page) {
    switch (page) {
        case "daftarSurah":
            getAllSurah();
            break;
        case "daftarSurahMadaniyah":
            getSurahByType('Madaniyah');
            break;
        case "daftarSurahMakkiyah":
            getSurahByType('Makkiyah');
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    loadPage(page);
});