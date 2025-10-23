const loader = document.getElementById("loader");
const container = document.getElementById("opportunities");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const loadMoreContainer = document.getElementById("loadMoreContainer");

let skip = 0;
const limit = 4;
let allLoaded = false;

async function fetchOpportunities() {
  try {
    const res = await fetch(`/api/opportunities?skip=${skip}&limit=${limit}`);
    const data = await res.json();

    if (skip === 0) {
      setTimeout(() => {
        loader.classList.add("hidden");
        container.classList.remove("hidden");
        loadMoreContainer.classList.remove("hidden");
      }, 1000);
    }

    if (!Array.isArray(data) || data.length === 0) {
      if (skip === 0) {
        container.innerHTML =
          "<p>No opportunities available at the moment.</p>";
      }
      allLoaded = true;
      loadMoreBtn.style.display = "none";
      return;
    }

    const html = data
      .map(
        (item) => `
        <div class="opportunity-card">
          <h3>${item.title}</h3>
          <p><strong>Organization:</strong> ${item.organization}</p>
          <p>${
            item.stipend ? `<strong>Stipend:</strong> ${item.stipend}` : ""
          }</p>
          <p><strong>Category:</strong> ${item.category}</p>
          <p><strong>Location:</strong> ${item.location}</p>
          <p><strong>Date:</strong> ${new Date(
            item.date
          ).toLocaleDateString()}</p>
          <p>${item.description}</p>
          <div class="card-actions">
            ${
              item.websiteLink
                ? `<a href="${item.websiteLink}" target="_blank">Visit Website</a>`
                : `<a href="mailto:${item.contactEmail}">Email Organizer</a>`
            }
          </div>
        </div>
      `
      )
      .join("");

    container.insertAdjacentHTML("beforeend", html);
    skip += limit;

    if (data.length < limit) {
      loadMoreBtn.style.display = "none";
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

// Load initial opportunities
fetchOpportunities();

// Load more when button clicked
loadMoreBtn.addEventListener("click", fetchOpportunities);

// fetch("/api/opportunities")
//   .then((res) => res.json())
//   .then((data) => {
//     setTimeout(() => {
//       loader.classList.add("hidden");
//       container.classList.remove("hidden");
//     }, 1000);

//     // Handle empty data
//     if (!Array.isArray(data) || data.length === 0) {
//       container.innerHTML = "<p>No opportunities available at the moment.</p>";
//       return;
//     }

//     container.innerHTML = data
//       .map(
//         (item) => `
//       <div class="opportunity-card">
//         <h3>${item.title}</h3>
//         <p><strong>Organization:</strong> ${item.organization}</p>
//         <p>${
//           item.stipend ? `<strong>Stipend:</strong> ${item.stipend}` : ""
//         }</p>
//         <p><strong>Category:</strong> ${item.category}</p>
//         <p><strong>Location:</strong> ${item.location}</p>
//         <p><strong>Date:</strong> ${new Date(
//           item.date
//         ).toLocaleDateString()}</p>
//         <p>${item.description}</p>
//         <div class="card-actions">
//         ${
//           item.websiteLink
//             ? `<a href="${item.websiteLink}" target="_blank">Visit Website</a>`
//             : `<a href="mailto:${item.contactEmail}">Email Organizer</a>`
//         }
//         </div>
//       </div>
//     `
//       )
//       .join("");
//   })
//   .catch((err) => console.error("Error:", err));
