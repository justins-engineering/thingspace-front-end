import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse'
import { faTerminal } from '@fortawesome/free-solid-svg-icons/faTerminal'
import { faSimCard } from '@fortawesome/free-solid-svg-icons/faSimCard'
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons/faFileArrowDown'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket'
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons/faRotateRight'
import Alpine from 'alpinejs'

// window.Alpine = Alpine

library.add(
  faHouse,
  faSimCard,
  faTerminal,
  faFileArrowDown,
  faRightFromBracket,
  faUsers,
  faRotateRight
);

function onDomReady() {
  dom.watch();
  Alpine.start();
}

if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", onDomReady);
} else {
  // `DOMContentLoaded` has already fired
  onDomReady();
}

Alpine.data('getDevices', () => {
  return {
    devices: null,
    fetchData() {
      getJSON('/row.json')
        .then((data) => {
          this.devices = data;
        });
    }
  };
});

Alpine.data('deviceTable', () => {
  return {
    newTable: null,
    async getTable() {
      return await getHTML('/device_table.html');
    }
  }
});

async function getJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

async function getHTML(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error(error.message);
  }
}
