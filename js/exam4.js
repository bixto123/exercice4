function getRegion(regions, flag) {
  return new Promise(resolve => {
  if (window.fetch) {
    fetch(regions)
    .then(response => {
      if(response.ok)
        return response.json();
      else
        console.error(`Mauvaise réponse du réseau`);
    })
    //	Conversion des tableaux .json en object literal javascript.
    .then(data => {
      console.log(data);
      if(flag) {
        data.forEach(region => {
          const option = document.createElement(`option`);
          option.setAttribute(`value`, region.code);
          option.textContent = region.nom;
          const select = document.getElementById(`regions`);
          select.appendChild(option);
        });
      }
      resolve('resolved');
    })
    .catch(error => {
      console.error(`Il y a eu un problème avec l'opération fetch: ` + error.message);
    });
  }
  else
    console.error(`L'api fetch n'est pas implémenter pour cette version de votre client web`);
  })
}

function getDepartements(departements, flag) {
  return new Promise(resolve => {
  if (window.fetch) {
    fetch(departements)
    .then(response => {
      if(response.ok)
        return response.json();
      else
        console.error(`Mauvaise réponse du réseau`);
    })
    //	Conversion des tableaux .json en object literal javascript.
    .then(data => {
      console.log(data);
      if(flag) {
        data.forEach(departement => {
          const option = document.createElement(`option`);
          option.setAttribute(`value`, departement.code);
          option.textContent = departement.nom;
          const select = document.getElementById(`departements`);
          select.appendChild(option);
        });
      }
      resolve('resolved');
    })
    .catch(error => {
      console.error(`Il y a eu un problème avec l'opération fetch: ` + error.message);
    });
  }
  else
    console.error(`L'api fetch n'est pas implémenter pour cette version de votre client web`);
  })
}

function getCommunes(communes, flag) {
  return new Promise(resolve => {
  if (window.fetch) {
    fetch(communes)
    .then(response => {
      if(response.ok)
        return response.json();
      else
        console.error(`Mauvaise réponse du réseau`);
    })
    //	Conversion des tableaux .json en object literal javascript.
    .then(data => {
      console.log(data);
      if(flag) {
        data.forEach(commune => {
          const option = document.createElement(`option`);
          option.setAttribute(`value`, commune.code);
          option.textContent = commune.nom;
          const select = document.getElementById(`communes`);
          select.appendChild(option);
        });
      }
      resolve('resolved');
    })
    .catch(error => {
      console.error(`Il y a eu un problème avec l'opération fetch: ` + error.message);
    });
  }
  else
    console.error(`L'api fetch n'est pas implémenter pour cette version de votre client web`);
  })
}

function getInformation(commune) {
  return new Promise(resolve => {
  if (window.fetch) {
    fetch(commune)
    .then(response => {
      if(response.ok)
        return response.json();
      else
        console.error(`Mauvaise réponse du réseau`);
    })
    //	Conversion des tableaux .json en object literal javascript.
    .then(data => {
      console.log(data);
      const paragraph = document.getElementById(`informations`);
      paragraph.innerHTML =
        `Commune :` +
        data.nom +
        `<br>` +
        `Population : ` +
        data.population +
        `<br>` +
        `Code postal : `+
        data.code;
      resolve(`ok`);
    })
    .catch(error => {
      console.error(`Il y a eu un problème avec l'opération fetch: ` + error.message);
    });
  }
  else
    console.error(`L'api fetch n'est pas implémenter pour cette version de votre client web`);
  })
}

async function asyncCall(region_flag, departement_flag, commune_flag) {
  const regions = `https://geo.api.gouv.fr/regions`;
  await getRegion(regions, region_flag);
  let value = document.getElementById(`regions`).value;
  const departements = regions + `/` + value + `/departements`;
  await getDepartements(departements, departement_flag);
  value = document.getElementById(`departements`).value;
  const communes = `https://geo.api.gouv.fr/departements/` + value + `/communes`;
  await getCommunes(communes, commune_flag);
  value = document.getElementById(`communes`).value;
  const commune = `https://geo.api.gouv.fr/communes/` + value;
  await getInformation(commune);
}

asyncCall(true, true, true);
const regions_select = document.getElementById(`regions`);
const departements_select = document.getElementById(`departements`);
const communes_select = document.getElementById(`communes`);

regions_select.onchange = event => {
  asyncCall(false, true, true);
}

departements_select.onchange = event => {
  asyncCall(false, false, true);
}

communes_select.onchange = event => {
  asyncCall(false, false, false);
}