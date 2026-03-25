const { google } = require("googleapis");

// Scopes: permisos que querés usar
const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

// Inicializa el cliente de Drive usando variables de entorno
function getDriveClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      // Importante: reemplazar los \n por saltos de línea reales
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: SCOPES,
  });

  return google.drive({ version: "v3", auth });
}

// Ejemplo: listar archivos con sus metadatos
async function listFiles() {
  const drive = getDriveClient();
  const res = await drive.files.list({
    pageSize: 10,
    fields: "files(id, name, thumbnailLink, webViewLink)",
  });
  return res.data.files;
}

async function uploadFile(filePath, fileName, mimeType) {
  const drive = getDriveClient();

  const res = await drive.files.create({
    requestBody: {
      name: fileName,
      mimeType,
    },
    media: {
      mimeType,
      body: fs.createReadStream(filePath),
    },
    fields: "id, name, thumbnailLink, webViewLink",
  });

  return res.data; // { id, name, thumbnailLink, webViewLink }
}

// Ejemplo: obtener metadatos de un archivo específico por ID
async function getFileMetadata(fileId) {
  const drive = getDriveClient();
  const res = await drive.files.get({
    fileId,
    fields: "id, name, thumbnailLink, webViewLink",
  });
  return res.data;
}

module.exports = {
  getDriveClient,
  listFiles,
  getFileMetadata,
  uploadFile,
};
