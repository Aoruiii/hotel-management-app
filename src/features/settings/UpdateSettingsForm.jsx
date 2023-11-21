import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useEditSettings } from "./useEditSettings";
// import { useForm } from "react-hook-form";
// import Row from "../../ui/Row";
// import Button from "../../ui/Button";

// * The error handling using react hook form is commented out

function UpdateSettingsForm() {
  const { settings, isLoading } = useSettings();
  const { editSettings, isEditing } = useEditSettings();
  const isWorking = isLoading || isEditing;

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   getValues,
  // } = useForm({
  //   defaultValues: {
  //     "min-nights": settings?.minBookingLength,
  //     "max-nights": settings?.maxBookingLength,
  //     "max-guests": settings?.maxGuestsPerBooking,
  //     "breakfast-price": settings?.breakfastPrice,
  //   },
  // });

  // function onSubmit(data) {
  //   console.log(data);
  //   const newSettings = {
  //     minBookingLength: data["min-nights"],
  //     maxBookingLength: data["max-nights"],
  //     maxGuestsPerBooking: data["max-guests"],
  //     breakfastPrice: data["breakfast-price"],
  //   };
  //   editSettings(newSettings);
  // }

  function handleBlur(e, field) {
    if (!e?.target?.value) return;
    editSettings({ [field]: e.target.value });
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow
        label="Minimum nights/booking"
        // error={errors?.["min-nights"]?.message}
      >
        <Input
          type="number"
          id="min-nights"
          disabled={isWorking}
          defaultValue={settings?.minBookingLength}
          onBlur={
            (e) => handleBlur(e, "minBookingLength")
            /* {...register("min-nights", {
            required: "Please enter this field.",
            min: {
              value: 1,
              message: "Minimum nights/booking should be at least 1.",
            },
            onBlur: (e) => handleBlur(e, "minBookingLength"),})} */
          }
        />
      </FormRow>
      <FormRow
        label="Maximum nights/booking"
        // error={errors?.["max-nights"]?.message}
      >
        <Input
          type="number"
          id="max-nights"
          disabled={isWorking}
          defaultValue={settings?.maxBookingLength}
          onBlur={
            (e) => handleBlur(e, "maxBookingLength")
            /* {...register("max-nights", {
            required: "Please enter this field.",
            validate: (max) =>
              max > getValues()["min-nights"] ||
              "Maximum nights/booking should be longer than Minimum nights/booking",
            onBlur: (e) => handleBlur(e, "maxBookingLength"),
          })} */
          }
        />
      </FormRow>
      <FormRow
        label="Maximum guests/booking"
        // error={errors?.["max-guests"]?.message}
      >
        <Input
          type="number"
          id="max-guests"
          disabled={isWorking}
          defaultValue={settings?.maxGuestsPerBooking}
          onBlur={
            (e) => handleBlur(e, "maxGuestsPerBooking")
            /* {...register("max-guests", {
            required: "Please enter this field.",
            min: {
              value: 1,
              message: "Maximum guests should be at least 1.",
            },
            onBlur: (e) => handleBlur(e, "maxGuestsPerBooking"),
          })} */
          }
        />
      </FormRow>
      <FormRow
        label="Breakfast price($)"
        // error={errors?.["breakfast-price"]?.message}
      >
        <Input
          type="number"
          id="breakfast-price"
          disabled={isWorking}
          defaultValue={settings?.breakfastPrice}
          onBlur={
            (e) => handleBlur(e, "breakfastPrice")
            /* {...register("breakfast-price", {
            required: "Please enter this field.",
            onBlur: (e) => handleBlur(e, "breakfastPrice"),
          })} */
          }
        />
      </FormRow>

      {/* <Row type="horizontal">
        <Button variation="secondary" size="medium" type="reset">
          Cancel
        </Button>
        <Button
          variation="primary"
          size="medium"
          type="submit"
          disabled={isWorking}
        >
          Update Settings
        </Button>
      </Row> */}
    </Form>
  );
}

export default UpdateSettingsForm;
