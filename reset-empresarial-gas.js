// ============================================================
// RESET Empresarial — Recebedor de Leads Corporativos
// Instituto Diego Moreira
//
// COMO INSTALAR:
// 1. Acesse https://script.google.com/
// 2. Clique em "+ Novo projeto"
// 3. Cole TODO este código no editor
// 4. Clique em "Implantar" → "Nova implantação"
// 5. Tipo: "App da Web"
// 6. Executar como: "Eu" (d.moreira.silva2010@gmail.com)
// 7. Quem tem acesso: "Qualquer pessoa"
// 8. Clique em "Implantar" e autorize
// 9. Copie a URL gerada e cole em reset-empresarial.html
//    na variável GAS_URL (substituindo "COLE_AQUI_A_URL_DO_APPS_SCRIPT")
// ============================================================

var EMAIL_DIEGO = "d.moreira.silva2010@gmail.com";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (data.action === "lead_corporativo") {
      enviarEmailLead(data);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "RESET Empresarial — Leads API OK" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function enviarEmailLead(d) {
  var agora = new Date();
  var data_br = Utilities.formatDate(agora, "America/Sao_Paulo", "dd/MM/yyyy 'às' HH:mm");

  var assunto = "🏢 Novo Lead Corporativo — " + d.empresa + " (" + d.colaboradores + ")";

  var html = `
<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f5f5f5;padding:20px">

<div style="background:#0F3460;padding:24px;border-radius:12px 12px 0 0;text-align:center">
  <h2 style="color:#C9963D;margin:0;font-size:22px">🏢 Novo Lead — RESET Empresarial</h2>
  <p style="color:rgba(255,255,255,.7);margin:6px 0 0;font-size:13px">${data_br}</p>
</div>

<div style="background:#fff;padding:28px;border-radius:0 0 12px 12px;box-shadow:0 4px 16px rgba(0,0,0,.08)">

  <table style="width:100%;border-collapse:collapse;font-size:14px">
    <tr style="background:#F5F7FF">
      <td style="padding:10px 14px;font-weight:700;color:#0F3460;width:35%;border-bottom:1px solid #EEE">Nome</td>
      <td style="padding:10px 14px;border-bottom:1px solid #EEE">${d.nome}</td>
    </tr>
    <tr>
      <td style="padding:10px 14px;font-weight:700;color:#0F3460;border-bottom:1px solid #EEE">Cargo</td>
      <td style="padding:10px 14px;border-bottom:1px solid #EEE">${d.cargo}</td>
    </tr>
    <tr style="background:#F5F7FF">
      <td style="padding:10px 14px;font-weight:700;color:#0F3460;border-bottom:1px solid #EEE">Empresa</td>
      <td style="padding:10px 14px;border-bottom:1px solid #EEE;font-weight:700">${d.empresa}</td>
    </tr>
    <tr>
      <td style="padding:10px 14px;font-weight:700;color:#0F3460;border-bottom:1px solid #EEE">Colaboradores</td>
      <td style="padding:10px 14px;border-bottom:1px solid #EEE">${d.colaboradores}</td>
    </tr>
    <tr style="background:#F5F7FF">
      <td style="padding:10px 14px;font-weight:700;color:#0F3460;border-bottom:1px solid #EEE">Email</td>
      <td style="padding:10px 14px;border-bottom:1px solid #EEE">
        <a href="mailto:${d.email}" style="color:#0F3460">${d.email}</a>
      </td>
    </tr>
    <tr>
      <td style="padding:10px 14px;font-weight:700;color:#0F3460;border-bottom:1px solid #EEE">WhatsApp</td>
      <td style="padding:10px 14px;border-bottom:1px solid #EEE">
        <a href="https://wa.me/55${d.whatsapp.replace(/\D/g,'')}" style="color:#25D366;font-weight:700">${d.whatsapp} 📱</a>
      </td>
    </tr>
    <tr style="background:#F5F7FF">
      <td style="padding:10px 14px;font-weight:700;color:#0F3460;border-bottom:1px solid #EEE">Desafios</td>
      <td style="padding:10px 14px;border-bottom:1px solid #EEE">${d.desafios}</td>
    </tr>
    <tr>
      <td style="padding:10px 14px;font-weight:700;color:#0F3460;border-bottom:1px solid #EEE">Modalidade</td>
      <td style="padding:10px 14px;border-bottom:1px solid #EEE">
        <span style="background:#FFF3E0;color:#C9963D;padding:3px 10px;border-radius:12px;font-weight:700;font-size:13px">${d.modalidade}</span>
      </td>
    </tr>
    ${d.mensagem && d.mensagem !== '—' ? `
    <tr style="background:#F5F7FF">
      <td style="padding:10px 14px;font-weight:700;color:#0F3460;vertical-align:top">Mensagem</td>
      <td style="padding:10px 14px;font-style:italic;color:#555">"${d.mensagem}"</td>
    </tr>` : ''}
  </table>

  <div style="margin-top:24px;padding:16px;background:#E8F5E9;border-radius:8px;border-left:4px solid #1B5E20">
    <p style="margin:0;font-size:13px;color:#1B5E20">
      <strong>⚡ Ação recomendada:</strong> Entrar em contato em até 24 horas pelo WhatsApp
      <a href="https://wa.me/55${d.whatsapp.replace(/\D/g,'')}" style="color:#1B5E20;font-weight:700">${d.whatsapp}</a>
      para agendar o diagnóstico gratuito de 30 minutos.
    </p>
  </div>

  <div style="margin-top:16px;text-align:center">
    <a href="https://wa.me/55${d.whatsapp.replace(/\D/g,'')}"
       style="display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;font-weight:700;text-decoration:none;font-size:14px">
      💬 Responder no WhatsApp agora
    </a>
  </div>

</div>

<p style="text-align:center;font-size:11px;color:#aaa;margin-top:16px">
  Instituto Diego Moreira · RESET Empresarial · Lead recebido em ${data_br}
</p>

</body>
</html>`;

  MailApp.sendEmail({
    to:      EMAIL_DIEGO,
    subject: assunto,
    htmlBody: html
  });
}
