import { Client, Account, Databases, OAuthProvider, Avatars } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_URL as string)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID as string);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatar = new Avatars(client);

export const loginWithGoogle = () => {
  return account.createOAuth2Session(
    OAuthProvider.Google,
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}/dashboard`,
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}/login`
  );
};

export const loginWithGitHub = () => {
  return account.createOAuth2Session(
    OAuthProvider.Github,
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}/dashboard`,
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}/login`
  );
};
