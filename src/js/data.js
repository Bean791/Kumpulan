document.addEventListener("DOMContentLoaded", function () {
  const main = document.getElementById("main");
  const itemsPerPage = 10;
  let currentPage = 1;
  let paginationContainer = document.getElementById("pagination");

  function displayData(data) {
    main.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = startIndex; i < endIndex && i < data.length; i++) {
      const entry = data[i];

      const div = document.createElement("div");
      div.innerHTML = `
        <div class="m-5 p-5 shadow-xl rounded-lg grid md:grid-cols-2 grid-cols-1 bg-white">
          <div class="my-auto mx-auto">
            <img src=${entry.gambar} alt="winners" class="w-full">
          </div>
          <div class="my-auto mx-5 ">
            <h3 class="lg:text-xl text-sm font-bold my-2">${entry.Judul}</h3>
            <h4 class="lg:text-lg text-xs">${entry.Oleh}</h4>
            <ul class="lg:text-sm text-xxs">
              <li>Issued ${entry.Masa} - ${entry.Sampai}</li>
              <li>Credential ID : ${entry.Id}</li>
            </ul>
            <a href=${entry.link} target="_blank" class="text-blue-500 lg:text-base text-sm">See credential</a>
          </div>
        </div>
      `;
      main.appendChild(div);
    }
  }

  function updatePaginationButtons(data) {
    const totalPages = Math.ceil(data.length / itemsPerPage);

    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.classList.add("bg-gray-500", "text-white", "p-2","px-4", "rounded-lg", "m-2", "font-bold");
      button.innerText = i;
      button.addEventListener("click", function () {
        currentPage = i;
        displayData(data);
        updatePaginationButtons(data);
      });
      paginationContainer.appendChild(button);
    }
  }

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const data = JSON.parse(this.responseText);

      displayData(data);
      updatePaginationButtons(data);
    }
  };

  xhr.open("GET", "src/data/data.json", true);
  xhr.send();

  const btnSearch = document.getElementById("search");
  btnSearch.addEventListener("keyup", function () {
    const searchTerm = btnSearch.value.toLowerCase();
    const certificateElements = document.querySelectorAll("#main > div");

    certificateElements.forEach(function (certificateElement) {
      const certificateText = certificateElement.innerText.toLowerCase();
      if (certificateText.includes(searchTerm)) {
        certificateElement.style.display = "block";
      } else {
        certificateElement.style.display = "none";
      }
    });

    // Cek apakah ada teks di input pencarian
    if (searchTerm.trim() !== "") {
      // Jika ada teks, nonaktifkan atau sembunyikan elemen pagination
      paginationContainer.style.display = "none";
    } else {
      // Jika tidak ada teks, aktifkan elemen pagination
      paginationContainer.style.display = "flex";
    }
  });
});
