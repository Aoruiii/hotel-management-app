import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Could not load cabins");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const imageName = `${Math.floor(Math.random() * 10000)}-${
    newCabin.image.name
  }`.replaceAll("/", "");

  const isImageUpdated = !newCabin.image?.startsWith?.(supabaseUrl);

  // console.log("isImageUpdated", isImageUpdated);

  const imagePath = isImageUpdated
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : newCabin.image;

  // console.log("imagePath", imagePath);

  let query = supabase.from("cabins");

  // Step1.1 Create the cabin data
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // Step1.2 Edit the cabin data
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error("Could not create or update cabin.");
  }

  // Step2. Upload the photo
  if (isImageUpdated) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // Step3. Delete the cabin data IF storageError
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    console.error(storageError);
    throw new Error(
      "Could not upload the cabin pohto and fail to create new cabin."
    );
  }

  return data;
}

/*
export async function editCabin({ newCabin, id }) {
  const imageName = `${Math.floor(Math.random() * 10000)}-${
    newCabin.image.name
  }`.replaceAll("/", "");

  const isImageUpdated = !newCabin.image?.StartsWith?.(supabaseUrl);

  const imagePath = isImageUpdated
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : newCabin.image;

  let query = supabase.from("cabins");

  query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  // Step1.2 Edit the cabin data
  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error("Could not edit cabin.");
  }

  // Step2. Upload the photo
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // Step3. Delete the cabin data IF storageError
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    console.error(storageError);
    throw new Error(
      "Could not upload the cabin pohto and fail to create new cabin."
    );
  }

  return data;
}
*/

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Could not delete cabin");
  }

  return null;
}
