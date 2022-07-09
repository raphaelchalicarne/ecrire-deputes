window.onload = function () {
  populateEmailOptions();
};

async function fetchData() {
  const export_deputes = await fetch('/data/export_deputes.json')
  return await export_deputes.json();
}

async function populateEmailOptions() {
  var select_deputes = document.getElementById('deputes_emails');
  const export_deputes_json = await fetchData();
  export_deputes_json.forEach(depute => {
    let opt = document.createElement("option");
    opt.value = depute["assemblee_nationale_email"];
    opt.label = depute["nom"];
    select_deputes.appendChild(opt);
  });
}

function writeEmail() {
  var form = document.forms.email_deputes;
  var selected_depute_emails = [...form.elements["deputes_emails"].selectedOptions]
    .map(selected_depute => selected_depute.value)
    .join();
  let email_subject = form.elements["inputObjet"].value;
  let email_body = form.elements["inputCorps"].value;

  const mailto_url = new URL('mailto:' + selected_depute_emails);[]
  mailto_url.searchParams.append('subject', email_subject);
  mailto_url.searchParams.append('body', email_body);
  window.open(mailto_url);
};