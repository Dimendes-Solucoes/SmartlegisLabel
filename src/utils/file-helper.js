/**
 * 
 * @param {string} base64String 
 * @param {string} nomeArquivo 
 * @param {string} mimeType 
 */
export const fazerDownloadBase64 = (base64String, nomeArquivo, mimeType) => {
  try {
    const base64Limpo = base64String.includes(',') 
      ? base64String.split(',')[1] 
      : base64String;

    const byteCharacters = atob(base64Limpo);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    const fileURL = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = nomeArquivo;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => URL.revokeObjectURL(fileURL), 5000);
  } catch (e) {
    console.error('Erro ao processar download:', e);
    alert('Erro ao gerar o arquivo para download.');
  }
};

export const gerarNomeArquivo = (tipo, identificador, extensao) => {
  const nomeLimpo = identificador
    .normalize('NFD')               
    .replace(/[\u0300-\u036f]/g, '') 
    .replace(/\s+/g, '_')           
    .replace(/[^\w-]/g, '')         
    .toLowerCase();                 
    
  const tipoMinusculo = tipo.toLowerCase();

  return `${tipoMinusculo}_${nomeLimpo}.${extensao}`;
};

export const baixarArquivoViaLink = (url) => {
  if (!url) return;

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', '');
  link.setAttribute('target', '_blank');

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};