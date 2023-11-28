import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  //   console.log(data);
  return { data, error };
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }
  //   console.log(data);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function signup({ fullName, email, password }) {
  // console.log("API", { fullName, email, password });
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return { data, error };
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // update user info
  let userInfo;
  if (password) userInfo = { password };
  if (fullName) userInfo = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(userInfo);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // upload avartar image
  const avatarImgName = `avatar-${data.user.id}-${Math.floor(
    Math.random() * 10000
  )}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(avatarImgName, avatar);

  if (storageError) throw new Error(storageError.message);

  // update avatar path
  const avatarPath =
    supabaseUrl + "/storage/v1/object/public/avatars/" + avatarImgName;
  const { data: updatedData, error: updatedError } =
    await supabase.auth.updateUser({
      data: { avatar: avatarPath },
    });

  if (updatedError) throw new Error(updatedError.message);

  return updatedData;
}
