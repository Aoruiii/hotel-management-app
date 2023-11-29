import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import { useSignup } from "./useSignup";

function SignupForm() {
  const {
    register,
    formState = {},
    handleSubmit,
    getValues,
    reset,
  } = useForm();
  const { errors } = formState;
  const { isSigningup, signup } = useSignup();
  // console.log("error", errors);

  function onSubmit({ fullName, email, password }) {
    // console.log("{ fullName, email, password }", { fullName, email, password });
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isSigningup}
          {...register("fullName", {
            required: "Please fill this field",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isSigningup}
          {...register("email", {
            required: "Please fill this field",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please use a valid email address.",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isSigningup}
          {...register("password", {
            required: "Please fill this field",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningup}
          {...register("passwordConfirm", {
            required: "Please fill this field",
            validate: (value) =>
              value === getValues().password ||
              "Please enter the same password as above.",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isSigningup}>
          Cancel
        </Button>
        <Button disabled={isSigningup}>
          {isSigningup ? <SpinnerMini /> : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
