import { google } from 'googleapis';

export default async function createClient(credentials: {
  type: 'authorized_user';
  client_id: string;
  client_secret: string;
  refresh_token: string;
}) {
  try {
    const client = google.auth.fromJSON(credentials);

    return client;
  } catch (err) {
    return null;
  }
}
