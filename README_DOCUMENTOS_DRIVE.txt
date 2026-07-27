# Documentos vivos desde Google Drive

Esta versión da app xa está preparada para mostrar documentos como tarxetas limpas, sen cabeceiras de Drive, sen autor e sen datas.

Cartafol de Drive usado:
https://drive.google.com/drive/folders/1CX49oRBATy_ciEwMIx6FEOys_Zryt2aJ?usp=sharing

Para activar a actualización automática completa hai que publicar unha vez o ficheiro `google-apps-script/documentos-drive.gs` como Web App de Google Apps Script e pegar a URL resultante no ficheiro `app.js`, na constante `DRIVE_DOCS_API_URL`.

Busca esta liña en `app.js`:
const DRIVE_DOCS_API_URL = "";

E substitúea por:
const DRIVE_DOCS_API_URL = "https://script.google.com/macros/s/....../exec";
