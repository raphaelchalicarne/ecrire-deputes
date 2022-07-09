window.onload = function () {
  const commission_select = document.getElementById('commission');
  const groupe_select = document.getElementById('groupe');
  const deputes_select = document.getElementById('deputes_emails');

  populateCategoryOptions(commission_select, 'commission_permanente');
  populateCategoryOptions(groupe_select, 'groupe_sigle');
  populateEmailOptions(deputes_select);

  commission_select.oninput = selectEmailsByCommission;
  groupe_select.oninput = selectEmailsByGroupe;
  deputes_select.oninput = unSelectOptions;
};

async function fetchData() {
  const export_deputes = await fetch('./data/export_deputes.json')
  return await export_deputes.json();
}

async function populateCategoryOptions(select_elt, key) {
  const export_deputes_json = await fetchData();
  [... new Set(export_deputes_json.map(depute => depute[key]))]
    .forEach(commission => {
      let opt = document.createElement("option");
      opt.value = commission;
      opt.label = commission;
      select_elt.appendChild(opt);
    });
}

async function populateEmailOptions(deputes_select) {
  const export_deputes_json = await fetchData();
  export_deputes_json.forEach(depute => {
    let opt = document.createElement("option");
    opt.value = depute["assemblee_nationale_email"];
    opt.label = depute["nom"];
    deputes_select.appendChild(opt);
  });
}

async function selectEmailsByCommission() {
  const commission_select = document.getElementById('commission');
  const deputes_select = document.getElementById('deputes_emails');

  [...deputes_select.selectedOptions].forEach(o => o.selected = false);

  let selected_commissions = [...commission_select.selectedOptions].map(o => o.value);
  const export_deputes_json = await fetchData();

  [...deputes_select.options].forEach((o) => {
    let depute = export_deputes_json.find(d => d["assemblee_nationale_email"] == o.value);
    if (selected_commissions.includes(depute["commission_permanente"])) {
      o.selected = true;
    }
  });
}

async function selectEmailsByGroupe() {
  const groupe_select = document.getElementById('groupe');
  const deputes_select = document.getElementById('deputes_emails');

  [...deputes_select.selectedOptions].forEach(o => o.selected = false);

  let selected_commissions = [...groupe_select.selectedOptions].map(o => o.value);
  const export_deputes_json = await fetchData();

  [...deputes_select.options].forEach((o) => {
    let depute = export_deputes_json.find(d => d["assemblee_nationale_email"] == o.value);
    if (selected_commissions.includes(depute["groupe_sigle"])) {
      o.selected = true;
    }
  });
}

function unSelectOptions() {
  const commission_select = document.getElementById('commission');
  const groupe_select = document.getElementById('groupe');

  [...commission_select.selectedOptions].forEach(o => o.selected = false);
  [...groupe_select.selectedOptions].forEach(o => o.selected = false);
}

function writeEmail() {
  var form = document.forms.email_deputes;
  var selected_deputes_emails = [...form.elements["deputes_emails"].selectedOptions]
    .map(selected_depute => selected_depute.value)
    .join();
  let email_subject = form.elements["inputObjet"].value;
  let email_body = form.elements["inputCorps"].value;

  const mailto_url = new URL('mailto:' + selected_deputes_emails);
  mailto_url.searchParams.append('subject', email_subject);
  mailto_url.searchParams.append('body', email_body);
  window.open(mailto_url);
};