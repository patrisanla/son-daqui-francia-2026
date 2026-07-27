const FOLDER_ID = "1CX49oRBATy_ciEwMIx6FEOys_Zryt2aJ";

function doGet() {
  const folder = DriveApp.getFolderById(FOLDER_ID);
  const files = folder.getFiles();
  const docs = [];

  while (files.hasNext()) {
    const file = files.next();
    docs.push({
      title: file.getName(),
      mimeType: file.getMimeType(),
      url: file.getUrl(),
      id: file.getId()
    });
  }

  docs.sort((a, b) => a.title.localeCompare(b.title, 'gl'));

  return ContentService
    .createTextOutput(JSON.stringify(docs))
    .setMimeType(ContentService.MimeType.JSON);
}
