function writeEmail() {
  var form = document.forms.email_deputes;
  let email_address = form.elements["inputEmail"].value;
  let email_subject = form.elements["inputObjet"].value;
  let email_body = form.elements["inputCorps"].value;

  const mailto_url = new URL('mailto:' + email_address);
  mailto_url.searchParams.append('subject', email_subject);
  mailto_url.searchParams.append('body', email_body);
  window.open(mailto_url);
};