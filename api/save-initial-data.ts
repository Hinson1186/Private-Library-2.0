export default async function handler(req: any, res: any) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Under Vercel Serverless environment, the underlying file system is read-only.
  // We return a standard success response, as local state tracking is already preserved in the browser's localStorage or Firebase Firestore safely.
  return res.status(200).json({ 
    message: 'Serverless architecture. Client-side localStorage and Firestore sync are active.', 
    readOnly: true 
  });
}
