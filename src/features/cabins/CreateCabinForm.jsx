import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id, ...editValues } = cabinToEdit;
  const isInEdit = Boolean(id);

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isInEdit ? editValues : {},
  });
  const { errors } = formState;

  // derive the loading state
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    // console.log("formdata", data);
    // console.log("isInEdit", isInEdit);
    const image = typeof data.image === "string" ? data.image : data.image[0];
    // console.log("image", image);
    if (isInEdit) {
      // console.log("edit", { cabin: { ...data, image: image }, id });
      editCabin(
        { cabin: { ...data, image: image }, id },
        {
          onSuccess: () => reset(),
        }
      );
    } else if (!isInEdit) {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => reset(),
        }
      );
    }
  }

  // function onError(err) {
  //   console.log(err);
  // }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin" error={errors?.name?.message}>
        <Input
          type="text"
          disabled={isWorking}
          id="name"
          {...register("name", {
            required: "Please enter the cabin name.",
          })}
        />
      </FormRow>

      <FormRow label="Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "Please enter the max capacity.",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "Please enter the price.",
            min: {
              value: 0,
              message: "Price should be greater than 0",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          {...register("discount", {
            required: "Please enter the discount.",
            validate: (value) =>
              Number(value) < Number(getValues().regularPrice) ||
              "Discount should not be more than regular price.",
            min: {
              value: 0,
              message: "Discount should not be less than 0",
            },
          })}
        />
      </FormRow>

      <FormRow label="Cabin Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Please enter the cabin description.",
          })}
        />
      </FormRow>

      <FormRow label="Cabin Photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isInEdit ? false : "Please upload a photo.",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          size="medium"
          disabled={isWorking}
        >
          Cancel
        </Button>
        <Button variation="primary" size="medium" disabled={isWorking}>
          {isInEdit ? "Edit Cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
