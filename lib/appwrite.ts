import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
import { openAuthSessionAsync } from "expo-web-browser";
import * as Linking from "expo-linking";

export const config = {
  platform: "com.yustate.app",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

console.log(config);

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function signInWithGoogle() {
  try {
    const redirectURI = Linking.createURL("/");

    const response = account.createOAuth2Token(
      OAuthProvider.Google,
      redirectURI
    );

    if (!response) throw new Error("Failed to create OAuth2 session");

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectURI
    );

    if (browserResult.type !== "success")
      throw new Error("Failed to authenticate with Google 1");

    const url = new URL(browserResult.url);

    console.log(url);

    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    console.log(secret, userId);

    if (!secret || !userId)
      throw new Error("Failed to authenticate with Google 2");

    const session = await account.createSession(userId, secret);

    if (!session) throw new Error("Failed to create session");

    return session;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function signOut() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getUser() {
  try {
    const user = await account.get();

    if (user.$id) {
      const userAvatar = avatar.getInitials(user.name);
      return {
        ...user,
        avatar: userAvatar.toString(),
      };
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
