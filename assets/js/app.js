/**
*
* CARI APA MAS? HANYA UNTUK SENANG SENANG KOK!
*
*/
document.addEventListener('DOMContentLoaded', () => {
  const checkButton = document.querySelector('button');
  const popup = document.querySelector('.popup');
  const overlay = document.querySelector('.overlay');
  const loading = document.querySelector('.loading');
  const results = document.querySelector('.results');
  const fullnameInput = document.querySelector('#fullname');
  const closeBtn = document.querySelector('.close-btn');
  let khodamResults = [];

  const toggleLoading = (show) => {
    loading.classList.toggle('show', show);
    overlay.classList.toggle('show', show);
  };

  const togglePopup = (show, result = '') => {
    results.textContent = result;
    popup.classList.toggle('show', show);
    overlay.classList.toggle('show', show);
  };

  const fetchKhodamResults = async () => {
    try {
      const response = await fetch('assets/json/data.json');
      khodamResults = await response.json();
    } catch (error) {
      console.error('Error fetching khodam results:', error);
    }
  };

  fullnameInput.addEventListener('input', () => {
    checkButton.disabled = !fullnameInput.value.trim();
  });

  checkButton.addEventListener('click', () => {
    if (!fullnameInput.value.trim()) {
      fullnameInput.focus();
      alert('Nggak boleh kosong dong!');
      return;
    }

    toggleLoading(true);
    setTimeout(() => {
      toggleLoading(false);
      const randomResult = khodamResults[Math.floor(Math.random() * khodamResults.length)];
      togglePopup(true, randomResult);
    }, 2000);
  });

  closeBtn.addEventListener('click', () => {
    togglePopup(false);
    fullnameInput.value = '';
    fullnameInput.focus();
    checkButton.disabled = true;
  });

  overlay.addEventListener('click', () => togglePopup(false));

  checkButton.disabled = !fullnameInput.value.trim();

  fetchKhodamResults();
});
