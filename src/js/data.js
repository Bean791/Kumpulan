document.addEventListener("DOMContentLoaded", function () {
    // Ambil elemen-elemen HTML
    const main = document.getElementById("main");

  
    // Lakukan permintaan HTTP GET untuk membaca file JSON
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        // Parse JSON menjadi objek JavaScript
        const data = JSON.parse(this.responseText);
  
        main.innerHTML = 
        `
        <div>
        </div>
        `
      }
    };
  
    xhr.open("GET", "/src/data/data.json", true);
    xhr.send();
  });
  