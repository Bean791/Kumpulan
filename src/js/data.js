document.addEventListener("DOMContentLoaded", function () {
  // Ambil elemen-elemen HTML
  const main = document.getElementById("main");

  // Lakukan permintaan HTTP GET untuk membaca file JSON
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
          // Parse JSON menjadi objek JavaScript
          const data = JSON.parse(this.responseText);

          // Loop melalui data dan buat elemen HTML untuk setiap entri
          data.forEach(function (entry) {
              // Buat elemen div untuk setiap entri
              const div = document.createElement("div");

              // Isi elemen div dengan informasi dari entri
              div.innerHTML = `
                  <div class="md:m-5 p-5 shadow-xl rounded-lg grid md:grid-cols-2 grid-cols-1">
                  <div class="my-auto mx-auto">
                  <img src="https://bitdegree-storage.s3.amazonaws.com/certificate-previews/cert-preview11595191.jpeg" alt="winners" class="w-full">
                  </div>
                  <div class="my-auto mx-5 ">
                    <h3 class="lg:text-xl text-sm font-bold my-2">
                      ${entry.Judul}
                    </h3>
                    <h4 class="lg:text-lg text-xs">
                      ${entry.Oleh}
                    </h4>
                    <ul class="lg:text-sm text-xxs">
                      <li>
                        Issued ${entry.Masa} - ${entry.Sampai}
                      </li>
                      <li>
                        Credential ID : ${entry.Id}
                      </li>
                    </ul>
                    <a href=${entry.link} target="_blank" class="text-blue-500 lg:text-base text-sm">See credential</a>
                  </div>
                </div>
              `;

              // Tambahkan elemen div ke elemen utama
              main.appendChild(div);
          });
      }
  };

  xhr.open("GET", "src/data/data.json", true);
  xhr.send();
});
